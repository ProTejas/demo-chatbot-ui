interface ChatHeaderProps {
  title: string;
}

export default function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <header className="bg-[hsl(var(--tata-primary))] text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        {/* TIA Avatar */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            {/* Female assistant avatar */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--tata-primary))]">
              <circle cx="12" cy="8" r="3" fill="currentColor"/>
              <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="currentColor"/>
              <path d="M8 8c0-2 1.5-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-xs opacity-80">Your Virtual Assistant</p>
        </div>
      </div>
      <button className="text-white hover:text-gray-200 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </header>
  );
}
