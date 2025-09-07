'use client';

import Link from 'next/link';

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base font-mono mb-4 sm:mb-6">
            {items.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2 sm:gap-3">
                    {index > 0 && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5 text-black/60 dark:text-[#22c55e]/60 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    )}

                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] 
                            transition-colors inline-flex items-center gap-1 sm:gap-2"
                        >
                            {item.label === 'Home' && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            )}
                            <span>{item.label}</span>
                        </Link>
                    ) : (
                        <span className="text-black dark:text-[#22c55e]">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
} 