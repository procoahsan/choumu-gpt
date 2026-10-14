"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ChoumuAvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  accent?: string;
  className?: string;
  showStatus?: boolean;
  focalPoint?: string;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const statusSizeMap = {
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
};

export function ChoumuAvatar({
  src,
  alt,
  size = "md",
  accent,
  className,
  showStatus = false,
  focalPoint = "center",
}: ChoumuAvatarProps) {
  const accentColor =
    accent === "cyan"
      ? "ring-cyan-400/40"
      : accent === "rose"
        ? "ring-rose-400/40"
        : "ring-purple-400/40";

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "relative rounded-full overflow-hidden ring-2",
          sizeMap[size],
          accentColor
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: focalPoint }}
          sizes={
            size === "xl"
              ? "96px"
              : size === "lg"
                ? "64px"
                : size === "md"
                  ? "40px"
                  : "32px"
          }
        />
      </div>
      {showStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-emerald-400 border-2 border-[#0c0414]",
            statusSizeMap[size]
          )}
        />
      )}
    </div>
  );
}
