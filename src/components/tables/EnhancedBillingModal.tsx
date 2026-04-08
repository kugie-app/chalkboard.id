'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { IconPrinter, IconCurrencyDollar, IconClock, IconLoader2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface TaxSettings {
  enabled: boolean;
  percentage: number;
  name: string;
  applyToTables: boolean;
  applyToFnb: boolean;
}

interface BillingData {
  session: {
    id: number;
    customerName: string;
    customerPhone?: string;
    startTime: string;
    endTime: string;
  };
  billing: {
    sessionId: number;
    tableId: number;
    customerName: string;
    customerPhone?: string;
    staffId?: number;
    actualDuration: number;
    originalDuration: number;
    calculatedDuration: number;
    billingDetails: {
      type: 'hourly' | 'per_minute';
      rate: number;
      actualMinutes: number;
      billableHours?: number;
      billableMinutes?: number;
      packageName?: string;
    };
    tableCost: number;
    fnbTotalCost: number;
    subtotal: number;
    tableTax: number;
    fnbTax: number;
    totalTaxAmount: number;
    totalCost: number;
    fnbOrders: any[];
    taxSettings: TaxSettings;
  };
}

interface EnhancedBillingModalProps {
  show: boolean;
  onClose: () => void;
  billingData: BillingData | null;
  onConfirmPayment: (finalBillingData: BillingData) => void;
}

// Helper: convert minutes (decimal) to HH:mm:ss
function minutesToHMS(totalMinutes: number): { hours: string; minutes: string; seconds: string } {
  const totalSeconds = Math.round(totalMinutes * 60);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
}

// Helper: convert HH:mm:ss to total minutes
function hmsToMinutes(hours: string, minutes: string, seconds: string): number {
  const h = parseInt(hours) || 0;
  const m = parseInt(minutes) || 0;
  const s = parseInt(seconds) || 0;
  return h * 60 + m + s / 60;
}

