import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNavsm from './mobilenavsm';
import { SignedIn } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-3 px-4 py-3 sm:px-6 lg:px-10">
      <Link href="/" className="flex items-center gap-2 sm:gap-3">
        <Image
          src="/icons/logo-no-background.png"
          width={200}
          height={100}
          alt="Astuces"
          className="w-[80px] h-auto sm:w-[100px] md:w-[140px] lg:w-[160px] xl:w-[180px]" // Responsive sizing
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <div className="social-media-buttons flex gap-2 sm:gap-3">
          <Link href="https://www.instagram.com/" target="_blank" className="social-button">
            <Image
              src="/icons/path-to-instagram-icon.png"
              width={18}
              height={18}
              alt="Instagram"
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </Link>
          <Link href="https://www.facebook.com/yourprofile" target="_blank" className="social-button">
            <Image
              src="/icons/path-to-facebook-icon.png"
              width={18}
              height={18}
              alt="Facebook"
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </Link>
          <Link href="https://www.twitter.com/yourprofile" target="_blank" className="social-button">
            <Image
              src="/icons/path-to-twitter-icon.png"
              width={18}
              height={18}
              alt="Twitter"
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </Link>
        </div>
        <LanguageSwitcher/>
        <MobileNavsm />
      </div>
    </nav>
  );
}
