"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { 
  Modal, 
  Button, 
  Label, 
  TextInput,
  Textarea,
  Select,
  Checkbox 
} from "flowbite-react";
import { PricingPackage } from "@/schema";

interface PricingPackageModalProps {
  open: boolean;
  onClose: () => void;
  package?: PricingPackage | null;
  onSuccess: (message: string) => void;
}

export default function PricingPackageModal({
  open,
  onClose,
  package: initialPackage,
  onSuccess
}: PricingPackageModalProps) {
  const t = useTranslations('PricingPackages.form');
  const tMessages = useTranslations('PricingPackages.messages');
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "hourly" as "hourly" | "per_minute",
    hourlyRate: "",
    perMinuteRate: "",
    isDefault: false,
    isActive: true,
    sortOrder: "0"
  });

  useEffect(() => {
    if (initialPackage) {
      setFormData({
        name: initialPackage.name,
        description: initialPackage.description || "",
        category: initialPackage.category as "hourly" | "per_minute",
        hourlyRate: initialPackage.hourlyRate || "",
        perMinuteRate: initialPackage.perMinuteRate || "",
        isDefault: initialPackage.isDefault,
        isActive: initialPackage.isActive,
        sortOrder: initialPackage.sortOrder || "0"
      });
    } else {
      // Reset form for new package
      setFormData({
        name: "",
        description: "",
        category: "hourly",
        hourlyRate: "",
        perMinuteRate: "",
        isDefault: false,
        isActive: true,
        sortOrder: "0"
      });
    }
  }, [initialPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        hourlyRate: formData.category === "hourly" ? formData.hourlyRate : undefined,
        perMinuteRate: formData.category === "per_minute" ? formData.perMinuteRate : undefined,
      };

      const url = initialPackage 
        ? `/api/pricing-packages/${initialPackage.id}`
        : '/api/pricing-packages';
      
      const method = initialPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSuccess(
          initialPackage 
            ? tMessages('updateSuccess') 
            : tMessages('createSuccess')
        );
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to save package");
      }
    } catch (error: any) {
      console.error('Failed to save pricing package:', error);
      alert(error.message || "Failed to save package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={open} onClose={onClose} size="md">
      <Modal.Header>
        {initialPackage ? t('editTitle') : t('addTitle')}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" value={t('name')} />
            <TextInput
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('namePlaceholder')}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="description" value={t('description')} />
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('descriptionPlaceholder')}
              rows={3}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="category" value={t('category')} />
            <Select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as "hourly" | "per_minute" })}
              required
              disabled={loading || !!initialPackage}
            >
              <option value="">{t('selectCategory')}</option>
              <option value="hourly">{t('hourlyRate')}</option>
              <option value="per_minute">{t('perMinuteRate')}</option>
            </Select>
          </div>

          {formData.category === "hourly" && (
            <div>
              <Label htmlFor="hourlyRate" value={t('hourlyRate')} />
              <TextInput
                id="hourlyRate"
                type="number"
                step="0.01"
                min="0"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                placeholder="50000"
                required
                disabled={loading}
              />
            </div>
          )}

          {formData.category === "per_minute" && (
            <div>
              <Label htmlFor="perMinuteRate" value={t('perMinuteRate')} />
              <TextInput
                id="perMinuteRate"
                type="number"
                step="0.01"
                min="0"
                value={formData.perMinuteRate}
                onChange={(e) => setFormData({ ...formData, perMinuteRate: e.target.value })}
                placeholder="1000"
                required
                disabled={loading}
              />
            </div>
          )}

          <div>
            <Label htmlFor="sortOrder" value={t('sortOrder')} />
            <TextInput
              id="sortOrder"
              type="number"
              min="0"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
              placeholder="0"
              disabled={loading}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              disabled={loading}
            />
            <Label htmlFor="isDefault">{t('isDefault')}</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              disabled={loading}
            />
            <Label htmlFor="isActive">{t('isActive')}</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button color="gray" onClick={onClose} disabled={loading}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading 
                ? "..." 
                : initialPackage ? t('update') : t('create')
              }
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}