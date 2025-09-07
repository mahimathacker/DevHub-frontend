import { getResourceById } from '@/lib/resources';
import ResourceDetailView from '@/components/resources/ResourceDetailView';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const fetchCache = 'force-cache';
export const revalidate = 3600;

interface Props {
    params: Promise<{
        id: string;
        slug: string;
    }>
}

export default async function ResourcePage({ params }: Props) {
    try {
        const { id, slug } = await params;
        const response = await getResourceById(id);

        if (!response.data || response.data.length === 0) {
            return notFound();
        }

        const resource = response.data[0];

        //Enhanced slug generation
        const correctSlug = resource.title
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

        if (slug !== correctSlug) {
            return notFound();
        }

        return (
            <main className="min-h-screen bg-white dark:bg-black">
                <ResourceDetailView resource={resource} />
            </main>
        );
    } catch (error) {
        return notFound();
    }
}

export async function generateStaticParams() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources?limit=20`);
        const data = await response.json();

        return data.data.map((resource: any) => ({
            id: resource.id.toString(),
            slug: resource.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/\(.*?\)/g, '')
                .replace(/["']/g, '')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '')
                .trim()
        }))
    } catch (error) {
        return [];
    }
}