'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#0A0A0A] border-r border-[#1F1F1F] p-6 pt-28 text-white max-sm:hidden lg:w-[264px] shadow-2xl">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Navigation Links */}
      <div className="relative flex flex-1 flex-col gap-3">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'group relative flex gap-4 items-center p-4 rounded-xl justify-start transition-all duration-300 overflow-hidden',
                isActive 
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] shadow-lg shadow-[#3B82F6]/20' 
                  : 'hover:bg-[#1F1F1F] hover:shadow-md'
              )}
            >
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
              )}
              
              {/* Hover gradient effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 to-[#3B82F6]/0 group-hover:from-[#3B82F6]/10 group-hover:to-[#2563EB]/10 transition-all duration-300" />
              )}
              
              {/* Icon Container */}
              <div className={cn(
                'relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300',
                isActive 
                  ? 'bg-white/10' 
                  : 'bg-[#1F1F1F] group-hover:bg-[#2A2A2A] group-hover:scale-110'
              )}>
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={cn(
                    'transition-all duration-300',
                    isActive ? 'brightness-0 invert' : 'opacity-70 group-hover:opacity-100'
                  )}
                />
              </div>
              
              {/* Label */}
              <p className={cn(
                'text-base font-semibold max-lg:hidden transition-all duration-300',
                isActive 
                  ? 'text-white' 
                  : 'text-[#A1A1A1] group-hover:text-white'
              )}>
                {item.label}
              </p>
              
              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Bottom decorative element (optional) */}
      <div className="relative mt-6 pt-6 border-t border-[#1F1F1F]">
        <div className="flex items-center justify-center">
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB]" />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;