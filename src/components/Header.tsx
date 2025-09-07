'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { Trophy, Book, Briefcase } from 'lucide-react';
interface HeaderProps {
    onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [displayText, setDisplayText] = useState('Hackathon');
    // Longer debounce time to ensure user has stopped typing
    const debouncedSearch = useDebouncedCallback((value: string) => {
        onSearch(value.trim());
    }, 200); // Wait 200ms of no typing before searching

    useEffect(() => {
        const keyword = searchParams.get('keyword');
        setSearchQuery(keyword || '');
    }, [searchParams]);

    const words = ['Hackathon', 'Job', 'Resource'];
    const currentIndex = useRef(0);
    const isDeleting = useRef(false);
    const text = useRef('');

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            const currentWord = words[currentIndex.current];
            if (isDeleting.current) {
                text.current = currentWord.substring(0, text.current.length - 1);
            } else {
                text.current = currentWord.substring(0, text.current.length + 1);
            }

            setDisplayText(text.current);

            let typeSpeed = isDeleting.current ? 100 : 200;

            if (!isDeleting.current && text.current === currentWord) {
                typeSpeed = 2000;
                isDeleting.current = true;
            } else if (isDeleting.current && text.current === '') {
                isDeleting.current = false;
                currentIndex.current = (currentIndex.current + 1) % words.length;
            }

            timeoutId = setTimeout(type, typeSpeed);
        };

        timeoutId = setTimeout(type, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery.trim());
    };

    // const handleAllClick = () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // };

    // const handleHackathonsClick = () => {
    //     const hackathonsSection = document.querySelector('#hackathons');
    //     if (hackathonsSection) {
    //         hackathonsSection.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

    // const handleJobsClick = () => {
    //     const jobsSection = document.querySelector('#jobs');
    //     if (jobsSection) {
    //         jobsSection.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

    return (
        <div className="max-w-3xl mx-auto text-center pt-16 pb-8 bg-white dark:bg-black">
            {/* Title with gradient and animation */}
            <div className="mb-16">
                <h1 className="text-black dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#22c55e] dark:to-emerald-400 font-mono text-3xl font-bold animate-fade-in">
                    Everything that developers need,
                </h1>
                <h1 className="text-black dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:to-[#22c55e] font-mono text-3xl font-bold mt-1">
                    all at one place!
                </h1>
            </div>

            <form onSubmit={handleSearch} className="relative flex items-center max-w-2xl mx-auto mb-8 group px-4 md:px-0">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        // Only schedule the search, won't execute until user stops typing for 800ms
                        debouncedSearch(value);
                    }}
                    placeholder="Ask AI what your builder brain is looking for?"
                    className="w-full bg-white/5 dark:bg-black/5 border border-black/30 dark:border-[#22c55e]/30 rounded-lg 
                    py-2.5 md:py-3 px-3 md:px-4 pr-12 md:pr-24 text-sm md:text-base
                    text-black dark:text-[#22c55e] placeholder-black/40 dark:placeholder-[#22c55e]/40 focus:outline-none 
                    focus:border-black/50 dark:focus:border-[#22c55e] focus:ring-1 focus:ring-black/10 dark:focus:ring-[#22c55e]/10 
                    font-mono transition-all hover:border-black/50 dark:hover:border-[#22c55e]/50"
                />

                {/* Hackathon Tag - Hidden on mobile */}
                {/* <div className="absolute right-16 hidden md:block border border-black/30 dark:border-[#22c55e]/30 rounded-md px-3 py-1 
                text-sm text-black dark:text-[#22c55e] font-mono hover:border-black/50 dark:hover:border-[#22c55e]/50">
                    Hackathon
                </div> */}
                <div className="absolute right-16 hidden md:block">
                    <div className="relative border border-black/30 dark:border-[#22c55e]/30 rounded-md px-3 py-1 
                                    text-sm font-mono hover:border-black/50 dark:hover:border-[#22c55e]/50">
                        <span className="text-black dark:text-[#22c55e]">
                            {displayText}
                            <span className="animate-blink">|</span>
                        </span>
                    </div>
                </div>

                {/* Search Icon Button with glow effect */}
                <button type="submit" className="absolute right-5 md:right-2 p-2 text-black dark:text-[#22c55e] border border-black/30 dark:border-[#22c55e]/30 
                rounded-md bg-transparent hover:border-black/50 dark:hover:border-[#22c55e]/50 hover:bg-black/5 dark:hover:bg-[#22c55e]/5 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 font-mono text-sm">
                <Link
                    href="/hackathons"
                    className="px-4 py-1.5 rounded-md border border-black/30 dark:border-[#22c55e]/30 
                    text-black dark:text-[#22c55e] hover:border-black/50 dark:hover:border-[#22c55e]/50 
                    hover:bg-black/5 dark:hover:bg-[#22c55e]/5 transition-all"
                >
                    <Trophy className="inline-block w-4 h-4 mr-1 text-yellow-500 dark:text-yellow-400" />
                    Hackathons
                </Link>
                <Link
                    href="/jobs"
                    className="px-4 py-1.5 rounded-md border border-black/30 dark:border-[#22c55e]/30 
                    text-black/80 dark:text-[#22c55e]/80 hover:border-black/50 dark:hover:border-[#22c55e]/50 
                    hover:text-black dark:hover:text-[#22c55e] hover:bg-black/5 dark:hover:bg-[#22c55e]/5 transition-all"
                >
                    <Briefcase className="inline-block w-4 h-4 mr-1 text-blue-500 dark:text-blue-400" />
                    Jobs
                </Link>
                <Link
                    href="/resources"
                    className="px-4 py-1.5 rounded-md border border-black/30 dark:border-[#22c55e]/30 
                    text-black/80 dark:text-[#22c55e]/80 hover:border-black/50 dark:hover:border-[#22c55e]/50 
                    hover:text-black dark:hover:text-[#22c55e] hover:bg-black/5 dark:hover:bg-[#22c55e]/5 transition-all"
                >
                    <Book className="inline-block w-4 h-4 mr-1 text-purple-500 dark:text-purple-400" />
                    Resources
                </Link>

                {[...Array(2)].map((_, i) => (
                    <button key={i} className="px-4 py-1.5 rounded-md border border-black/30 dark:border-[#22c55e]/30 
                    text-black/50 dark:text-[#22c55e]/50 hover:border-black/50 dark:hover:border-[#22c55e]/50 hover:text-black/80 dark:hover:text-[#22c55e]/80 transition-all">
                        Coming Soon
                    </button>
                ))}
            </div>
        </div>
    )
}





