"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button, Dropdown } from 'flowbite-react';
import { IconLanguage } from '@tabler/icons-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (nextLocale: string) => {
    // Replace the locale part of the path
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPath);
  };

  const locales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
  ];

  const currentLocaleData = locales.find(l => l.code === locale) || locales[0];

  return (
    <Dropdown 
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <Button color="light" size="sm">
          <IconLanguage className="w-4 h-4 mr-2" />
          <span className="mr-1">{currentLocaleData.flag}</span>
          {currentLocaleData.name}
        </Button>
      )}
    >
      {locales.map((localeData) => (
        <Dropdown.Item 
          key={localeData.code}
          onClick={() => switchLocale(localeData.code)}
          className={locale === localeData.code ? 'bg-blue-50 dark:bg-blue-900' : ''}
        >
          <span className="mr-2">{localeData.flag}</span>
          {localeData.name}
          {locale === localeData.code && <span className="ml-2 text-blue-600">✓</span>}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
} 