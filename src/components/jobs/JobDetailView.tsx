'use client';

import { Job } from '@/types/job';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Breadcrumb from '../Common/Breadcrumb';

interface JobDetailViewProps {
    job: Job;
}

export default function JobDetailView({ job }: JobDetailViewProps) {
    const router = useRouter();

    // Function to format relative time
    const getRelativeTimeString = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, seconds] of Object.entries(intervals)) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval >= 1) {
                return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
            }
        }

        return 'just now';
    };

    // Get formatted date string
    const getPostedDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return getRelativeTimeString(date);
        } catch (error) {
            return 'Invalid date';
        }
    };

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Jobs', href: '/jobs' },
        { label: job.title }
    ];

    // Add this function after the breadcrumb items
    const formatJobDescription = (text: string) => {
        // Remove N/A and unnecessary "Apply Now:" text
        text = text.replace(/\bN\/A\b/g, '').replace(/Apply Now:?\s*$/i, '');

        // Common section headers with their variations
        const sectionMappings = {
            'About': ['About', 'About Us', 'About the Company', 'Why Join Us'],
            'What you\'ll do': ['What you\'ll do', 'Role', 'The Role', 'Position', 'Job Description'],
            'Requirements': ['Requirements', 'What we\'re looking for', 'Qualifications', 'Skills'],
            'Responsibilities': ['Responsibilities', 'Key Responsibilities', 'Your Responsibilities'],
            'Benefits': ['Benefits', 'What we offer', 'Perks'],
            'Location': ['Location', 'Work Location']
        };

        // Create a map to store unique content for each section
        const sectionContent = new Map();

        // Helper function to clean and normalize text
        const cleanText = (text: string) => {
            return text
                .replace(/\s+/g, ' ')
                .replace(/:\s+/g, ': ')
                .trim();
        };

        // Helper function to find the canonical section name
        const getCanonicalSection = (text: string) => {
            for (const [canonical, variations] of Object.entries(sectionMappings)) {
                if (variations.some(v =>
                    text.toLowerCase().includes(v.toLowerCase() + ':') ||
                    text.toLowerCase().includes(v.toLowerCase() + '?')
                )) {
                    return canonical;
                }
            }
            return null;
        };

        // Split text into sections and process
        const sections = text.split(/(?=(?:[A-Z][a-z]+:|\b(?:About|Requirements|Responsibilities|Benefits|Location)\b:?))/);

        sections.forEach(section => {
            const trimmedSection = section.trim();
            if (!trimmedSection) return;

            // Detect section header
            const detectedSection = getCanonicalSection(trimmedSection);
            if (detectedSection) {
                // Remove the header from content and clean it
                const content = cleanText(
                    trimmedSection.replace(
                        new RegExp(`^.*?(${detectedSection}:?\\s*)`, 'i'),
                        ''
                    )
                );

                // Only add non-empty content if it's not already present
                if (content && !sectionContent.has(detectedSection)) {
                    sectionContent.set(detectedSection, content);
                }
            } else {
                // If no section detected, add to About section
                const content = cleanText(trimmedSection);
                if (content) {
                    const existingContent = sectionContent.get('About') || '';
                    if (!existingContent.includes(content)) {
                        sectionContent.set('About', (existingContent ? existingContent + '\n\n' : '') + content);
                    }
                }
            }
        });

        // Format the content for each section
        const formatContent = (content: string, sectionName: string) => {
            // Special handling for Responsibilities section
            if (sectionName === 'Responsibilities') {
                const items = content
                    .split(/(?:\r?\n|\r|-)/g)  // Split by newlines or hyphens
                    .map(item => item.trim())
                    .filter(item => item.length > 0)
                    .map(item => {
                        // Clean up the item
                        return item
                            .replace(/^[•\-]\s*/, '')  // Remove bullet points
                            .replace(/^\d+\.\s*/, '')  // Remove numbering
                            .replace(/^[\s:]+/, '')    // Remove leading colons and spaces
                            .trim();
                    })
                    .filter((item, index, self) =>
                        item &&
                        self.indexOf(item) === index && // Remove duplicates
                        !item.match(/^(requirements|responsibilities|about|benefits):/i) && // Remove section headers
                        item.length > 1  // Ensure item has meaningful content
                    )
                    .map(item => `<li class="mb-3 leading-relaxed">${item}</li>`)
                    .join('');

                return `<ul class="list-disc pl-6 mb-6 space-y-1">${items}</ul>`;
            }

            // Original formatting for other sections
            if (content.includes('•') || content.includes('-') || /^\d+\.\s/.test(content)) {
                const items = content
                    .split(/(?:\r?\n|\r)/)
                    .map(item => item.trim())
                    .filter(item => item.length > 0)
                    .map(item => item.replace(/^[•\-]\s*/, '').trim())
                    .filter((item, index, self) => self.indexOf(item) === index)
                    .map(item => `<li class="mb-2">${item}</li>`)
                    .join('');
                return `<ul class="list-disc pl-6 mb-6 space-y-2">${items}</ul>`;
            }

            return content
                .split(/\n\n+/)
                .map(para => para.trim())
                .filter((para, index, self) =>
                    para.length > 0 && self.indexOf(para) === index
                )
                .map(para => `<p class="mb-4">${para}</p>`)
                .join('');
        };

        // Build the final HTML with only unique content
        let html = '';
        const preferredOrder = ['About', 'What you\'ll do', 'Responsibilities', 'Requirements', 'Benefits', 'Location'];

        preferredOrder.forEach(section => {
            const content = sectionContent.get(section);
            if (content?.trim()) {
                html += `
                    <div class="mb-8">
                        <h3 class="text-lg font-bold mb-4">${section}</h3>
                        ${formatContent(content.trim(), section)}
                    </div>`;
            }
        });

        return html;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Job Header */}
            <div className="bg-white/50 dark:bg-black/50 rounded-xl p-4 sm:p-6 mb-8 border border-black/10 dark:border-[#22c55e]/10">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {/* Logo section */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 mx-auto sm:mx-0">
                        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 rounded-full 
                            border border-black/10 dark:border-[#22c55e]/10">
                            <Image
                                src={job.company_logo || '/placeholder.gif'}
                                alt={`${job.company_name} logo`}
                                fill
                                className="rounded-full object-contain p-2"
                                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                                priority
                            />
                        </div>
                    </div>

                    {/* Title and info section */}
                    <div className="flex-grow text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-[#22c55e] mb-2">
                            {job.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                            <p className="text-sm sm:text-base text-black/70 dark:text-[#22c55e]/70 font-mono">
                                by {job.company_name}
                            </p>
                            <p className="text-sm sm:text-base text-black/70 dark:text-[#22c55e]/70 font-mono flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="break-words">{job.location}</span>
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                            {job.tags && job.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full font-mono
                                        bg-black/10 dark:bg-[#22c55e]/10 
                                        text-black dark:text-[#22c55e]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Apply button */}
                    <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                        <a
                            href={job.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 rounded-lg 
                                bg-black dark:bg-[#22c55e] text-white dark:text-black font-mono text-sm 
                                hover:opacity-90 transition-opacity"
                        >
                            Apply Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                <div className="lg:col-span-2 space-y-4 sm:space-y-8">
                    {/* Description */}
                    <div className="bg-white/50 dark:bg-black/50 rounded-xl p-4 sm:p-6 
                        border border-black/10 dark:border-[#22c55e]/10">
                        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-[#22c55e] mb-4">
                            Job Description
                        </h2>
                        <div
                            className="prose prose-sm sm:prose-base lg:prose-lg dark:text-[#22c55e]/70 
                            dark:prose-invert max-w-none font-mono
                            prose-headings:text-black dark:prose-headings:text-[#22c55e]
                            prose-headings:font-bold prose-headings:mb-4
                            prose-p:text-black/70 dark:prose-p:text-[#22c55e]/70
                            prose-p:mb-4 prose-p:leading-relaxed
                            prose-ul:text-black/70 dark:prose-ul:text-[#22c55e]/70
                            prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6
                            prose-li:mb-2 prose-li:text-black/70 dark:prose-li:text-[#22c55e]/70"
                            dangerouslySetInnerHTML={{
                                __html: formatJobDescription(job.job_summary)
                            }}
                        />
                    </div>

                    {/* Requirements section - if exists */}
                    {job.requirements && (
                        <div className="bg-white/50 dark:bg-black/50 rounded-xl p-4 sm:p-6 
                            border border-black/10 dark:border-[#22c55e]/10">
                            <h2 className="text-lg sm:text-xl font-bold text-black dark:text-[#22c55e] mb-4">
                                Requirements
                            </h2>
                            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none font-mono"
                                dangerouslySetInnerHTML={{ __html: job.requirements }}
                            />
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Job Overview */}
                    <div className="bg-white/50 dark:bg-black/50 rounded-xl p-4 sm:p-6 
                        border border-black/10 dark:border-[#22c55e]/10">
                        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-[#22c55e] mb-4">
                            Job Overview
                        </h2>
                        <dl className="space-y-4 font-mono text-sm sm:text-base">
                            <div className="flex justify-between items-center">
                                <dt className="text-black/50 dark:text-[#22c55e]/50">Job Type</dt>
                                <dd className="text-black dark:text-[#22c55e]">{job.job_type}</dd>
                            </div>

                            <div className="flex justify-between items-center">
                                <dt className="text-black/50 dark:text-[#22c55e]/50">Location</dt>
                                <dd className="text-black dark:text-[#22c55e]">{job.location}</dd>
                            </div>

                            {job.salary_range && (
                                <div className="flex justify-between items-center">
                                    <dt className="text-black/50 dark:text-[#22c55e]/50">Salary Range</dt>
                                    <dd className="text-black dark:text-[#22c55e]">{job.salary_range}</dd>
                                </div>
                            )}

                            <div className="flex justify-between items-center">
                                <dt className="text-black/50 dark:text-[#22c55e]/50">Posted</dt>
                                <dd className="text-black dark:text-[#22c55e]">
                                    {getPostedDate(job.created_at)}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
} 