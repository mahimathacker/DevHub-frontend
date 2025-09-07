'use client';

export default function LoadingAnimation() {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
            {/* Terminal-style loading animation */}
            <div className="w-64 h-32 bg-black/5 dark:bg-white/5 rounded-lg p-4 font-mono text-sm 
            border border-black/20 dark:border-[#22c55e]/20 relative overflow-hidden">
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-black dark:text-[#22c55e] typing-animation">
                    <span className="inline-block">
                        $ loading content<span className="blink">_</span>
                    </span>
                </div>
                {/* Progress dots */}
                <div className="mt-2 flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-black/50 dark:bg-[#22c55e]/50 animate-pulse"></div>
                    <div className="w-1 h-1 rounded-full bg-black/50 dark:bg-[#22c55e]/50 animate-pulse delay-100"></div>
                    <div className="w-1 h-1 rounded-full bg-black/50 dark:bg-[#22c55e]/50 animate-pulse delay-200"></div>
                </div>
            </div>
        </div>
    );
} 