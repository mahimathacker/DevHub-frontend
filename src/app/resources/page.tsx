import { Metadata } from "next";
import { getResources, getResourceCategories, getResourceTypes, getResourceLanguages, getResourceDifficultyLevels, getResourcePriceTypes } from "@/lib/resources";
import ResourcesDetailPage from "@/components/resources/ResourcesDetailPage";
export const metadata: Metadata = {
    title: 'Resources | DevHub',
    description: 'Find the best resources for your blockchain journey. Browse through resources from leading companies in the blockchain space.',
    keywords: 'blockchain resources, crypto resources, blockchain learning, cryptocurrency resources',
    openGraph: {
        title: 'Resources | DevHub',
        description: 'Find the best resources for your blockchain journey. Browse through resources from leading companies in the blockchain space.',
        url: 'https://devhub.xyz/resources',
        siteName: 'DevHub',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Resources | DevHub',
        description: 'Find the best resources for your blockchain journey. Browse through resources from leading companies in the blockchain space.',
    }
}

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] } | undefined> }) {
    const resolvedParams = await searchParams;
    const params = new URLSearchParams();

    Object.entries(resolvedParams!).forEach(([key, value]) => {
        if (typeof value === 'string') {
            params.set(key, value);
        } else if (Array.isArray(value)) {
            params.set(key, value.join(','));
        }
    });


    try {
        const [resourcesData, categoriesData, resourcesTypeData, languageData, difficultyLevelsData, priceTypesData] = await Promise.all([
            getResources(null, 10, params.toString()),
            getResourceCategories(),
            getResourceTypes(),
            getResourceLanguages(),
            getResourceDifficultyLevels(),
            getResourcePriceTypes()
        ]);

        const initialData = {
            resources: resourcesData.data,
            nextCursor: resourcesData.nextCursor,
            categories: categoriesData.data,
            languages: languageData.data,
            resourcesType: resourcesTypeData.data,
            priceType: priceTypesData.data,
            difficultyLevels: difficultyLevelsData.data,

        }
        return <ResourcesDetailPage initialData={initialData} />

    } catch (error) {
        console.error('Error loading resources page:', error);

        return <ResourcesDetailPage initialData={{
            resources: [],
            nextCursor: null,
            categories: [],
            resourcesType: [],
            languages: [],
            difficultyLevels: [],
            priceType: []
        }} />

    }
}
