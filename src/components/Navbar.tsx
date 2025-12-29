import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#1F1F1F] px-6 py-4 lg:px-10 shadow-lg">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/5 via-transparent to-[#2563EB]/5 pointer-events-none" />
      
      <div className="relative flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
          {/* Logo Container with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl  shadow-lg group-hover:shadow-[#3B82F6]/50 group-hover:scale-90- transition-all duration-300">
              <Image
                src="/icons/logo.svg"
                width={24}
                height={24}
                alt="gatherly logo"
                className="relative z-10"
              />
            </div>
          </div>
          
          {/* Brand Name */}
          <div className="flex flex-col max-sm:hidden">
            <p className="text-2xl font-bold bg-gradient-to-r from-white via-white to-[#A1A1A1] bg-clip-text text-transparent">
              Gatherly
            </p>
            <div className="h-0.5 w-0 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] group-hover:w-full transition-all duration-300" />
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Button with enhanced styling */}
          <SignedIn>
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#1F1F1F] hover:bg-[#2A2A2A] transition-all duration-300 overflow-hidden ring-2 ring-[#1F1F1F] hover:ring-[#3B82F6]/50">
                <UserButton 
                  afterSignOutUrl="/sign-in"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-[#1F1F1F] border border-[#2A2A2A]",
                      userButtonPopoverActionButton: "hover:bg-[#2A2A2A]",
                    }
                  }}
                />
              </div>
            </div>
          </SignedIn>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />
    </nav>
  );
};

export default Navbar;