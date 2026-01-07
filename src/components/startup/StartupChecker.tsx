"use client";

import { ArrowRightIcon, CheckCircleIcon, CircleXIcon, TriangleAlertIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface HealthCheck {
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: string;
}

interface StartupStatus {
  isReady: boolean;
  healthReport: {
    overall: 'healthy' | 'warning' | 'error';
    checks: {
      connection: HealthCheck;
      schema: HealthCheck;
      tables: HealthCheck;
      permissions: HealthCheck;
    };
  } | null;
  errors: string[];
  warnings: string[];
  startupTime: number;
}

const CheckIcon = ({ status }: { status: 'healthy' | 'warning' | 'error' | 'loading' }) => {
  switch (status) {
    case 'healthy':
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case 'warning':
      return <TriangleAlertIcon className="w-5 h-5 text-yellow-500" />;
    case 'error':
      return <CircleXIcon className="w-5 h-5 text-red-500" />;
    case 'loading':
      return <ArrowRightIcon className="w-5 h-5 text-blue-500 animate-spin" />;
    default:
      return <ArrowRightIcon className="w-5 h-5 text-gray-400" />;
  }
};

const StatusBadge = ({ status }: { status: 'healthy' | 'warning' | 'error' | 'loading' }) => {
  const colors = {
    healthy: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    loading: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

export default function StartupChecker({ onReady }: { onReady?: (ready: boolean) => void }) {
  const [status, setStatus] = useState<StartupStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkStartupStatus = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/health?detailed=true');
        const data = await response.json();
        
        if (mounted) {
          const startupStatus: StartupStatus = {
            isReady: data.ready || false,
            healthReport: data.health,
            errors: data.errors || [],
            warnings: data.warnings || [],
            startupTime: data.startupTime || 0,
          };
          
          setStatus(startupStatus);
          setIsLoading(false);
          
          // Notify parent component
          if (onReady) {
            onReady(startupStatus.isReady);
          }
        }
      } catch (error) {
        if (mounted) {
          setStatus({
            isReady: false,
            healthReport: null,
            errors: ['Failed to check startup status'],
            warnings: [],
            startupTime: 0,
          });
          setIsLoading(false);
          
          if (onReady) {
            onReady(false);
          }
        }
      }
    };

    checkStartupStatus();

    return () => {
      mounted = false;
    };
  }, [onReady]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <ArrowRightIcon className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Starting Application</h3>
            <p className="mt-2 text-sm text-gray-500">
              Checking database connection and application status...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <CircleXIcon className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Startup Check Failed</h3>
            <p className="mt-2 text-sm text-gray-500">
              Unable to determine application status.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status.isReady) {
    return null; // Don't show anything if app is ready
  }

  const healthChecks = status.healthReport?.checks || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <CheckIcon status={status.healthReport?.overall || 'error'} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Application Status</h3>
          <div className="mt-2">
            <StatusBadge status={status.healthReport?.overall || 'error'} />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Startup completed in {status.startupTime}ms
          </p>
        </div>

        {/* Health Checks */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-gray-700">Health Checks</h4>
          
          {Object.entries(healthChecks).map(([key, check]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckIcon status={(check as HealthCheck).status} />
                <span className="ml-3 text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-900">{(check as HealthCheck).message}</div>
                {(check as HealthCheck).details && (
                  <div className="text-xs text-gray-500">{(check as HealthCheck).details}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Errors */}
        {status.errors.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-red-700 mb-2">Errors</h4>
            <div className="space-y-2">
              {status.errors.map((error, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {status.warnings.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-yellow-700 mb-2">Warnings</h4>
            <div className="space-y-2">
              {status.warnings.map((warning, index) => (
                <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>

        {/* Detailed Information */}
        {showDetails && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">System Information</h4>
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify(status, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}