const EnhancedBillingModal: React.FC<EnhancedBillingModalProps> = ({
  show,
  onClose,
  billingData,
  onConfirmPayment
}) => {
  const tCommon = useTranslations('Common');
  const tCheckout = useTranslations('AdminPage.checkout');
  const [hours, setHours] = useState('00');
  const [mins, setMins] = useState('00');
  const [secs, setSecs] = useState('00');
  const [recalculatedBilling, setRecalculatedBilling] = useState<BillingData | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [recalculationError, setRecalculationError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (billingData) {
      const hms = minutesToHMS(billingData.billing.actualDuration);
      setHours(hms.hours);
      setMins(hms.minutes);
      setSecs(hms.seconds);
      setRecalculatedBilling(null);
      setRecalculationError(null);
    }
  }, [billingData]);

  const handleRecalculate = useCallback(async (h: string, m: string, s: string) => {
    if (!billingData) return;

    const newMinutes = hmsToMinutes(h, m, s);
    if (newMinutes <= 0) return;

    // Skip if duration hasn't changed
    if (Math.abs(newMinutes - billingData.billing.actualDuration) < 0.01 && !recalculatedBilling) return;

    setIsRecalculating(true);
    setRecalculationError(null);

    try {
      const response = await fetch(`/api/table-sessions/${billingData.session.id}/recalculate-billing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actualDuration: Math.round(newMinutes) }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecalculatedBilling({
          session: billingData.session,
          billing: {
            ...billingData.billing,
            ...data.billing,
          }
        });
      } else {
        const error = await response.json();
        setRecalculationError(error.message || tCommon('failedToRecalculateBilling'));
      }
    } catch {
      setRecalculationError(tCommon('errorRecalculatingBilling'));
    } finally {
      setIsRecalculating(false);
    }
  }, [billingData, recalculatedBilling, tCommon]);

  // Debounced recalculation on time input change
  const scheduleRecalculate = useCallback((h: string, m: string, s: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleRecalculate(h, m, s), 500);
  }, [handleRecalculate]);

  const handleTimeChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    // Allow only numeric input, clamp values
    const num = value.replace(/\D/g, '').slice(0, 2);
    let newH = hours, newM = mins, newS = secs;
    if (field === 'hours') { newH = num; setHours(num); }
    if (field === 'minutes') { newM = num; setMins(num); }
    if (field === 'seconds') { newS = num; setSecs(num); }
    scheduleRecalculate(newH, newM, newS);
  };

  const handleConfirmPayment = () => {
    const finalData = recalculatedBilling || billingData;
    if (finalData) {
      onConfirmPayment(finalData);
    }
  };

  const currentBilling = recalculatedBilling || billingData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!billingData) return null;

  const taxSettings = currentBilling?.billing.taxSettings;
  const showTax = taxSettings?.enabled && (currentBilling?.billing.totalTaxAmount || 0) > 0;

  return (
    <Modal show={show} onClose={onClose} size="lg">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <IconCurrencyDollar className="w-5 h-5" />
          Session Billing Confirmation
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* Session Info */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
              Session Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-bodytext">Customer:</span>
                <span className="ml-2 font-medium text-dark dark:text-white">
                  {billingData.session.customerName}
                </span>
              </div>
              <div>
                <span className="text-bodytext">Start Time:</span>
                <span className="ml-2 font-medium text-dark dark:text-white">
                  {formatDateTime(billingData.session.startTime)}
                </span>
              </div>
              <div>
                <span className="text-bodytext">End Time:</span>
                <span className="ml-2 font-medium text-dark dark:text-white">
                  {formatDateTime(billingData.session.endTime)}
                </span>
              </div>
              <div>
                <span className="text-bodytext">{tCommon('billingType')}:</span>
                <span className="ml-2 font-medium text-dark dark:text-white">
                  {currentBilling?.billing.billingDetails.type === 'hourly' ? tCommon('hourlyRate') : tCommon('perMinuteRate')}
                  {currentBilling?.billing.billingDetails.packageName && (
                    <span className="text-xs text-bodytext ml-1">({currentBilling.billing.billingDetails.packageName})</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Duration Input — HH:mm:ss */}
          <div className="border-b pb-4">
            <div className="flex items-center gap-2 mb-3">
              <IconClock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                {tCheckout('adjustDuration')}
              </h3>
              {isRecalculating && <IconLoader2 className="w-4 h-4 animate-spin text-primary" />}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Label htmlFor="durationHours" className="text-xs text-bodytext">{tCheckout('hours')}</Label>
                <TextInput
                  id="durationHours"
                  value={hours}
                  onChange={(e) => handleTimeChange('hours', e.target.value)}
                  className="text-center font-mono text-lg"
                  sizing="lg"
                />
              </div>
              <span className="text-2xl font-bold text-dark dark:text-white mt-4">:</span>
              <div className="flex-1">
                <Label htmlFor="durationMins" className="text-xs text-bodytext">{tCheckout('minutes')}</Label>
                <TextInput
                  id="durationMins"
                  value={mins}
                  onChange={(e) => handleTimeChange('minutes', e.target.value)}
                  className="text-center font-mono text-lg"
                  sizing="lg"
                />
              </div>
              <span className="text-2xl font-bold text-dark dark:text-white mt-4">:</span>
              <div className="flex-1">
                <Label htmlFor="durationSecs" className="text-xs text-bodytext">{tCheckout('seconds')}</Label>
                <TextInput
                  id="durationSecs"
                  value={secs}
                  onChange={(e) => handleTimeChange('seconds', e.target.value)}
                  className="text-center font-mono text-lg"
                  sizing="lg"
                />
              </div>
            </div>

            {recalculatedBilling && (
              <div className="mt-3 p-2 bg-lightsuccess rounded-lg">
                <p className="text-success text-sm font-medium">
                  ✓ Billing recalculated
                </p>
              </div>
            )}

            {recalculationError && (
              <div className="mt-3 text-error text-sm">
                {recalculationError}
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
              Cost Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-bodytext">Table Cost:</span>
                <span className="font-medium text-dark dark:text-white">
                  {formatCurrency(currentBilling?.billing.tableCost || 0)}
                </span>
              </div>
              {currentBilling?.billing.billingDetails.type === 'hourly' && (
                <div className="flex justify-between text-xs text-bodytext">
                  <span>({currentBilling.billing.billingDetails.billableHours} {tCommon('hours')} × {formatCurrency(currentBilling.billing.billingDetails.rate)})</span>
                  <span></span>
                </div>
              )}
              {currentBilling?.billing.billingDetails.type === 'per_minute' && (
                <div className="flex justify-between text-xs text-bodytext">
                  <span>({currentBilling.billing.billingDetails.billableMinutes} {tCommon('minutes')} × {formatCurrency(currentBilling.billing.billingDetails.rate)})</span>
                  <span></span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-bodytext">F&B Orders:</span>
                <span className="font-medium text-dark dark:text-white">
                  {formatCurrency(currentBilling?.billing.fnbTotalCost || 0)}
                </span>
              </div>

              {/* Tax Breakdown */}
              {showTax && (
                <>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-xs text-bodytext mb-1">
                      <span>{tCheckout('taxBreakdown')} ({taxSettings?.name} {taxSettings?.percentage}%)</span>
                    </div>
                    {(currentBilling?.billing.tableTax || 0) > 0 && (
                      <div className="flex justify-between text-xs text-bodytext">
                        <span>  {tCheckout('tableTax')}:</span>
                        <span>{formatCurrency(currentBilling?.billing.tableTax || 0)}</span>
                      </div>
                    )}
                    {(currentBilling?.billing.fnbTax || 0) > 0 && (
                      <div className="flex justify-between text-xs text-bodytext">
                        <span>  {tCheckout('fnbTax')}:</span>
                        <span>{formatCurrency(currentBilling?.billing.fnbTax || 0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-bodytext">{taxSettings?.name}:</span>
                      <span className="font-medium text-dark dark:text-white">
                        {formatCurrency(currentBilling?.billing.totalTaxAmount || 0)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span className="text-dark dark:text-white">Total Cost:</span>
                <span className="text-primary">
                  {formatCurrency(currentBilling?.billing.totalCost || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* F&B Orders (if any) */}
          {currentBilling?.billing.fnbOrders && currentBilling.billing.fnbOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
                F&B Orders ({currentBilling?.billing.fnbOrders?.length})
              </h3>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {currentBilling?.billing.fnbOrders?.map((order: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm p-2 bg-lightgray rounded">
                    <span>{order.orderNumber}</span>
                    <span className="font-medium">{formatCurrency(parseFloat(order.total))}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="primary"
          onClick={handleConfirmPayment}
          disabled={isRecalculating}
        >
          <IconPrinter className="w-4 h-4 mr-2" />
          {tCheckout('printAndSave')}
        </Button>
        <Button
          color="secondary"
          onClick={onClose}
          disabled={isRecalculating}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnhancedBillingModal;
