"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Alert, Card, Button, Label, TextInput, Checkbox } from "flowbite-react";
import { IconSettings, IconCheck, IconX, IconPercentage } from "@tabler/icons-react";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('AdminPage');
  const tAlerts = useTranslations('Alerts');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [taxSettings, setTaxSettings] = useState({
    enabled: false,
    percentage: 11,
    name: 'PPN',
    applyToTables: false,
    applyToFnb: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/authentication/login");
      return;
    }
    fetchTaxSettings();
  }, [session, status, router]);

  const fetchTaxSettings = async () => {
    try {
      const response = await fetch('/api/settings/tax');
      if (response.ok) {
        const settings = await response.json();
        setTaxSettings(settings);
      }
    } catch (error) {
      console.error('Failed to fetch tax settings:', error);
    }
  };

  const handleTaxSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/settings/tax', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taxSettings),
      });

      if (response.ok) {
        setAlert({ type: 'success', message: tAlerts('taxSettingsUpdatedSuccess') });
      } else {
        const error = await response.json();
        setAlert({ type: 'error', message: error.error || tAlerts('failedToUpdateTaxSettings') });
      }
    } catch (error) {
      setAlert({ type: 'error', message: tAlerts('failedToUpdateTaxSettings') });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DefaultSpinner />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
          <IconSettings className="h-8 w-8" />
          {t('title')}
        </h1>
        <p className="text-bodytext mt-2">{t('subtitle')}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tax Settings Card */}
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-dark dark:text-white mb-2 flex items-center gap-2">
                <IconPercentage className="h-5 w-5" />
                {t('taxSettings.title')}
              </h3>
              <p className="text-bodytext text-sm mb-4">
                {t('taxSettings.subtitle')}
              </p>
            </div>

            <form onSubmit={handleTaxSettingsSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxEnabled"
                  checked={taxSettings.enabled}
                  onChange={(e) => setTaxSettings({ ...taxSettings, enabled: e.target.checked })}
                />
                <Label htmlFor="taxEnabled">{t('taxSettings.enableTax')}</Label>
              </div>

              {taxSettings.enabled && (
                <>
                  <div>
                    <Label htmlFor="taxPercentage">{t('taxSettings.taxPercentage')}</Label>
                    <TextInput
                      id="taxPercentage"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={taxSettings.percentage}
                      onChange={(e) => setTaxSettings({ ...taxSettings, percentage: parseFloat(e.target.value) || 0 })}
                      placeholder="11"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxName">{t('taxSettings.taxName')}</Label>
                    <TextInput
                      id="taxName"
                      value={taxSettings.name}
                      onChange={(e) => setTaxSettings({ ...taxSettings, name: e.target.value })}
                      placeholder="PPN"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('taxSettings.applyTaxTo')}</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="applyToTables"
                        checked={taxSettings.applyToTables}
                        onChange={(e) => setTaxSettings({ ...taxSettings, applyToTables: e.target.checked })}
                      />
                      <Label htmlFor="applyToTables">{t('taxSettings.tableSessions')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="applyToFnb"
                        checked={taxSettings.applyToFnb}
                        onChange={(e) => setTaxSettings({ ...taxSettings, applyToFnb: e.target.checked })}
                      />
                      <Label htmlFor="applyToFnb">{t('taxSettings.fnbOrders')}</Label>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>{t('taxSettings.note')}</strong> {t('taxSettings.noteText')}
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? t('taxSettings.saving') : t('taxSettings.saveTaxSettings')}
                </Button>
              </div>
            </form>
          </div>
        </Card>

        {/* Existing Billing System Card */}
        <Card>
          <div>
            <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
              {t('billingSystem.title')}
            </h3>
            <p className="text-bodytext text-sm mb-4">
              {t('billingSystem.subtitle')}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
              ✅ {t('billingSystem.perMinuteAvailable')}
            </h4>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
              <li>• {t('billingSystem.features.individualConfig')}</li>
              <li>• {t('billingSystem.features.hourlyBilling')}</li>
              <li>• {t('billingSystem.features.perMinuteBilling')}</li>
              <li>• {t('billingSystem.features.easyManagement')}</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
              📋 {t('billingSystem.howToTitle')}
            </h4>
            <ol className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
              <li>1. {t('billingSystem.steps.step1')}</li>
              <li>2. {t('billingSystem.steps.step2')}</li>
              <li>3. {t('billingSystem.steps.step3')}</li>
              <li>4. {t('billingSystem.steps.step4')}</li>
            </ol>
          </div>

          <div className="space-y-3 text-sm">
            <h4 className="font-medium text-dark dark:text-white">{t('systemInfo.title')}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="text-bodytext">{t('systemInfo.version')}</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bodytext">{t('systemInfo.perMinuteBilling')}</span>
                <span className="font-medium text-green-600">{t('systemInfo.active')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bodytext">{t('systemInfo.individualTableConfig')}</span>
                <span className="font-medium text-green-600">{t('systemInfo.enabled')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bodytext">{t('systemInfo.apiEndpoints')}</span>
                <span className="font-medium text-green-600">{t('systemInfo.active')}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}