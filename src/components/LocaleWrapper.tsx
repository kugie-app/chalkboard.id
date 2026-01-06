"use client";

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

interface LocaleWrapperProps {
  children: React.ReactNode;
}

export default function LocaleWrapper({ children }: LocaleWrapperProps) {
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    // Set the lang attribute on the html element
    if (locale && ['id', 'en'].includes(locale)) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <>{children}</>;
} 