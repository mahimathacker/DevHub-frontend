'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Job } from '../../types/job';
import { slugify } from '../../utils/slugify';

interface JobListProps {
    initialJobs: Job[];
}

export default function JobList({ initialJobs }: JobListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set('keyword', query);
        } else {
            params.delete('keyword');
        }
        router.replace(`/jobs?${params.toString()}`);
    };

    return (
        <section id="jobs" className="space-y-4">
            <div className="max-w-5xl mx-auto px-4 py-8 bg-white dark:bg-black">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-mono text-black dark:text-[#22c55e] font-bold">
                        Jobs
                    </h2>

                    <Link
                        href="/jobs"
                        className="px-2 md:px-3 py-1 rounded-md bg-black/5 dark:bg-[#22c55e]/10 border border-black/30 dark:border-[#22c55e] 
                        text-black dark:text-[#22c55e] text-xs md:text-sm font-mono hover:bg-black/10 dark:hover:bg-[#22c55e]/20 transition-all"
                    >
                        View All
                    </Link>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-4 gap-4 border-b border-black/30 dark:border-[#22c55e]/30 pb-4 mb-4">
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Company</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Position</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Location</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Salary Range</div>
                </div>

                <div className="space-y-4">
                    {initialJobs.map((job, index) => (
                        <Link
                            key={`${job.id}-${index}`}
                            href={`/jobs/${slugify(job.title)}/${job.id}`}
                            target="_blank"
                            className="block p-4 rounded-lg border border-black/30 dark:border-[#22c55e]/30 
                            hover:border-black dark:hover:border-[#22c55e] transition-all bg-white/5 dark:bg-black/5 
                            cursor-pointer group"
                        >
                            {/* Mobile View */}
                            <div className="md:hidden space-y-3">
                                <div>
                                    <h3 className="font-mono text-black dark:text-[#22c55e] font-bold">
                                        {job.title}
                                    </h3>
                                    <p className="font-mono text-black/70 dark:text-[#22c55e]/70 text-sm">
                                        {job.company_name}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 text-xs rounded-full font-mono
                                        bg-black/10 dark:bg-[#22c55e]/10 
                                        text-black dark:text-[#22c55e]">
                                        {job.location}
                                    </span>
                                </div>
                                <div className="font-mono text-black/50 dark:text-[#22c55e]/50 text-sm">
                                    {job.salary_range}
                                </div>
                            </div>

                            {/* Desktop View */}
                            <div className="hidden md:grid grid-cols-4 gap-4 items-center">
                                <div className="font-mono text-black/70 dark:text-[#22c55e]/70 group-hover:text-black dark:group-hover:text-[#22c55e]">
                                    {job.company_name}
                                </div>
                                <div>
                                    <h3 className="font-mono text-black dark:text-[#22c55e] font-bold">
                                        {job.title}
                                    </h3>
                                </div>
                                <div className="font-mono text-black/70 dark:text-[#22c55e]/70">
                                    {job.location}
                                </div>
                                <div className="font-mono text-black dark:text-[#22c55e]">
                                    {job.salary_range}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {initialJobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-black/50 dark:text-[#22c55e]/50 font-mono">
                            No jobs available at the moment.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}