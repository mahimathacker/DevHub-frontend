'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Header from './Header';
import HackathonList from './hackathons/HackathonList';
import JobList from './jobs/JobList';
import ResourcesList from './resources/ResourcesList';
import type { Hackathon } from '@/types/hackathon';
import type { Job } from '@/types/job';
import type { resources } from '@/types/resources';

interface LandingPageProps {
    initialHackathons: Hackathon[];
    initialJobs: Job[];
    initialResources: resources[];

}

export default function LandingPage({ initialHackathons, initialJobs, initialResources }: LandingPageProps) {
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
        <>
            <Header onSearch={handleSearch} />
            <HackathonList initialHackathons={initialHackathons} />
            <JobList initialJobs={initialJobs} />
            <ResourcesList initialResources={initialResources} />
        </>
    );
}