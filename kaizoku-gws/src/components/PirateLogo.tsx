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
      className={cn("w-8 h-8", className)}
    >
      <g filter="url(#glow)">
        <path
          d="M24 8C19 8 15 11 14 16C13 20 14 24 16 27L18 30L24 36L30 30L32 27C34 24 35 20 34 16C33 11 29 8 24 8Z"
          fill="#E6EDF3"
          stroke="rgba(79,209,255,0.4)"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 22L16 28"
          stroke="#E6EDF3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M38 22L32 28"
          stroke="#E6EDF3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 20L10 22"
          stroke="#E6EDF3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M40 20L38 22"
          stroke="#E6EDF3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 32L17 44"
          stroke="#E6EDF3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M34 32L31 44"
          stroke="#E6EDF3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="19" r="3.5" fill="#0B0D10" />
        <circle cx="28" cy="19" r="3.5" fill="#0B0D10" />
        <path
          d="M19 21L24 24L29 21"
          stroke="#0B0D10"
          strokeWidth="1"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M15 12C17 10 20 9 24 9C28 9 31 10 33 12"
          stroke="#EAB308"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 13.5C18 12 22 11.5 24 11.5C26 11.5 30 12 34 13.5"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 15C19 14 22 13.5 24 13.5C26 13.5 29 14 32 15"
          fill="#EAB308"
          stroke="none"
        />
      </g>
      <defs>
        <filter id="glow" x="-2" y="-2" width="52" height="52">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
