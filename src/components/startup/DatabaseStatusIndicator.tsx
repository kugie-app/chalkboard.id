"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, CircleXIcon, TriangleAlertIcon, Loader2Icon } from 'lucide-react';
import { Badge } from "flowbite-react";

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: {
    database: boolean;
    schema: boolean; 
    permissions: boolean;
  };
}

export default function DatabaseStatusIndicator({ compact = false }: { compact?: boolean }) {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (mounted) {
          setHealth({
            status: data.status || 'unhealthy',
            checks: data.checks || {
              database: false,
              schema: false,
              permissions: false
            }
          });
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setHealth({
            status: 'unhealthy',
            checks: {
              database: false,
              schema: false,
              permissions: false
            }
          });
          setIsLoading(false);
        }
      }
    };

    checkHealth();
    
    // Recheck every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const getStatusIcon = () => {
    if (isLoading) return <Loader2Icon className="w-4 h-4 animate-spin" />;
    if (!health) return <CircleXIcon className="w-4 h-4 text-red-500" />;
    
    switch (health.status) {
      case 'healthy':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'degraded':
        return <TriangleAlertIcon className="w-4 h-4 text-yellow-500" />;
      case 'unhealthy':
        return <CircleXIcon className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    if (!health) return 'destructive';
    switch (health.status) {
      case 'healthy': return 'success';
      case 'degraded': return 'warning';
      case 'unhealthy': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = () => {
    if (isLoading) return 'Checking...';
    if (!health) return 'Offline';
    
    if (health.status === 'healthy') return 'All systems operational';
    if (health.status === 'degraded') return 'Degraded performance';
    return 'System unavailable';
  };

  if (compact) {
    // Compact version for signin page
    return (
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          {getStatusIcon()}
          <span>System Status</span>
        </button>
        
        {showDetails && health && (
          <div className="absolute mt-32 bg-white border rounded-lg shadow-lg p-4 z-50 min-w-[250px]">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall</span>
                <Badge color={getStatusColor() as any}>{health.status}</Badge>
              </div>
              <div className="border-t pt-2 space-y-1">
                <StatusCheck label="Database" status={health.checks.database} />
                <StatusCheck label="Schema" status={health.checks.schema} />
                <StatusCheck label="Permissions" status={health.checks.permissions} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full version
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Database Status</h3>
        {getStatusIcon()}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">{getStatusText()}</span>
          <Badge color={getStatusColor() as any} className="text-xs">
            {health?.status || 'unknown'}
          </Badge>
        </div>
        
        {health && (
          <div className="space-y-1 pt-2 border-t dark:border-gray-700">
            <StatusCheck label="Database Connection" status={health.checks.database} />
            <StatusCheck label="Schema Ready" status={health.checks.schema} />
            <StatusCheck label="Access Permissions" status={health.checks.permissions} />
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCheck({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <div className="flex items-center gap-1">
        {status ? (
          <>
            <CheckCircleIcon className="w-3 h-3 text-green-500" />
            <span className="text-green-600 dark:text-green-400">OK</span>
          </>
        ) : (
          <>
            <CircleXIcon className="w-3 h-3 text-red-500" />
            <span className="text-red-600 dark:text-red-400">Failed</span>
          </>
        )}
      </div>
    </div>
  );
}