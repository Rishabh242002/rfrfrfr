"use client";

import { Toaster } from '@/components/ui/toaster';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/usegetcallbyid';
import Loader from '@/components/Loader';
import { useTranslations } from 'next-intl';
import ProtectedPagesm from '@/components/Protectedpagesm';

export default function Meeting({ params: { id } }: { params: { id: string } }) {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  const t = useTranslations(); // Initialize the translation hook

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <ProtectedPagesm>
    <main className="h-screen w-full">
      <StreamCall call={call} >
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  </ProtectedPagesm> );
};
