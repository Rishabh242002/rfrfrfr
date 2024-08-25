import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Astuces",
    description: "Astuces is a comprehensive online educational platform designed specifically for students preparing for their baccalaureate exams. Our goal is to provide high-quality, interactive, and accessible learning resources to help students excel in their studies and achieve their academic goals.",
    icons: {
      icon: "/icons/les-astuces-favicon-color.png",
    },
  };

import StreamVideoProvider from '@/providers/StreamProviderClient';
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;