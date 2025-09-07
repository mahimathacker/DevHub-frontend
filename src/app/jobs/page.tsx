import { Metadata } from 'next';
import JobsDetailPage from '@/components/jobs/JobsDetailPage';
import { getJobs, getJobTypes, getJobCategories, getCategoryTypes, getJobLocations } from '@/lib/jobs';

export const metadata: Metadata = {
    title: 'Jobs | DevHub',
    description: 'Find the best blockchain jobs. Browse through opportunities from leading companies in the blockchain space.',
    keywords: 'blockchain jobs, crypto jobs, blockchain careers, cryptocurrency jobs',
    openGraph: {
        title: 'Jobs | DevHub',
        description: 'Find the best blockchain jobs. Browse through opportunities from leading companies in the blockchain space.',
        url: 'https://devhub.xyz/jobs',
        siteName: 'DevHub',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jobs | DevHub',
        description: 'Find the best blockchain jobs. Browse through opportunities from leading companies in the blockchain space.',
    }
};

export default async function JobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const params = new URLSearchParams();

    // Handle resolved params
    Object.entries(resolvedParams).forEach(([key, value]) => {
        if (typeof value === 'string') {
            params.set(key, value);
        } else if (Array.isArray(value)) {
            params.set(key, value.join(','));
        }
    });

    try {
        const [jobsData, categoriesData, jobTypesData, categoryTypesData, locationsData] = await Promise.all([
            getJobs(null, 10, params.toString()),
            getJobCategories(),
            getJobTypes(),
            getCategoryTypes(),
            getJobLocations()
        ]);

        const initialData = {
            jobs: jobsData.data,
            nextCursor: jobsData.nextCursor,
            categories: categoriesData.data,
            jobTypes: jobTypesData.data,
            categoryTypes: categoryTypesData.data,
            locations: locationsData.data
        };

        return <JobsDetailPage initialData={initialData} />;
    } catch (error) {
        console.error('Error loading jobs page:', error);

        return <JobsDetailPage initialData={{
            jobs: [],
            nextCursor: null,
            categories: [],
            jobTypes: [],
            categoryTypes: [],
            locations: []
        }} />;
    }
}

// Generate dynamic metadata based on search params (optional)
// export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string } }) {
//     const { keyword, category, jobType } = searchParams;

//     let title = 'Jobs | DevHub';
//     let description = 'Find the best blockchain jobs.';

//     if (keyword) {
//         title = `${keyword} Jobs | DevHub`;
//         description = `Find ${keyword} jobs in blockchain space.`;
//     }

//     if (category) {
//         title = `${category} Jobs | DevHub`;
//         description = `Browse ${category} jobs in the blockchain industry.`;
//     }

//     if (jobType) {
//         title = `${jobType} Blockchain Jobs | DevHub`;
//         description = `Find ${jobType} opportunities in blockchain companies.`;
//     }

//     return {
//         title,
//         description,
//         openGraph: {
//             title,
//             description,
//             url: `https://devhub.xyz/jobs?${new URLSearchParams(searchParams).toString()}`,
//         },
//         twitter: {
//             title,
//             description,
//         }
//     };
// }

// Add loading state


// Add error state

