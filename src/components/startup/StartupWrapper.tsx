"use client";

import React, { useState, useEffect } from 'react';
import StartupChecker from './StartupChecker';

interface StartupWrapperProps {
  children: React.ReactNode;
  enableStartupCheck?: boolean;
}

export default function StartupWrapper({ children, enableStartupCheck = true }: StartupWrapperProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  // Skip startup check in development or if disabled
  useEffect(() => {
    if (!enableStartupCheck || process.env.NODE_ENV === 'development') {
      setIsReady(true);
      setHasChecked(true);
      return;
    }

    // Show app after 30 seconds regardless of startup status (failsafe)
    const timeout = setTimeout(() => {
      console.warn('Startup check timeout - showing app anyway');
      setForceShow(true);
      setIsReady(true);
    }, 30000);

    return () => clearTimeout(timeout);
  }, [enableStartupCheck]);

  const handleStartupReady = (ready: boolean) => {
    setIsReady(ready);
    setHasChecked(true);
  };

  // Show startup checker if:
  // - Startup check is enabled
  // - We haven't checked yet OR app is not ready
  // - We haven't forced show due to timeout
  const shouldShowStartup = enableStartupCheck && 
                           (!hasChecked || !isReady) && 
                           !forceShow && 
                           process.env.NODE_ENV !== 'development';

  if (shouldShowStartup) {
    return <StartupChecker onReady={handleStartupReady} />;
  }

  return <>{children}</>;
}