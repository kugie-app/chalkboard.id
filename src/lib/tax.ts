export interface TaxSettings {
  enabled: boolean;
  percentage: number;
  name: string;
  applyToTables: boolean;
  applyToFnb: boolean;
}

export function calculateTax(amount: number, taxSettings: TaxSettings, isTable: boolean = false): number {
  if (!taxSettings.enabled) return 0;
  
  const shouldApplyTax = isTable ? taxSettings.applyToTables : taxSettings.applyToFnb;
  if (!shouldApplyTax) return 0;
  
  return amount * (taxSettings.percentage / 100);
}

export function formatTaxLabel(taxSettings: TaxSettings): string {
  if (!taxSettings.enabled) return 'Tax';
  return `${taxSettings.name} (${taxSettings.percentage}%)`;
}