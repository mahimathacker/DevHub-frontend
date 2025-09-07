import { Metadata } from 'next';
import HackathonDetailPage from '../../components/hackathons/HackathonDetailPage';
import { getHackathons, getLocations, getCategories, getStatuses } from '@/lib/hackathons';

// export const dynamic = 'force-static';
// export const revalidate = 3600; // Cache for 1 hour instead of 0

export const metadata: Metadata = {
    title: 'Hackathons | DevHub',
    description: 'Discover and participate in the latest blockchain hackathons. Filter by category, status, location, and prize pool.',
    keywords: [
        'blockchain hackathons',
        'blockchain hackathons',
        'crypto hackathons',
        'blockchain competitions',
        'developer challenges',
        'blockchain events',
        "devpost hackathons",
        "AI",

    ],
    openGraph: {
        title: 'Hackathons | DevHub',
        description: 'Discover and participate in the latest blockchain hackathons',
        url: 'https://devhub.xyz/hackathons',
        siteName: 'DevHub',
        images: [
            {
                url: 'https://blockchain-hq.s3.ap-south-1.amazonaws.com/hackathon-thumbnails/0003e6cd34.png',
                width: 1200,
                height: 630,
                alt: 'DevHub Hackathons'
            }
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'devhubxyz',
        description: 'Discover and participate in the latest blockchain hackathons',
    }
};

export default async function HackathonsPage({
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

    // Parallel data fetching
    const [hackathonsData, locationsData, categoriesData, statusesData] = await Promise.all([
        getHackathons(null, 10, params.toString()),
        getLocations(),
        getCategories(),
        getStatuses()
    ]);

    const initialData = {
        hackathons: hackathonsData.data,
        nextCursor: hackathonsData.nextCursor,
        locations: locationsData.data,
        categories: categoriesData.data,
        statuses: statusesData.data
    };

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <HackathonDetailPage initialData={initialData} />
        </main>
    );
} 