'use client';

import Link from "next/link";
import type { resources } from "@/types/resources";
import { slugify } from "@/utils/slugify";

interface ResourcesListProps {
    initialResources: resources[];
}

export default function ResourcesList({ initialResources }: ResourcesListProps) {
    return (
        <section id="resources" className="space-y-4">
            <div className="max-w-5xl mx-auto px-4 py-8 bg-white dark:bg-black">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-mono text-black dark:text-[#22c55e] font-bold">
                        Learning Resources
                    </h2>

                    <Link
                        href="/resources"
                        className="px-2 md:px-3 py-1 rounded-md bg-black/5 dark:bg-[#22c55e]/10 border border-black/30 dark:border-[#22c55e] 
                text-black dark:text-[#22c55e] text-xs md:text-sm font-mono hover:bg-black/10 dark:hover:bg-[#22c55e]/20 transition-all"
                    >
                        View All
                    </Link>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-4 gap-4 border-b border-black/30 dark:border-[#22c55e]/30 pb-4 mb-4">
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Title</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Platform</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Type</div>
                    <div className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm">Price</div>
                </div>

                <div className="space-y-4">
                    {initialResources.map((resource, index) => (
                        <Link
                            key={`${resource.id}-${index}`}
                            href={`/resources/${slugify(resource.title)}/${resource.id}`}
                            target="_blank"
                            className="block p-4 rounded-lg border border-black/30 dark:border-[#22c55e]/30 
                    hover:border-black dark:hover:border-[#22c55e] transition-all bg-white/5 dark:bg-black/5 
                    cursor-pointer group"
                        >
                            {/* Mobile View */}
                            <div className="md:hidden space-y-3">
                                <div>
                                    <h3 className="font-mono text-black dark:text-[#22c55e] font-bold">
                                        {resource.title}
                                    </h3>
                                    <p className="font-mono text-black/70 dark:text-[#22c55e]/70 text-sm">
                                        {resource.platform}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 text-xs rounded-full font-mono
                                bg-black/10 dark:bg-[#22c55e]/10 
                                text-black dark:text-[#22c55e]">
                                        {resource.type_name}
                                    </span>
                                </div>
                                <div className="font-mono text-black/50 dark:text-[#22c55e]/50 text-sm">
                                    {resource.price_type}
                                </div>
                            </div>

                            {/* Desktop View */}
                            <div className="hidden md:grid grid-cols-4 gap-4 items-center">
                                <div className="font-mono text-black/70 dark:text-[#22c55e] font-bold">
                                    {resource.title}
                                </div>
                                <div>
                                    <h3 className="font-mono text-black dark:text-[#22c55e]/70">
                                        {resource.platform}
                                    </h3>
                                </div>
                                <div className="font-mono text-black/70 dark:text-[#22c55e] font-bold">
                                    {resource.type_name}
                                </div>
                                <div className="font-mono text-black dark:text-[#22c55e]/70">
                                    {resource.price_type}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {initialResources.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-black/50 dark:text-[#22c55e]/50 font-mono">
                            No resources available at the moment.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}