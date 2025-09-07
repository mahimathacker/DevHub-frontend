import type { HackathonResponse, Hackathon } from '../types/hackathon';

export async function getHackathons(
    cursor: string | null = null,
    limit: number,
    queryString: string
): Promise<{ data: Hackathon[]; nextCursor: string | null; hasMore: boolean }> {
    // Use NEXT_PUBLIC_BASE_URL for the full URL

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiPath = '/api/hackathons';
    const url = queryString
        ? `${baseURL}${apiPath}?${queryString}`
        : `${baseURL}${apiPath}`;


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hackathons');
    }

    const data = await response.json();
    return {
        data: data.data,
        nextCursor: data.nextCursor,
        hasMore: data.hasMore,
    };
}

export async function getActiveHackathons(keyword?: string): Promise<HackathonResponse> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons/active`);
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
        throw new Error('Failed to fetch active hackathons');
    }

    return response.json();
}

export async function getHackathonById(id: string): Promise<HackathonResponse> {
    // Use backend URL directly instead of going through our API
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${baseURL}/hackathons/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: 3600,
            tags: [`hackathon-${id}`]
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hackathon');
    }

    return response.json();
}

// Add these interfaces
interface Location {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

interface Status {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

// Add these functions to fetch metadata
export async function getLocations(): Promise<{ data: Location[] }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons/getlocation`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error('Location fetch error:', response.status, response.statusText);
        throw new Error('Failed to fetch locations');
    }

    return response.json();
}

export async function getCategories(): Promise<{ data: Category[] }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons/getcategory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error('Category fetch error:', response.status, response.statusText);
        throw new Error('Failed to fetch categories');
    }

    return response.json();
}

export async function getStatuses(): Promise<{ data: Status[] }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons/getstatus`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error('Status fetch error:', response.status, response.statusText);
        throw new Error('Failed to fetch statuses');
    }

    return response.json();
}

export async function getAllHackathons() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons/sitemap`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        if (!response.ok) {
            throw new Error('Failed to fetch all hackathons');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching all hackathons:', error);
        return { data: [] };
    }
}