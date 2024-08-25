'use client';

import React, { useEffect, useState } from 'react';
import { DeviceSettings, VideoPreview } from '@stream-io/video-react-sdk';
import { useCall } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl'; // Import the translation hook
import LanguageSwitcher from './LanguageSwitcher';

export default function MeetingSetup({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const call = useCall();
  const t = useTranslations(); // Initialize the translation hook

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  return (
    
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">

<div className="absolute top-8 right-20  text-[#113f67]">
        <LanguageSwitcher />
      </div>

      <h1 className="text-center text-2xl font-bold">{t('setup')}</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          {t('joinWithMicAndCameraOff')}
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        {t('joinMeeting')}
      </Button>
    </div>
  );
}
