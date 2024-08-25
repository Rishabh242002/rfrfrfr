'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './homecard';
import MeetingModal from './MeetingModel';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { Call } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { useTranslations } from 'next-intl'; // Import the translation hook

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const client = useStreamVideoClient();
  const { user } = useUser();
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const { toast } = useToast();
  const t = useTranslations(); // Initialize the translation hook

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: t('selectDateTimePrompt') });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error(t('meetingCreationError'));
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || t('instantMeeting');
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);

      if (!values.description) {
        router.push(`eco/meeting/${call.id}`);
      }
    } catch (error) {
      console.error(error);
      toast({ title: t('meetingCreated') });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title={t('newMeeting')}
        description={t('startInstantMeeting')}
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title={t('joinMeeting')}
        description={t('viaInvitationLink')}
        className="bg-blue-600"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title={t('scheduleMeeting')}
        description={t('planYourMeeting')}
        className="bg-purple-700"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title={t('viewRecordings')}
        description={t('meetingRecordings')}
        className="bg-yellow-500"
        handleClick={() => router.push('/recordings')}
      />

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title={t('createMeeting')}
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              {t('addDescription')}
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              {t('selectDateAndTime')}
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title={t('meetingCreated')}
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: t('linkCopied') });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText={t('copyMeetingLink')}
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title={t('startInstantMeeting')}
        className="text-center"
        buttonText={t('startMeeting')}
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
