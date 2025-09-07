import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        console.log('Full URL Received:', url.toString());
        console.log('Search params received:', searchParams.toString());

        const backendUrl = `${process.env.BACKEND_URL}/resources?${searchParams.toString()}`;

        const response = await fetch(backendUrl);
        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching resources:', error);
        return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
    }
}