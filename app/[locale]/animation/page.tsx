'use client';  // This directive marks the component as a Client Component

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs'; // Import the useUser hook
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl'; // Import useTranslations and useLocale from next-intl

export default function Home() {
  const { user, isLoaded } = useUser(); // Get user info from Clerk
  const router = useRouter(); // Initialize the router
  const t = useTranslations(); // Get translations for the "Home" namespace
  const locale = useLocale(); // Get the current locale

  useEffect(() => {
    // Redirect to the /en/choices page after 5.5 seconds
    const timer = setTimeout(() => {
      router.push('/choices');
    }, 4500);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-[#5e9dab] ${locale === 'ar' ? 'rtl' : ''}`}>
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src="/icons/logo-no-background.png" // Path to your logo image
          alt="Astuces Logo"
          width={400} // Adjust the size as necessary
          height={200} // Adjust the size as necessary
        />
      </motion.div>

      {isLoaded && user && (
        <motion.div
          className="mt-5 text-2xl font-semibold text-[#113f67] tracking-wide text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }} // Delay the appearance of the welcome message
        >
          {t('welcome')}, <span className="font-bold">{user.username}</span>!
        </motion.div>
      )}

      <style jsx>{`
        .rtl {
          direction: rtl; /* Apply right-to-left direction */
          text-align: right; /* Right align text */
        }
      `}</style>
    </div>
  );
}
