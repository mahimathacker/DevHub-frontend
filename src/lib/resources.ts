import type { resources, resourcesResponse } from "@/types/resources";

interface ResourceData {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

export async function getResources(
    cursor: string | null = null,
    limit: number,
    queryString: string
): Promise<resourcesResponse> {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiPath = '/api/resources';
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
        throw new Error('Failed to fetch resources');
    }

    const data = await response.json();
    return {
        data: data.data,
        nextCursor: data.nextCursor,
        hasMore: data.hasMore,
    };
}

export async function getLatestResources(keyword?: string): Promise<resourcesResponse> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/latest`);
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
        throw new Error('Failed to fetch latest resources');
    }

    return response.json();
}

export async function getResourceById(id: string): Promise<resourcesResponse> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${id}`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch resource by id');
    }

    return response.json();
}


export async function getResourceCategories(): Promise<{ data: ResourceData[] }> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/categories`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch resource categories');
    }

    return response.json();
}

export async function getResourceTypes(): Promise<{ data: ResourceData[] }> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/types`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch resource types');
    }

    return response.json();
}

export async function getResourceDifficultyLevels(): Promise<{ data: ResourceData[] }> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/difficulty-levels`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch resource difficulty levels');
    }

    return response.json();
}

export async function getResourceLanguages(): Promise<{ data: ResourceData[] }> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/languages`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch resource languages');
    }

    return response.json();
}

export async function getResourcePriceTypes(): Promise<{ data: ResourceData[] }> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/price`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch resource prices');
    }

    return response.json();
}

export async function getAllResources() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/sitemap`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch all resources');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching all resources:', error);
        return { data: [] };
    }
}
