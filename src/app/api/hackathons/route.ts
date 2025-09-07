import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        console.log('Full URL received:', url.toString());
        console.log('Search params received:', searchParams.toString());

        // Forward the exact same query string to backend
        const backendUrl = `${process.env.BACKEND_URL}/hackathons?${searchParams.toString()}`;
        console.log('Calling backend URL:', backendUrl);

        const response = await fetch(backendUrl);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching hackathons:', error.message);
        return NextResponse.json({ error: 'Failed to fetch hackathons' }, { status: 500 });
    }
}
