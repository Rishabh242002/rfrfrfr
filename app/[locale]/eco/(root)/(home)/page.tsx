// app/(root)/(home)/page.tsx

"use client"; // Indique que ce fichier est un Client Component

import MeetingTypeList from "@/components/meetingtypelist";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProtectedPageeco from "@/components/Protectedpageeco";

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now)
      );
    };

    // Mettre à jour l'heure et la date immédiatement
    updateDateTime();

    // Mettre à jour l'heure chaque seconde
    const intervalId = setInterval(updateDateTime, 1000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  const t = useTranslations();

  return (
    <ProtectedPageeco>
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            {t("upcomingMeetingTitle")}: {time}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
    </ProtectedPageeco>
  );
}
