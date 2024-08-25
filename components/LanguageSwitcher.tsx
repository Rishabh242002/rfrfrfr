'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const LanguageSwitcher = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (locale: string) => {
    if (!pathname) {
      console.error('Pathname is undefined');
      return;
    }

    const newPathname = `/${locale}${pathname.replace(/^\/[a-z]{2}/, '')}`;
    window.location.href = newPathname + window.location.search;
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="px-4 py-2 text-sm font-semibold bg-[#113f67] text-white rounded-full transition-all duration-300 ease-in-out transform hover:bg-[#87c0cd] hover:text-[#113f67] hover:scale-105 focus:outline-none shadow-md"
      >
        {t('language')}
      </button>

      {menuOpen && (
        <div className="absolute mt-2 right-0 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-in-out">
          <button
            className={`block w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${
              pathname.startsWith('/en') ? 'bg-[#236bab] text-white' : 'hover:bg-[#87c0cd] hover:text-[#113f67]'
            } rounded-t-lg`}
            onClick={() => changeLanguage('en')}
          >
            {t('english')}
          </button>
          <button
            className={`block w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${
              pathname.startsWith('/fr') ? 'bg-[#236bab] text-white' : 'hover:bg-[#87c0cd] hover:text-[#113f67]'
            }`}
            onClick={() => changeLanguage('fr')}
          >
            {t('french')}
          </button>
          <button
            className={`block w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${
              pathname.startsWith('/ar') ? 'bg-[#236bab] text-white' : 'hover:bg-[#87c0cd] hover:text-[#113f67]'
            } rounded-b-lg`}
            onClick={() => changeLanguage('ar')}
          >
            {t('arabic')}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
