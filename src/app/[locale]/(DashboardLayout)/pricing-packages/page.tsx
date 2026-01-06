"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { 
  Alert, 
  Card, 
  Button, 
  Table, 
  Badge
} from "flowbite-react";
import { 
  IconPackage, 
  IconPlus, 
  IconEdit, 
  IconTrash,
  IconClock,
  IconClockHour4
} from "@tabler/icons-react";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";
import PricingPackageModal from "@/components/pricing-packages/PricingPackageModal";
import { PricingPackage } from "@/schema";
// Helper function to format currency
const formatCurrency = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num);
};

export default function PricingPackagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('PricingPackages');
  const tAlerts = useTranslations('Alerts');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    fetchPackages();
  }, [session, status, router]);

  const fetchPackages = async () => {
    try {
      const params = activeTab !== "all" ? `?category=${activeTab}` : "";
      const response = await fetch(`/api/pricing-packages${params}`);
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      } else {
        throw new Error("Failed to fetch packages");
      }
    } catch (error) {
      console.error('Failed to fetch pricing packages:', error);
      setAlert({ type: 'error', message: t('messages.loadError') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchPackages();
    }
  }, [activeTab, session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) {
      return;
    }

    try {
      const response = await fetch(`/api/pricing-packages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlert({ type: 'success', message: t('messages.deleteSuccess') });
        fetchPackages();
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete");
      }
    } catch (error: any) {
      setAlert({ type: 'error', message: error.message || t('messages.deleteError') });
    }
  };

  const handleEdit = (pkg: PricingPackage) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPackage(null);
    fetchPackages();
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DefaultSpinner />
      </div>
    );
  }

  if (!session) return null;

  const filteredPackages = packages.filter(pkg => 
    activeTab === "all" || pkg.category === activeTab
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
              <IconPackage className="h-8 w-8" />
              {t('title')}
            </h1>
            <p className="text-bodytext mt-2">{t('subtitle')}</p>
          </div>
          <Button onClick={() => setModalOpen(true)} color="primary">
            <IconPlus className="h-4 w-4 mr-2" />
            {t('addPackage')}
          </Button>
        </div>
      </div>

      {alert && (
        <Alert
          color={alert.type === 'success' ? 'success' : 'failure'}
          className="mb-6"
          onDismiss={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      <Card>
        <div className="mb-4">
          <div className="flex space-x-1 border-b">
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "all"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("all")}
            >
              {t('categories.all')}
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "hourly"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("hourly")}
            >
              {t('categories.hourly')}
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "per_minute"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("per_minute")}
            >
              {t('categories.per_minute')}
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>{t('table.name')}</Table.HeadCell>
              <Table.HeadCell>{t('table.category')}</Table.HeadCell>
              <Table.HeadCell>{t('table.rate')}</Table.HeadCell>
              <Table.HeadCell>{t('table.status')}</Table.HeadCell>
              <Table.HeadCell>{t('table.default')}</Table.HeadCell>
              <Table.HeadCell>{t('table.actions')}</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredPackages.map((pkg) => (
                <Table.Row key={pkg.id} className="bg-white dark:bg-gray-800">
                  <Table.Cell className="font-medium">
                    {pkg.name}
                    {pkg.description && (
                      <p className="text-sm text-gray-500">{pkg.description}</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {pkg.category === 'hourly' ? (
                        <IconClockHour4 className="h-4 w-4" />
                      ) : (
                        <IconClock className="h-4 w-4" />
                      )}
                      <span>{t(`categories.${pkg.category}`)}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {pkg.category === 'hourly' 
                      ? formatCurrency(Number(pkg.hourlyRate))
                      : formatCurrency(Number(pkg.perMinuteRate))
                    }
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={pkg.isActive ? "success" : "gray"}>
                      {t(`status.${pkg.isActive ? 'active' : 'inactive'}`)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {pkg.isDefault && (
                      <Badge color="info">
                        {t('table.default')}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        size="xs"
                        color="gray"
                        onClick={() => handleEdit(pkg)}
                      >
                        <IconEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        <IconTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card>

      {modalOpen && (
        <PricingPackageModal
          open={modalOpen}
          onClose={handleModalClose}
          package={selectedPackage}
          onSuccess={(message) => {
            setAlert({ type: 'success', message });
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}