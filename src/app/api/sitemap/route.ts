// app/api/sitemap/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import generateSitemapss from '@/lib/generateSitemaps';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await generateSitemapss();
        revalidatePath('/');
        revalidatePath('/hackathons');

        // Read the generated sitemap
        // const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
        // const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');

        // Return the XML content
        // return new NextResponse(sitemapContent, {
        //     headers: {
        //         'Content-Type': 'application/xml',
        //         'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
        //     }
        // });
        return NextResponse.json({ message: 'Sitemap generated and revalidated' }, { status: 200 });

    } catch (error) {
        console.error('Error serving sitemap:', error);
        return NextResponse.json(
            { error: 'Failed to generate sitemap' },
            { status: 500 }
        );
    }
}