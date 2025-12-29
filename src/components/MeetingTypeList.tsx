/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Video, UserPlus, Calendar, PlayCircle } from 'lucide-react';

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
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
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
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  const meetingCards = [
    {
      icon: <Video size={28} className="text-white" />,
      title: "New Meeting",
      description: "Start an instant meeting",
      gradient: "from-blue-600 to-blue-700",
      hoverGradient: "hover:from-blue-500 hover:to-blue-600",
      onClick: () => setMeetingState('isInstantMeeting'),
    },
    {
      icon: <UserPlus size={28} className="text-white" />,
      title: "Join Meeting",
      description: "via invitation link",
      gradient: "from-purple-600 to-purple-700",
      hoverGradient: "hover:from-purple-500 hover:to-purple-600",
      onClick: () => setMeetingState('isJoiningMeeting'),
    },
    {
      icon: <Calendar size={28} className="text-white" />,
      title: "Schedule Meeting",
      description: "Plan your meeting",
      gradient: "from-pink-600 to-pink-700",
      hoverGradient: "hover:from-pink-500 hover:to-pink-600",
      onClick: () => setMeetingState('isScheduleMeeting'),
    },
    {
      icon: <PlayCircle size={28} className="text-white" />,
      title: "View Recordings",
      description: "Meeting Recordings",
      gradient: "from-orange-600 to-orange-700",
      hoverGradient: "hover:from-orange-500 hover:to-orange-600",
      onClick: () => router.push('/recordings'),
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {meetingCards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="group relative cursor-pointer"
          >
            {/* Card Container */}
            <div className={`relative h-[240px] rounded-2xl bg-gradient-to-br ${card.gradient} ${card.hoverGradient} transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105`}>
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Icon */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    {card.icon}
                  </div>
                  
                  {/* Decorative element */}
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300" />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:h-1.5 transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Meeting Modal */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-4">
            <label className="text-base font-medium text-gray-300">
              Add a description
            </label>
            <Textarea
              className="min-h-[100px] rounded-xl border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="What's this meeting about?"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            <label className="text-base font-medium text-gray-300">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded-xl bg-gray-800/50 border border-gray-700 p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="rounded-xl border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-12"
        />
      </MeetingModal>

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;