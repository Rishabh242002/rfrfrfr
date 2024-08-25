import React from 'react';
import { useTranslations } from 'next-intl'; // Import useTranslations hook

export default function Todolisttitle() {
  const t = useTranslations(); // Use the 'common' namespace for translations

  return (
    <h1 className="text-3xl font-bold text-[#113f67]">
      {t('todoList')}  {/* Fetch the translation for "Todo List" */}
    </h1>
  );
}
