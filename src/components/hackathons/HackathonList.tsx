'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Hackathon } from '../../types/hackathon';
import { slugify } from '../../utils/slugify';

interface HackathonListProps {
    initialHackathons: Hackathon[];
}

export default function HackathonList({ initialHackathons }: HackathonListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set('keyword', query);
        } else {
            params.delete('keyword');
        }
        router.replace(`/?${params.toString()}`);
    };

    return (
        <section id="hackathons" className="space-y-4">
            <div className="max-w-5xl mx-auto px-4 py-8 bg-white dark:bg-black">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-mono text-black dark:text-[#22c55e] font-bold">
                        Hackathons
                    </h2>

                    <Link
                        href="/hackathons"
                        className="px-2 md:px-3 py-1 rounded-md bg-black/5 dark:bg-[#22c55e]/10 border border-black/30 dark:border-[#22c55e] 
                        text-black dark:text-[#22c55e] text-xs md:text-sm font-mono hover:bg-black/10 dark:hover:bg-[#22c55e]/20 transition-all"
                    >
                        View All
                    </Link>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-4 gap-4 border-b border-black/30 dark:border-[#22c55e]/30 pb-4 mb-4">
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Title</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Organised by</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Prize Pool</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Start Date</div>
                </div>

                <div className="space-y-4">
                    {initialHackathons.map((hackathon, index) => (
                        <Link
                            key={`${hackathon.id}-${index}`}
                            href={`/hackathons/${slugify(hackathon.title)}/${hackathon.id}`}
                            target="_blank"
                            className="block p-4 rounded-lg border border-black/30 dark:border-[#22c55e]/30 
                            hover:border-black dark:hover:border-[#22c55e] transition-all bg-white/5 dark:bg-black/5 cursor-pointer"
                        >
                            {/* Mobile View */}
                            <div className="md:hidden space-y-2">
                                <div className="font-mono text-black dark:text-[#22c55e] font-bold">
                                    {hackathon.title}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="font-mono text-black/70 dark:text-[#22c55e]/70 text-sm">
                                        {hackathon.organizer_name}
                                    </div>
                                    <div className="font-mono text-black dark:text-[#22c55e] text-sm">
                                        ${hackathon.total_prize.toLocaleString()}
                                    </div>
                                </div>
                                <div className="font-mono text-black/70 dark:text-[#22c55e]/70 text-sm">
                                    {new Date(hackathon.start_date).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Desktop View */}
                            <div className="hidden md:grid grid-cols-4 gap-4">
                                <div className="font-mono text-black dark:text-[#22c55e]">
                                    {hackathon.title}
                                </div>
                                <div className="font-mono text-black/70 dark:text-[#22c55e]/70">
                                    {hackathon.organizer_name}
                                </div>
                                <div className="font-mono text-black dark:text-[#22c55e]">
                                    ${hackathon.total_prize.toLocaleString()}
                                </div>
                                <div className="font-mono text-black/70 dark:text-[#22c55e]/70">
                                    {new Date(hackathon.start_date).toLocaleDateString()}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {initialHackathons.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-black/50 dark:text-[#22c55e]/50 font-mono">
                            No hackathons available at the moment.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
} 