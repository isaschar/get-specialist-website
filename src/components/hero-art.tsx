export function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full bg-[#E7F6FC]" />
      <svg viewBox="0 0 420 420" className="relative h-full w-full">
        <rect x="118" y="150" width="184" height="150" rx="18" fill="#009DE0" />
        <path d="M96 168 210 78l114 90" fill="none" stroke="#141414" strokeWidth="16" strokeLinejoin="round" />
        <rect x="186" y="230" width="48" height="70" rx="8" fill="#F7F9FA" />
        <circle cx="300" cy="118" r="36" fill="#00C2E8" />
        <circle cx="300" cy="108" r="12" fill="#fff" />
        <path d="M276 150c8 18 18 26 24 26s16-8 24-26" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        <rect x="62" y="248" width="92" height="72" rx="16" fill="#fff" />
        <path d="M84 286h48M84 300h32" stroke="#009DE0" strokeWidth="6" strokeLinecap="round" />
        <circle cx="84" cy="270" r="8" fill="#009DE0" />
      </svg>
    </div>
  );
}
