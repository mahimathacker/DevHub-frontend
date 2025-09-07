'use client';

// import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import ThemeSwitch from './Common/ThemeSwitcher';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { isDark, toggleTheme } = useTheme();

    return (
        <nav className="bg-white dark:bg-black px-4 py-4 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo/Brand Text */}
                <div className="flex items-center">
                    <Link href="/" className="text-black dark:text-[#22c55e] text-lg sm:text-xl font-mono hover:opacity-90 transition-colors">
                        BlockchainHQ
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    {/* <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-[#22c55e]/10 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button> */}
                    <ThemeSwitch />

                    {/* Submit Button with Tooltip */}
                    <Link
                        href="https://forms.gle/Eb2jr5S96qWvHzTp6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative bg-black/10 text-black dark:text-[#22c55e] border border-black/30 dark:border-[#22c55e] 
                        rounded-md px-4 py-1 font-mono hover:bg-black/20 dark:hover:bg-[#22c55e]/10 transition-colors group"
                        title="Submit your feedback here"
                    >
                        <span>Submit</span>
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black dark:bg-[#22c55e] 
                        text-white dark:text-black text-sm rounded opacity-0 invisible group-hover:opacity-100 
                        group-hover:visible transition-all duration-200 whitespace-nowrap font-mono text-xs">
                            Submit your feedback here
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex sm:hidden items-center gap-2">
                    <ThemeSwitch />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-[#22c55e]/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-black dark:text-[#22c55e]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-t 
                border-black/10 dark:border-[#22c55e]/10 py-4 px-4 z-50">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="https://forms.gle/Eb2jr5S96qWvHzTp6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/10 text-black dark:text-[#22c55e] border border-black/30 dark:border-[#22c55e] 
                            rounded-md px-4 py-2 font-mono hover:bg-black/20 dark:hover:bg-[#22c55e]/10 transition-colors text-center"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Submit Feedback
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}  
