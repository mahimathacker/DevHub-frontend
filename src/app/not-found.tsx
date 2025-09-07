import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
            <div className="w-full max-w-lg space-y-4 sm:space-y-6 px-4 text-center">
                {/* Large 404 */}
                <h1 className="text-[120px] sm:text-[200px] font-mono font-black text-black/10 dark:text-[#22c55e]/10 
                leading-none relative animate-pulse">
                    404
                    <span className="absolute inset-0 text-black dark:text-[#22c55e]">
                        404
                    </span>
                </h1>

                {/* Main heading */}
                <h2 className="text-2xl sm:text-4xl font-bold text-black dark:text-[#22c55e] font-mono -mt-4 sm:-mt-8">
                    Block Not Found
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg text-black/70 dark:text-[#22c55e]/70 font-mono max-w-md mx-auto">
                    Looks like this block doesn't exist in our chain
                </p>
                <div className="pt-4 sm:pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg 
                        bg-black/10 dark:bg-[#22c55e]/10 border border-black/30 dark:border-[#22c55e]/30 
                        text-black dark:text-[#22c55e] hover:bg-black/20 dark:hover:bg-[#22c55e]/20 
                        transition-all duration-200 font-mono group"
                    >
                        <span>Return to Main Chain</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}


