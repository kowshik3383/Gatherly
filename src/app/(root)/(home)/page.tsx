import MeetingTypeList from '@/components/MeetingTypeList';
import { Calendar, Clock } from 'lucide-react';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="flex size-full flex-col gap-8 text-white p-6 lg:p-8">
      {/* Hero Banner with Gradient */}
      <div className="relative h-[340px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 shadow-2xl">
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
          {/* Upcoming Meeting Badge */}
          <div className="flex items-center justify-start">
            <div className="group relative px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                  <Clock size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">Next Meeting</span>
                  <span className="text-base font-semibold text-white">02:45 PM</span>
                </div>
              </div>
              
              {/* Pulse indicator */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </div>
          </div>

          {/* Time and Date Display */}
          <div className="flex flex-col gap-3">
            {/* Current Time */}
            <div className="flex items-baseline gap-4">
              <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
                {time}
              </h1>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400 font-medium">Live</span>
              </div>
            </div>

            {/* Current Date */}
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar size={20} className="text-gray-400" />
              <p className="text-lg lg:text-xl font-medium">{date}</p>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
      </div>

      {/* Meeting Actions */}
      <MeetingTypeList />
    </section>
  );
};

export default Home;