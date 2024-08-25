import CallList from '@/components/CallList';
import React from 'react';
import { useTranslations } from 'next-intl';
import ProtectedPageeco from '@/components/Protectedpageeco';

export default function Upcoming() {
  // Call `useTranslations` inside the component
  const t = useTranslations(); // Assuming 'common' is the namespace for your translations

  return (
    <ProtectedPageeco>
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-extrabold">{t("upcomming")}</h1>
      <CallList type="upcoming" />
    </section>
    </ProtectedPageeco>
  );
}
