"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText = "Schedule Meeting",
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "w-full max-w-[520px]",
          "rounded-2xl border border-white/10",
          "bg-gradient-to-b from-[#1c1f2b] to-[#11131a]",
          "px-6 py-8 text-white shadow-2xl",
          "animate-in fade-in zoom-in-95"
        )}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          {image && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <Image src={image} alt="modal icon" width={32} height={32} />
            </div>
          )}

          <h1
            className={cn(
              "text-2xl font-semibold tracking-tight",
              className
            )}
          >
            {title}
          </h1>
        </div>

        {/* Body */}
        {children && (
          <div className="mt-6 text-sm text-white/70">
            {children}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8">
          <Button
            onClick={handleClick}
            className={cn(
              "h-12 w-full rounded-xl",
              "bg-blue-600 hover:bg-blue-500",
              "text-base font-medium",
              "transition-all duration-200",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "active:scale-[0.98]",
              buttonClassName
            )}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
