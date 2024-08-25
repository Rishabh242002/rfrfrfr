import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#296d7e] text-white text-center">
      <div className="absolute top-5 right-5 flex space-x-2">
        <Link href="/sign-in">
          <div className="bg-[#87c0cd] text-[#113f67] py-2 px-4 text-md rounded-md shadow-md hover:bg-[#6daabc] hover:text-white transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            {t('signIn')}
          </div>
        </Link>
        <Link href="/sign-up">
          <div className="bg-[#87c0cd] text-[#113f67] py-2 px-4 text-md rounded-md shadow-md hover:bg-[#6daabc] hover:text-white transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            {t('signUp')}
          </div>
        </Link>
        <div className=" text-[#113f67]">
        <LanguageSwitcher />
      </div>
      </div>
      <h1 className="text-5xl font-bold mt-8 tracking-wide hover:tracking-wider transition-all duration-300 ease-in-out">
        {t('welcome')}
      </h1>
    </div>
  );
}
