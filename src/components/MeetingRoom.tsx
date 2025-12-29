'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList, X } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Main content area */}
      <div className="relative flex size-full items-center justify-center p-4">
        <div className={cn(
          "flex items-center justify-center transition-all duration-300",
          showParticipants ? "w-full max-w-[1400px]" : "w-full max-w-[1200px]"
        )}>
          {/* Video Layout */}
          <div className={cn(
            "relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300",
            showParticipants ? "w-[calc(100%-320px)] mr-4" : "w-full"
          )}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-10" />
            <CallLayout />
          </div>

          {/* Participants Panel */}
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            showParticipants 
              ? "w-80 opacity-100 translate-x-0" 
              : "w-0 opacity-0 translate-x-8 pointer-events-none"
          )}>
            <div className="h-[calc(100vh-8rem)] rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Participants header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/40">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Users size={18} />
                  Participants
                </h3>
                <button
                  onClick={() => setShowParticipants(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>
              
              {/* Participants list */}
              <div className="h-[calc(100%-60px)] overflow-y-auto">
                <CallParticipantsList onClose={() => setShowParticipants(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center pb-6 px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-900/80 backdrop-blur-2xl border border-gray-700/50 shadow-2xl shadow-black/40">
          
          {/* Main Call Controls */}
          <div className="flex items-center gap-2 [&>*]:transition-all [&>*]:duration-200 [&>*:hover]:scale-110 [&>*:active]:scale-95">
            <CallControls onLeave={() => router.push(`/`)} />
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-600/50 to-transparent mx-1" />

          {/* Layout Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="group relative rounded-full bg-gray-800/90 p-3.5 backdrop-blur-sm transition-all duration-200 hover:bg-gray-700 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <LayoutList size={20} className="text-white" />
              <span className="absolute -top-11 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Layout
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mb-2 w-48 rounded-xl bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl p-1">
              {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                    className={cn(
                      "text-gray-200 hover:bg-gray-700/60 focus:bg-gray-700/60 cursor-pointer transition-all duration-150 rounded-lg px-3 py-2.5",
                      layout === item.toLowerCase() && "bg-blue-600/20 text-blue-300"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item}
                      {layout === item.toLowerCase() && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                      )}
                    </span>
                  </DropdownMenuItem>
                  {index < 2 && (
                    <DropdownMenuSeparator className="bg-gray-700/50 my-1" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Call Stats Button */}
          <div className="group relative">
            <div className="transition-all duration-200 hover:scale-110 active:scale-95">
              <CallStatsButton />
            </div>
            <span className="absolute -top-11 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Call Stats
            </span>
          </div>

          {/* Participants Toggle */}
          <button
            onClick={() => setShowParticipants((prev) => !prev)}
            className={cn(
              "group relative rounded-full p-3.5 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50",
              showParticipants
                ? "bg-blue-600/90 shadow-lg shadow-blue-500/40"
                : "bg-gray-800/90 hover:bg-gray-700"
            )}
          >
            <Users size={20} className="text-white" />
            <span className="absolute -top-11 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {showParticipants ? 'Hide' : 'Show'} Participants
            </span>
            {showParticipants && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            )}
          </button>

          {/* Divider before End Call */}
          {!isPersonalRoom && (
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-600/50 to-transparent mx-1" />
          )}

          {/* End Call Button */}
          {!isPersonalRoom && (
            <div className="group relative">
              <div className="transition-all duration-200 hover:scale-110 active:scale-95">
                <EndCallButton />
              </div>
              <span className="absolute -top-11 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                End Call
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Connection indicator */}
      <div className="absolute top-12 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs text-gray-300">Connected</span>
      </div>
    </section>
  );
};

export default MeetingRoom;