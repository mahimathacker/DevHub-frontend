'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { Hackathon } from '@/types/hackathon';

// Add this date formatter outside component
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC' // Use UTC to ensure server/client match
    });
};

export default function HackathonDetailView({ hackathon }: { hackathon: Hackathon }) {
    // const [mounted, setMounted] = useState(false);
    const [timeZone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);

    useEffect(() => {
        // setMounted(true);
        scrollToSection();
        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', scrollToSection);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('hashchange', scrollToSection);
            }
        };
    }, []);



    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Hackathons', href: '/hackathons' },
        { label: hackathon.title }
    ];

    const scrollToSection = () => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.replace('#', '');
            const section = document.getElementById(hash);
            if (section) {
                const navHeight = 80; // Height of the sticky navigation
                const offset = section.offsetTop - navHeight;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        }
    };

    // if (!mounted) {
    //     return null;
    // }
    const handleOverviewClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', window.location.pathname);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* URL Display */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                {/* Breadcrumb section */}
                <div className="w-full">
                    <Breadcrumb
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Hackathons', href: '/hackathons' },
                            { label: hackathon.title }
                        ]}
                    />
                </div>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-8 mb-12 gap-4">
                    <div className="flex items-start gap-4 sm:gap-6 w-full">
                        <div className="relative flex-shrink-0 rounded-full overflow-hidden 
                        bg-white/50 dark:bg-black/50 border border-black/30 dark:border-[#22c55e]/30
                        w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                            <Image
                                src={hackathon.thumbnail_url}
                                alt={hackathon.title}
                                fill
                                sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                                className="object-cover w-full h-full"
                                priority
                                quality={75}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder.gif';
                                }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-mono text-black dark:text-[#22c55e] font-bold break-words">
                                {hackathon.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <p className="text-black/70 dark:text-[#22c55e]/70 font-mono">
                                    {hackathon.organizer_name}
                                </p>
                                <p className="text-black/70 dark:text-[#22c55e]/70 font-mono flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="break-words">{hackathon.location}</span>
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {hackathon.category_tags.map((tag, index) => (
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
                    </div>

                    <Link
                        href={hackathon.hackathon_url}
                        target="_blank"
                        className="w-full sm:w-auto px-6 py-2 rounded-lg bg-black/10 dark:bg-[#22c55e]/10 
                        hover:bg-black/20 dark:hover:bg-[#22c55e]/20 text-black dark:text-[#22c55e] 
                        transition-all flex items-center justify-center sm:justify-start gap-2 font-mono"
                    >
                        Visit
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Sticky Navigation Links */}
            <div className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-[#16a34a]/20 dark:border-[#22c55e]/20 z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex space-x-8 overflow-x-auto py-4">
                        <a
                            href="#overview"
                            onClick={handleOverviewClick}
                            className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] 
                            font-mono whitespace-nowrap px-3 py-2 border-b-2 border-transparent 
                            hover:border-black dark:hover:border-[#22c55e] transition-all"
                        >
                            Overview
                        </a>
                        <a
                            href="#schedule"
                            className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] 
                            font-mono whitespace-nowrap px-3 py-2 border-b-2 border-transparent 
                            hover:border-black dark:hover:border-[#22c55e] transition-all"
                        >
                            Schedule
                        </a>
                        <a
                            href="#prizes"
                            className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] 
                            font-mono whitespace-nowrap px-3 py-2 border-b-2 border-transparent 
                            hover:border-black dark:hover:border-[#22c55e] transition-all"
                        >
                            Prizes
                        </a>
                        <a
                            href="#judges"
                            className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] 
                            font-mono whitespace-nowrap px-3 py-2 border-b-2 border-transparent 
                            hover:border-black dark:hover:border-[#22c55e] transition-all"
                        >
                            Judges
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="py-12">
                    <div className="space-y-12">
                        {/* Description Section */}
                        <div>
                            <h2 className="text-2xl font-mono text-black dark:text-[#22c55e] font-bold mb-8">
                                Overview
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-black/70 dark:text-[#22c55e]/70 font-mono leading-relaxed whitespace-pre-wrap">
                                    {hackathon.description}
                                </p>
                            </div>
                        </div>

                        {/* Submission Period */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <h4 className="text-lg sm:text-xl font-mono text-black dark:text-[#22c55e] font-bold">
                                Submission Period
                            </h4>
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black/5 dark:bg-[#22c55e]/5 
                            border border-black/20 dark:border-[#22c55e]/20">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-[#22c55e]"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-sm sm:text-lg font-mono text-black dark:text-[#22c55e]">
                                    {hackathon.submission_periods}
                                </span>
                            </div>
                        </div>

                        {/* Schedule Section */}
                        <div id="schedule" className="space-y-8 mt-20 pt-24">
                            {/* Schedule Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                                <h2 className="text-2xl font-mono text-black dark:text-[#22c55e] font-bold">
                                    Schedule
                                </h2>
                                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                    <span className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm sm:text-base">
                                        Timezone:
                                    </span>
                                    <select
                                        className="flex-1 sm:flex-none bg-transparent border border-black/30 dark:border-[#22c55e]/30 
                                        rounded px-3 py-1.5 text-sm sm:text-base text-black dark:text-[#22c55e] font-mono 
                                        min-w-[200px] sm:min-w-0"
                                    >
                                        <option>{timeZone}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Schedule Content */}
                            <div className="space-y-6">
                                {hackathon.schedule ? (
                                    hackathon.schedule.map((day, index) => (
                                        <div key={index} className="border border-black/20 dark:border-[#22c55e]/20 rounded-lg overflow-hidden">
                                            <div className="bg-black/5 dark:bg-[#22c55e]/5 px-4 sm:px-6 py-3">
                                                <h3 className="text-black dark:text-[#22c55e] font-mono font-bold text-sm sm:text-base">
                                                    {new Date(day.date).toLocaleDateString(undefined, {
                                                        timeZone,
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </h3>
                                            </div>
                                            <div className="divide-y divide-black/10 dark:divide-[#22c55e]/10">
                                                {day.events.map((event, eventIndex) => {
                                                    const localTime = new Date(event.timestamp).toLocaleString(undefined, {
                                                        timeZone: timeZone,
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true,
                                                    });
                                                    const formattedTime = localTime.replace(" am", " AM").replace(" pm", " PM");

                                                    return (
                                                        <div key={eventIndex} className="px-4 sm:px-6 py-4 grid grid-cols-[auto_1fr] sm:grid-cols-[150px_1fr] gap-4 sm:gap-6">
                                                            <span className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm sm:text-base whitespace-nowrap">
                                                                {formattedTime}
                                                            </span>
                                                            <div>
                                                                <h4 className="text-black dark:text-[#22c55e] font-mono text-sm sm:text-base">
                                                                    {event.title}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="border border-black/20 dark:border-[#22c55e]/20 rounded-lg overflow-hidden">
                                        <div className="bg-black/5 dark:bg-[#22c55e]/5 px-6 py-3">
                                            <h3 className="text-black dark:text-[#22c55e] font-mono font-bold">
                                                {hackathon.submission_periods}
                                            </h3>
                                        </div>
                                        <div className="divide-y divide-black/10 dark:divide-[#22c55e]/10">
                                            <div className="px-6 py-4 grid grid-cols-[150px_1fr] gap-6">
                                                <span className="text-black/70 dark:text-[#22c55e]/70 font-mono whitespace-nowrap">
                                                    Start Date
                                                </span>
                                                <div className="text-black dark:text-[#22c55e] font-mono">
                                                    {formatDate(hackathon.start_date)}
                                                </div>
                                            </div>
                                            <div className="px-6 py-4 grid grid-cols-[150px_1fr] gap-6">
                                                <span className="text-black/70 dark:text-[#22c55e]/70 font-mono whitespace-nowrap">
                                                    End Date
                                                </span>
                                                <div className="text-black dark:text-[#22c55e] font-mono">
                                                    {formatDate(hackathon.extended_date || hackathon.end_date)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Prizes Section */}
                        <div id="prizes" className="space-y-8 mt-24 pt-24">
                            <h2 className="text-2xl font-mono text-black dark:text-[#22c55e] font-bold mb-8">Prizes</h2>

                            <div className="relative text-center py-6">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-48 h-48 bg-black/5 dark:bg-[#22c55e]/5 rounded-full blur-2xl"></div>
                                </div>

                                <div className="relative">
                                    <h2 className="text-7xl font-bold font-mono tracking-tight mb-2 
                                    bg-clip-text text-transparent bg-gradient-to-r from-black to-black/80 
                                    dark:from-[#22c55e] dark:to-[#16a34a]">
                                        ${hackathon.total_prize.toLocaleString()}
                                    </h2>
                                    <div className="flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-black/70 dark:text-[#22c55e]/70"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="text-xl font-mono text-black/70 dark:text-[#22c55e]/70 tracking-wide">
                                            Available in prizes
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hackathon.price_list.map((prize, index) => (
                                    <div
                                        key={index}
                                        className="border border-black/20 dark:border-[#22c55e]/20 rounded-lg p-6 
                                        bg-black/5 dark:bg-[#22c55e]/5 hover:bg-black/10 dark:hover:bg-[#22c55e]/10 transition-all"
                                    >
                                        <div className="text-3xl font-bold text-black dark:text-[#22c55e] font-mono mb-2">
                                            ${Math.floor(hackathon.total_prize / hackathon.price_list.length).toLocaleString()}
                                        </div>
                                        <div className="text-black dark:text-[#22c55e] font-mono mb-2">{prize.title}</div>
                                        <div className="text-black/70 dark:text-[#22c55e] font-mono text-sm">
                                            {prize.items.join(', ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Judges Section */}
                        <div id="judges" className="space-y-8 mt-24 pt-24">
                            <h2 className="text-2xl font-mono text-black dark:text-[#22c55e] font-bold mb-8">
                                Judges & Speakers
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hackathon.judges.map((judge, index) => {
                                    // Split title into parts - text and URL
                                    const titleParts = judge.title.split('https://');
                                    const mainTitle = titleParts[0].trim();
                                    const linkedinUrl = titleParts[1] ? `https://${titleParts[1]}` : null;

                                    return (
                                        <div
                                            key={index}
                                            className="border border-black/20 dark:border-[#22c55e]/20 rounded-lg p-6
                                            hover:border-black/50 dark:hover:border-[#22c55e]/50 transition-all bg-black/5 dark:bg-[#22c55e]/5"
                                        >
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-mono text-black dark:text-[#22c55e] font-bold">
                                                    {judge.name}
                                                </h3>
                                                <p className="text-black dark:text-[#22c55e] font-mono">
                                                    {mainTitle}
                                                </p>
                                                {linkedinUrl && (
                                                    <a
                                                        href={linkedinUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block text-black/50 dark:text-[#22c55e]/50 hover:text-black 
                                                        dark:hover:text-[#22c55e] font-mono text-sm break-all"
                                                    >
                                                        {linkedinUrl}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Partners/Categories Section */}
                        {/* <div id="partner" className="space-y-8 mt-24">
                            <h2 className="text-2xl font-mono text-[#16a34a] dark:text-[#22c55e] font-bold mb-8">Categories</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {hackathon.category_tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="border border-[#16a34a]/20 dark:border-[#22c55e]/20 rounded-lg p-4
                                        hover:border-[#16a34a]/50 dark:hover:border-[#22c55e]/50 transition-all bg-[#16a34a]/5 dark:bg-[#22c55e]/5
                                        flex items-center justify-center"
                                    >
                                        <div className="text-[#16a34a] dark:text-[#22c55e] font-mono font-bold">
                                            {tag}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}