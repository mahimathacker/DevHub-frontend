'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { resources } from '@/types/resources';
import { slugify } from '@/utils/slugify';

interface ResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    resource: resources;
}

export default function ResourceModal({ isOpen, onClose, resource }: ResourceModalProps) {
    if (!isOpen) return null;

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
                                        src={resource.image_url || '/placeholder.gif'}
                                        alt={resource.title}
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

                                {/* Title and Author Info */}
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-mono text-black dark:text-[#22c55e] font-bold mb-2">
                                        {resource.title}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <div className="flex items-center gap-1.5 text-sm font-mono text-black/70 dark:text-[#22c55e]/70">
                                            <span>by</span>
                                            <span className="text-black dark:text-[#22c55e] font-semibold">
                                                {resource.content_by}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm font-mono text-black/70 dark:text-[#22c55e]/70">
                                            <span className="text-black dark:text-[#22c55e]">
                                                {resource.type_name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* View Resource Button */}
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-4 py-2 rounded-md bg-black/10 dark:bg-[#22c55e]/10 
                                hover:bg-black/20 dark:hover:bg-[#22c55e]/20 text-black dark:text-[#22c55e] 
                                transition-all flex items-center justify-center sm:justify-start gap-1.5 text-sm font-mono"
                            >
                                View Resource
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="px-8 space-y-12">
                        <div className="flex flex-wrap gap-2">
                            {resource.tags?.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full text-sm font-mono bg-black/10 dark:bg-[#22c55e]/10 
                                    text-black dark:text-[#22c55e] border border-black/20 dark:border-[#22c55e]/20">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Price Type */}
                        <div className="relative text-center py-6">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 bg-black/5 dark:bg-[#22c55e]/5 rounded-full blur-2xl"></div>
                            </div>

                            <div className="relative">
                                <h2 className="text-4xl sm:text-5xl font-bold font-mono text-black dark:text-[#22c55e] tracking-tight mb-2">
                                    {resource.price_type}
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
                                        Price Type
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pb-8">
                            <a
                                href={`/resources/${slugify(resource.title)}/${resource.id}`}
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
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 