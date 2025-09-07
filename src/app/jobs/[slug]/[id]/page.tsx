import { getJobById } from '@/lib/jobs';
import JobDetailView from '@/components/jobs/JobDetailView';
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

export default async function JobPage({ params }: Props) {
    try {
        const { id, slug } = await params;
        const response = await getJobById(id);

        if (!response.data || response.data.length === 0) {
            return notFound();
        }

        const job = response.data[0];

        // Enhanced slug generation
        const correctSlug = job.title
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
                <JobDetailView job={job} />
            </main>
        );
    } catch (error) {
        console.error('Error in JobPage:', error);
        return notFound();
    }
}

// Generate static params for common paths
export async function generateStaticParams() {
    try {
        // Get initial jobs for static generation
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs?limit=20`);
        const data = await response.json();

        return data.data.map((job: any) => ({
            id: job.id.toString(),
            slug: job.title
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