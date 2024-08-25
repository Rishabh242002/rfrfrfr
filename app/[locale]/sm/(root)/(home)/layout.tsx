
import Sidebar from '@/components/sidebarsm';
import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/navbarsm';

export const metadata: Metadata = {
  title: "Les Astuces",
  description: "Les Astuces is a comprehensive online educational platform designed specifically for students preparing for their baccalaureate exams. Our goal is to provide high-quality, interactive, and accessible learning resources to help students excel in their studies and achieve their academic goals.",
  icons: {
    icon: "/icons/les-astuces-favicon-color.png",
  },
};


const Homelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar/>

      <div className='flex'>
        <Sidebar />
        
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28' >
          <div className='w-full'>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Homelayout;
