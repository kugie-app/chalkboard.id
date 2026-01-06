"use client";
import React from "react";
import CardBox from "../shared/CardBox";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  tCommon?: (key: string) => string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color,
  trend,
  tCommon
}) => {
  const formatValue = (val: string | number) => {
    // If it's already a formatted string with translations (contains common suffixes), return as-is
    if (typeof val === 'string' && tCommon && /Rp\d+(\.\d+)?(Rb|Jt|Mly|K|M|B)/.test(val)) {
      return val;
    }
    // If it's already a formatted string (contains K, M, or B), return as-is for backwards compatibility
    if (typeof val === 'string' && /Rp\d+(\.\d+)?[KMB]/.test(val)) {
      return val;
    }
    
    // Convert string numbers to actual numbers
    let numericValue: number;
    
    if (typeof val === 'string') {
      // Handle currency strings like "Rp374,888,166"
      if (val.includes('Rp')) {
        numericValue = parseFloat(val.replace(/[^0-9.-]/g, ''));
      } else {
        // Handle pure numeric strings like "374888166.45"
        numericValue = parseFloat(val);
      }
      
      if (isNaN(numericValue)) {
        return val; // Return original if can't parse
      }
      
      // Format with appropriate suffix and currency prefix if original had Rp
      const hasRp = val.includes('Rp');
      const prefix = hasRp ? 'Rp' : '';
      
      if (numericValue >= 1000000000) {
        const suffix = tCommon ? tCommon('currency.compact.billion') : 'B';
        return `${prefix}${(numericValue / 1000000000).toFixed(1)}${suffix}`;
      } else if (numericValue >= 1000000) {
        const suffix = tCommon ? tCommon('currency.compact.million') : 'M';
        return `${prefix}${(numericValue / 1000000).toFixed(1)}${suffix}`;
      } else if (numericValue >= 1000) {
        const suffix = tCommon ? tCommon('currency.compact.thousand') : 'K';
        return `${prefix}${(numericValue / 1000).toFixed(1)}${suffix}`;
      }
      
      return hasRp ? `Rp${numericValue.toLocaleString()}` : numericValue.toLocaleString();
    }
    
    // Handle actual numbers
    if (typeof val === 'number') {
      if (val >= 1000000000) {
        const suffix = tCommon ? tCommon('currency.compact.billion') : 'B';
        return `${(val / 1000000000).toFixed(1)}${suffix}`;
      } else if (val >= 1000000) {
        const suffix = tCommon ? tCommon('currency.compact.million') : 'M';
        return `${(val / 1000000).toFixed(1)}${suffix}`;
      } else if (val >= 1000) {
        const suffix = tCommon ? tCommon('currency.compact.thousand') : 'K';
        return `${(val / 1000).toFixed(1)}${suffix}`;
      }
      return val.toLocaleString();
    }
    
    return val;
  };

  const getTrendColor = () => {
    if (!trend) return '';
    return trend.isPositive ? 'text-success' : 'text-error';
  };

  const getTrendIcon = () => {
    if (!trend) return '';
    return trend.isPositive ? '↗' : '↘';
  };

  return (
    <CardBox className="overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg bg-${color}/10`}>
              <Icon size={24} className={`text-${color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-semibold text-dark dark:text-white truncate" title={String(value)}>
                {formatValue(value)}
              </h3>
              <p className="text-sm text-bodytext truncate" title={title}>{title}</p>
              {subtitle && (
                <p className="text-xs text-bodytext mt-1 truncate" title={subtitle}>{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <span className="text-sm font-medium">
              {getTrendIcon()} {Math.abs(trend.value)}%
            </span>
          </div>
        )}
      </div>
    </CardBox>
  );
};

export default StatCard; 