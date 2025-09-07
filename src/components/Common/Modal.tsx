'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Hackathon } from '@/types/hackathon';
import { slugify } from '@/utils/slugify';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    hackathon: Hackathon;
}

export default function Modal({ isOpen, onClose, hackathon }: ModalProps) {
    if (!isOpen) return null;

    // Function to truncate description
    const getShortDescription = (desc: string, wordLimit: number = 50) => {
        const words = desc.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return desc;
    };

    return (
        <div className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 overflow-y-auto">
            {/* Center wrapper */}
            <div className="min-h-screen px-4 py-12 flex items-center justify-center">
                {/* Modal Content */}
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-black/20 dark:border-[#22c55e]/20 rounded-xl w-full max-w-2xl 
                relative my-8 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                    {/* Close Button - Top Right Corner */}
                    <button
                        onClick={onClose}
                        className="absolute -top-3 -right-3 w-8 h-8 bg-white/80 dark:bg-black/80 border border-black/20 
                        dark:border-[#22c55e]/20 rounded-full flex items-center justify-center hover:bg-black/10 
                        dark:hover:bg-[#22c55e]/10 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black dark:text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className="relative flex-shrink-0 rounded-full overflow-hidden 
                                bg-white/50 dark:bg-black/50 border border-black/30 dark:border-[#22c55e]/30
                                w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                                    <Image
                                        src={hackathon.thumbnail_url}
                                        alt={hackathon.title}
                                        fill
                                        sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                                        className="object-cover w-full h-full"
                                        priority
                                        quality={75}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/placeholder.gif';
                                        }}
                                    />
                                </div>

                                {/* Title and Location */}
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-mono text-black dark:text-[#22c55e] font-bold mb-2">
                                        {hackathon.title}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <div className="flex items-center gap-1.5 text-sm font-mono text-black/70 dark:text-[#22c55e]/70">
                                            <span>by</span>
                                            <span className="text-black dark:text-[#22c55e] font-semibold">
                                                {hackathon.organizer_name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm font-mono text-black/70 dark:text-[#22c55e]/70">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {hackathon.location}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visit Button */}
                            <a
                                href={hackathon.hackathon_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-4 py-2 rounded-md bg-black/10 dark:bg-[#22c55e]/10 
                                hover:bg-black/20 dark:hover:bg-[#22c55e]/20 text-black dark:text-[#22c55e] 
                                transition-all flex items-center justify-center sm:justify-start gap-1.5 text-sm font-mono"
                            >
                                Visit
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 space-y-12">
                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-2">
                            {hackathon.category_tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full text-sm font-mono bg-black/10 dark:bg-[#22c55e]/10 
                                    text-black dark:text-[#22c55e] border border-black/20 dark:border-[#22c55e]/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Short Description */}
                        <div className="space-y-4">
                            <h4 className="text-xl font-mono text-black dark:text-[#22c55e] font-bold">About</h4>
                            <p className="text-black/70 dark:text-[#22c55e]/70 font-mono leading-relaxed">
                                {getShortDescription(hackathon.description)}
                            </p>
                        </div>

                        {/* Schedule */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <h4 className="text-xl font-mono text-black dark:text-[#22c55e] font-bold">Submission Period</h4>
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black/5 dark:bg-[#22c55e]/5 
                            border border-black/20 dark:border-[#22c55e]/20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black dark:text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-lg font-mono text-black dark:text-[#22c55e]">
                                    {hackathon.submission_periods}
                                </span>
                            </div>
                        </div>

                        {/* Prize Pool */}
                        <div className="relative text-center py-6">
                            {/* Background Decoration */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 bg-black/5 dark:bg-[#22c55e]/5 rounded-full blur-2xl"></div>
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <h2 className="text-5xl sm:text-7xl font-bold font-mono text-black dark:text-[#22c55e] tracking-tight mb-2 
                                bg-clip-text text-transparent bg-gradient-to-r from-black to-black 
                                dark:from-[#22c55e] dark:to-[#16a34a]">
                                    ${hackathon.total_prize.toLocaleString()}
                                </h2>
                                <div className="flex items-center justify-center gap-1 sm:gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 sm:h-5 sm:w-5 text-black/70 dark:text-[#22c55e]/70"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="text-base sm:text-xl font-mono text-black/70 dark:text-[#22c55e]/70 tracking-wide">
                                        Available in prizes
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Read More Button */}
                        <div className="text-center pb-8">
                            <Link
                                href={`/hackathons/${slugify(hackathon.title)}/${hackathon.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1 px-8 py-3 rounded-lg bg-black/10 
                                dark:bg-[#22c55e]/10 hover:bg-black/20 dark:hover:bg-[#22c55e]/20 
                                text-black dark:text-[#22c55e] transition-all font-mono text-lg"
                            >
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
} 