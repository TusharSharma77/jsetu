'use client';

import React, { useEffect } from 'react';
import '@/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize i18n on client side
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      // i18n.changeLanguage will be handled by the LanguageSelector component
    }
  }, []);

  return <>{children}</>;
};

export default I18nProvider;
