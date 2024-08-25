'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-orange-600 px-4 py-6 flex flex-col justify-between w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl min-h-[260px] rounded-[14px] cursor-pointer',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px] mb-4">
        <Image src={img} alt="meeting" width={40} height={40} />
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <p className="text-base sm:text-lg font-normal">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
