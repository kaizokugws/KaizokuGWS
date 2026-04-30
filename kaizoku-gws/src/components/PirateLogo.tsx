import { cn } from "@/lib/utils";

interface PirateLogoProps {
  className?: string;
}

export default function PirateLogo({ className }: PirateLogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
    >
      <g filter="url(#glow)">
        <path
          d="M24 6C18 6 14 9 12 13C10 17 10 22 12 26L14 28L24 34L34 28L36 26C38 22 38 17 36 13C34 9 30 6 24 6Z"
          fill="#E6EDF3"
          stroke="#22D3EE"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 20L12 26"
          stroke="#E6EDF3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M40 20L36 26"
          stroke="#E6EDF3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 18L8 20"
          stroke="#E6EDF3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M42 18L40 20"
          stroke="#E6EDF3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="19" cy="18" r="3" fill="#0B0D10" stroke="#22D3EE" strokeWidth="0.8" />
        <circle cx="29" cy="18" r="3" fill="#0B0D10" stroke="#22D3EE" strokeWidth="0.8" />
        <line x1="20" y1="19" x2="22" y2="21" stroke="#22D3EE" strokeWidth="0.6" />
        <line x1="28" y1="19" x2="26" y2="21" stroke="#22D3EE" strokeWidth="0.6" />
        <path
          d="M18 13C19 12 21 11 24 11C27 11 29 12 30 13"
          stroke="#22D3EE"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M17 14.5C20 13.5 24 13 24 13C24 13 28 13.5 31 14.5"
          stroke="#E6EDF3"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M14 30L18 44"
          stroke="#E6EDF3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M34 30L30 44"
          stroke="#E6EDF3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter id="glow" x="-4" y="-4" width="56" height="56">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
