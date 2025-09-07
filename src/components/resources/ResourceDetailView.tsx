'use client';
import { resources } from '@/types/resources';
import Breadcrumb from '../Common/Breadcrumb';
import Image from 'next/image';
import { CalendarIcon, TagIcon, GlobeAltIcon, UserIcon, AcademicCapIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface ResourcesDetailViewProps {
    resource: resources;
}

export default function ResourceDetailView({ resource }: ResourcesDetailViewProps) {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Resources', href: '/resources' },
        { label: resource.title }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold font-mono text-black dark:text-[#22c55e] mb-4">{resource.title}</h1>

                    <div className="prose max-w-none mb-8 font-mono text-black/70 dark:text-[#22c55e]/70">
                        <p className="text-lg">{resource.description}</p>
                    </div>

                    {resource.additional_info && (
                        <div className="rounded-lg border border-black/20 dark:border-[#22c55e]/20 bg-white/10 dark:bg-[#22c55e]/5 p-6 mb-8">
                            <h2 className="text-xl font-semibold font-mono text-black dark:text-[#22c55e] mb-4">Additional Information</h2>
                            <p className="text-black/70 dark:text-[#22c55e]/70 font-mono">{resource.additional_info}</p>
                        </div>
                    )}

                    <div className="rounded-lg border border-black/20 dark:border-[#22c55e]/20 bg-white/10 dark:bg-[#22c55e]/5 p-6">
                        <h2 className="text-xl font-semibold font-mono text-black dark:text-[#22c55e] mb-4">Resource Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 font-mono text-black/70 dark:text-[#22c55e]/70">
                                <GlobeAltIcon className="h-5 w-5" />
                                <span>Platform: <span className="text-black dark:text-[#22c55e] font-semibold">{resource.platform}</span></span>
                            </div>
                            <div className="flex items-center space-x-2 font-mono text-black/70 dark:text-[#22c55e]/70">
                                <UserIcon className="h-5 w-5" />
                                <span>Content By: <span className="text-black dark:text-[#22c55e] font-semibold">{resource.content_by}</span></span>
                            </div>
                            <div className="flex items-center space-x-2 font-mono text-black/70 dark:text-[#22c55e]/70">
                                <AcademicCapIcon className="h-5 w-5" />
                                <span>Difficulty: <span className="text-black dark:text-[#22c55e] font-semibold">{resource.difficulty_level}</span></span>
                            </div>
                            <div className="flex items-center space-x-2 font-mono text-black/70 dark:text-[#22c55e]/70">
                                <CurrencyDollarIcon className="h-5 w-5" />
                                <span>Price Type: <span className="text-black dark:text-[#22c55e] font-semibold">{resource.price_type}</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-black/20 dark:border-[#22c55e]/20 bg-white/40 dark:bg-black/40 shadow-sm p-6 mb-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="relative flex-shrink-0 rounded-full overflow-hidden bg-white/50 dark:bg-black/50 border border-black/30 dark:border-[#22c55e]/30 w-16 h-16">
                                <Image
                                    src={resource.image_url}
                                    alt={resource.title}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-md bg-black/10 dark:bg-[#22c55e]/10 hover:bg-black/20 dark:hover:bg-[#22c55e]/20 text-black dark:text-[#22c55e] transition-all flex items-center gap-1.5 text-sm font-mono"
                            >
                                Visit Resource
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                        {/* Language and Type Name as badges */}
                        <div className="mb-3 ml-1 flex gap-2 items-center">
                            <span className="px-3 py-1 rounded-full text-sm font-mono border border-black/20 dark:border-[#22c55e]/20 text-black dark:text-[#22c55e] bg-transparent dark:bg-transparent">
                                {resource.language}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm font-mono border border-black/20 dark:border-[#22c55e]/20 text-black dark:text-[#22c55e] bg-transparent dark:bg-transparent">
                                {resource.type_name}
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 font-mono text-black/70 dark:text-[#22c55e]/70">
                                <CalendarIcon className="h-5 w-5" />
                                <span>
                                    Updated: {new Date(resource.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 font-mono text-black/70 dark:text-[#22c55e]/70">
                                <TagIcon className="h-5 w-5" />
                                <div className="flex flex-wrap gap-2">
                                    {resource.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-black/10 dark:bg-[#22c55e]/10 text-black dark:text-[#22c55e] border border-black/20 dark:border-[#22c55e]/20 px-3 py-1 rounded-full text-sm font-mono"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}