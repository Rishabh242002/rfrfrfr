/** @jsxImportSource react */
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from "next-intl";
import LanguageSwitcher from '@/components/LanguageSwitcher';

const ChoicePage = () => {
  const t = useTranslations();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center relative"
      style={{ background: "linear-gradient(to right, #87c0cd, #508c9b, #113f67)" }}
    >
      {/* LanguageSwitcher placed in the top right corner with some offset */}
      <div className="absolute top-8 right-20">
        <LanguageSwitcher />
      </div>

      <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
          {t('chooseField')}
        </h1>
        <div className="space-y-4 sm:space-y-0 sm:space-x-5 flex flex-col sm:flex-row justify-center items-center">
          <Link href="/pc-svt" passHref>
            <button
              className="px-5 py-4 text-base sm:text-lg font-semibold text-white rounded-full flex items-center justify-center gap-3"
              style={{ backgroundColor: '#508c9b', width: '220px', height: '60px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#406f7f'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#508c9b'}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 4px #87c0cd'}
            >
              <Image src="/icons/la-physique.png" alt={t('physicalSciences')} width={30} height={30} />
              <span>{t('physicalSciences')}</span>
            </button>
          </Link>
          <Link href="/sm" passHref>
            <button
              className="px-5 py-4 text-base sm:text-lg font-semibold text-white rounded-full flex items-center justify-center gap-3"
              style={{ backgroundColor: '#87c0cd', width: '220px', height: '60px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#70b6c6'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#87c0cd'}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 4px #508c9b'}
            >
              <Image src="/icons/mathematiques.png" alt={t('mathematicalSciences')} width={30} height={30} />
              <span>{t('mathematicalSciences')}</span>
            </button>
          </Link>
          <Link href="/eco" passHref>
            <button
              className="px-5 py-4 text-base sm:text-lg font-semibold text-white rounded-full flex items-center justify-center gap-3"
              style={{ backgroundColor: '#113f67', width: '220px', height: '60px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0e2f4a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#113f67'}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 4px #87c0cd'}
            >
              <Image src="/icons/economic.png" alt={t('economicSciences')} width={30} height={30} />
              <span>{t('economicSciences')}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChoicePage;

