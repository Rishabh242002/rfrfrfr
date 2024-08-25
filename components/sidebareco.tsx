// Sidebar.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks3 } from "@/constants/indexeco";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl"; // Import the useTranslations hook

const Sidebar = () => {
  const pathname = usePathname();
  const t = useTranslations(); // Initialize the translation hook

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-3 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks3.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-dark-4": isActive,
                }
              )}
            >
              {link && (
                <Image
                  src={link.imgURL}
                  alt={t(link.label)}
                  width={24}
                  height={24}
                />
              )}
              
              <p className="text-lg font-semibold max-lg:hidden">
                {t(link.label)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
