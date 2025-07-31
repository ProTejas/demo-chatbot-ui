export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-[hsl(var(--tata-accent))] rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
          <path d="M12 8V4H8"/>
          <rect width="16" height="12" x="4" y="8" rx="2"/>
          <path d="M2 14h2"/>
          <path d="M20 14h2"/>
          <path d="M15 13v2"/>
          <path d="M9 13v2"/>
        </svg>
      </div>
      <div className="bg-[hsl(var(--bot-bubble))] rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[hsl(var(--tata-accent))] rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-[hsl(var(--tata-accent))] rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-[hsl(var(--tata-accent))] rounded-full typing-dot"></div>
        </div>
      </div>
    </div>
  );
}
