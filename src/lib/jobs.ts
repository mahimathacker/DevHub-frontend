import type { JobResponse, Job } from '../types/job';

export async function getJobs(
    cursor: string | null = null,
    limit: number,
    queryString: string
): Promise<{ data: Job[]; nextCursor: string | null; hasMore: boolean }> {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiPath = '/api/jobs';
    const url = queryString
        ? `${baseURL}${apiPath}?${queryString}`
        : `${baseURL}${apiPath}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log("Frontend fetching jobs from:", url);  // Debugging line


    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();
    return {
        data: data.data,
        nextCursor: data.nextCursor,
        hasMore: data.hasMore,
    };
}

export async function getLatestJobs(keyword?: string): Promise<JobResponse> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/latest`);
    if (keyword) {
        url.searchParams.set('keyword', keyword);
    }

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch latest jobs');
    }

    return response.json();
}

export async function getJobById(id: string): Promise<JobResponse> {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${baseURL}/jobs/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: 3600,
            tags: [`job-${id}`]
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch job');
    }

    return response.json();
}

// Add these interfaces for metadata
interface JobCategory {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

interface JobType {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

interface CompanySize {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

// Add metadata fetch functions
export async function getJobCategories(): Promise<{ data: JobCategory[] }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/getjobcategories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Job categories fetch error:', response.status, response.statusText);
        throw new Error('Failed to fetch job categories');
    }

    return response.json();
}

export async function getJobTypes(): Promise<{ data: JobType[] }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/job-types`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Job types fetch error:', response.status, response.statusText);
        throw new Error('Failed to fetch job types');
    }

    return response.json();
}

export async function getAllJobs() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/sitemap`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch all jobs');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        return { data: [] };
    }
}

// Add these interfaces
interface CategoryType {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

interface JobLocation {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

// Add these functions
export async function getCategoryTypes(): Promise<{ data: CategoryType[] }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/category-types`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Category types fetch error:', response.status, response.statusText);
        throw new Error('Failed to fetch category types');
    }

    return response.json();
}

export async function getJobLocations(): Promise<{ data: JobLocation[] }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/getjoblocations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Job locations fetch error:', response.status, response.statusText);
        throw new Error('Failed to fetch job locations');
    }

    return response.json();
}
