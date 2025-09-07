import { getHackathonById } from '@/lib/hackathons';
import HackathonDetailView from '@/components/hackathons/HackathonDetailView';
import { notFound } from 'next/navigation';

// Add static page generation config
export const dynamic = 'force-static';
export const fetchCache = 'force-cache';
export const revalidate = 3600; // 1 hour

interface Props {
    params: Promise<{
        id: string;
        slug: string;
    }>;
}

export default async function HackathonPage({ params }: Props) {
    try {
        const { id, slug } = await params;
        const response = await getHackathonById(id);

        if (!response.data || response.data.length === 0) {
            return notFound();
        }

        const hackathon = response.data[0];

        // Enhanced slug generation
        const correctSlug = hackathon.title
            .toLowerCase()
            // Replace special characters and spaces with hyphens
            .replace(/[^a-z0-9]+/g, '-')
            // Remove parentheses and their contents
            .replace(/\(.*?\)/g, '')
            // Remove quotes
            .replace(/["']/g, '')
            // Remove any resulting double hyphens
            .replace(/-+/g, '-')
            // Remove leading/trailing hyphens
            .replace(/^-+|-+$/g, '')
            // Trim any whitespace
            .trim();

        // Verify if the slug matches
        if (slug !== correctSlug) {
            return notFound();
        }

        return (
            <main className="min-h-screen bg-white dark:bg-black">
                <HackathonDetailView hackathon={hackathon} />
            </main>
        );
    } catch (error) {
        console.error('Error in HackathonPage:', error);
        return notFound();
    }
}

// Generate static params for common paths
export async function generateStaticParams() {
    try {
        // Get initial hackathons for static generation
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons?limit=20`);
        const data = await response.json();

        return data.data.map((hackathon: any) => ({
            id: hackathon.id.toString(),
            slug: hackathon.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/\(.*?\)/g, '')
                .replace(/["']/g, '')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '')
                .trim()
        }));
    } catch (error) {
        return [];
    }
} 