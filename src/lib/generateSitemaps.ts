import { create } from "xmlbuilder2";
import fs from "fs-extra";
import path from "path";
import os from "os";
import moment from "moment";
import { getHackathons, getHackathonById, getCategories, getActiveHackathons, getLocations, getStatuses, getAllHackathons } from "./hackathons";
import { parseString } from 'xml2js';
import { promisify } from 'util';
import type { Hackathon } from '../types/hackathon';
import { getJobs, getJobCategories, getJobTypes, getJobLocations, getCategoryTypes, getAllJobs } from "./jobs";
import type { Job } from '../types/job';
import type { resources } from "@/types/resources";
import { getAllResources, getResourceDifficultyLevels, getResourceCategories, getResourceLanguages, getResourcePriceTypes, getResourceTypes } from "./resources";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://devhub.xyz";
const MAX_URLS_PER_SITEMAP = 1000;
const SITEMAPS_DIR = 'public';

const parseXml = promisify(parseString);

interface SitemapUrl {
    loc: string[];
}


// Add a helper function for title formatting
function formatSEOTitle(title: string): string {
    return encodeURIComponent(title.replace(/\s+/g, '+'));
}

async function generateSitemapXml(urls: any[], filename: string) {
    const root = create({ version: '1.0' })
        .ele('urlset', {
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
            'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1'
        });

    urls.forEach(({ url, lastmod, priority, thumbnail_url, title }) => {
        let urlElement = root.ele('url');
        if (url) {
            urlElement.ele('loc').txt(`${BASE_URL}${url}`);
        }
        if (lastmod) {
            urlElement.ele('lastmod').txt(moment(lastmod).utc().format('YYYY-MM-DD'));
        }
        urlElement.ele('priority').txt(priority || '0.5');

        if (thumbnail_url) {
            const imageElement = urlElement.ele('image:image');
            imageElement.ele('image:loc').txt(thumbnail_url);
            if (title) {
                imageElement.ele('image:title').txt(title);
            }
        }
    });

    const xml = root.end({ prettyPrint: true });
    const filePath = path.join(SITEMAPS_DIR, filename);

    await fs.outputFile(filePath, xml);
    console.log(`Sitemap generated: ${filePath}`);
}

async function generateMainSitemapXml(sitemaps: string[], filePath: string) {
    const root = create({ version: "1.0", encoding: "UTF-8" })
        .ele("sitemapindex", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" });

    sitemaps.forEach((filename) => {
        root.ele("sitemap").ele("loc").txt(`${BASE_URL}/${filename}`);
    });

    const xml = root.end({ prettyPrint: true });

    await fs.outputFile(filePath, xml);
    console.log(`Main sitemap generated: ${filePath}`);

    return xml;
}

async function fetchHackathonsInParallel(cursor: string | null, batchSize = 5) {
    const promises = [];
    for (let i = 0; i < batchSize; i++) {
        promises.push(getHackathons(cursor, 50, ''));
    }
    return Promise.all(promises);
}

async function fetchAllHackathonsWithCache(): Promise<Hackathon[]> {
    const cacheFile = path.join(process.cwd(), 'public/sitemap-cache.json');

    try {
        // Check cache
        if (fs.existsSync(cacheFile)) {
            const stats = fs.statSync(cacheFile);
            const cacheAge = Date.now() - stats.mtimeMs;
            const CACHE_EXPIRATION_HOURS = parseInt(process.env.SITEMAP_CACHE_HOURS || "24", 10) * 60 * 60 * 1000;

            if (cacheAge < CACHE_EXPIRATION_HOURS) {
                console.log('📖 Using cached hackathons data...');
                return fs.readJson(cacheFile) as Promise<Hackathon[]>;
            }
        }

        console.log('Fetching all hackathons data...');
        const response = await getAllHackathons();
        const allHackathons: Hackathon[] = response.data;

        // Save to cache
        await fs.writeJson(cacheFile, allHackathons);
        console.log(`Cached ${allHackathons.length} hackathons`);

        return allHackathons;
    } catch (error) {
        console.error('Cache error:', error);
        throw error;
    }
}

async function fetchAllJobsWithCache(): Promise<Job[]> {
    const cacheFile = path.join(process.cwd(), 'public/jobs-sitemap-cache.json');

    try {
        if (fs.existsSync(cacheFile)) {
            const stats = fs.statSync(cacheFile);
            const cacheAge = Date.now() - stats.mtimeMs;
            const CACHE_EXPIRATION_HOURS = parseInt(process.env.SITEMAP_CACHE_HOURS || "24", 10) * 60 * 60 * 1000;

            if (cacheAge < CACHE_EXPIRATION_HOURS) {
                console.log('Using cached jobs data...');
                return fs.readJson(cacheFile) as Promise<Job[]>;
            }
        }

        console.log('Fetching all jobs data...');
        const response = await getAllJobs();
        const allJobs: Job[] = response.data;

        await fs.writeJson(cacheFile, allJobs);
        console.log(`Cached ${allJobs.length} jobs`);

        return allJobs;
    } catch (error) {
        console.error('Jobs cache error:', error);
        throw error;
    }
}

async function fetchAllResourcesWithCache(): Promise<resources[]> {
    const cacheFile = path.join(process.cwd(), 'public/resources-sitemap-cache.json');
    try {
        if (fs.existsSync(cacheFile)) {
            const stats = fs.statSync(cacheFile);
            const cacheAge = Date.now() - stats.mtimeMs;
            const CACHE_EXPIRATION_HOURS = parseInt(process.env.SITEMAP_CACHE_HOURS || "24", 10) * 60 * 60 * 1000;

            if (cacheAge < CACHE_EXPIRATION_HOURS) {
                console.log('Using cached resources data...');
                return fs.readJson(cacheFile) as Promise<resources[]>;
            }
        }

        console.log('Fetching all resources data...');
        const response = await getAllResources();
        const allResources: resources[] = response.data;

        await fs.writeJson(cacheFile, allResources);
        console.log(`Cached ${allResources.length} resources`);

        return allResources;
    } catch (error) {
        console.error('Resources cache error:', error);
        throw error;
    }

}

async function fetchAllUrls() {
    const staticPages = [
        { url: '/', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
        { url: '/hackathons', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
        { url: '/about', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
        { url: '/contact', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
        { url: '/terms-of-use', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
        { url: '/privacy-policy', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
        { url: '/jobs', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
        { url: '/resources', priority: '1.0', lastmod: moment().utc().format('YYYY-MM-DD') },
    ];

    try {
        // Fetch both hackathons and jobs data
        const [allHackathons, allJobs, allResources] = await Promise.all([
            fetchAllHackathonsWithCache(),
            fetchAllJobsWithCache(),
            fetchAllResourcesWithCache()
        ]);

        console.log(`Total hackathons: ${allHackathons.length}`);
        console.log(`Total jobs: ${allJobs.length}`);
        console.log(`Total resources: ${allResources.length}`);
        const urlSet = new Set<string>();
        const hackathonPages = allHackathons.map(({ id, title, updated_at, thumbnail_url }: Hackathon) => {
            const formattedUrl = `/hackathons/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${id}`;
            if (urlSet.has(formattedUrl)) return null;
            urlSet.add(formattedUrl);

            return {
                url: formattedUrl,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.9',
                thumbnail_url,
                title: formatSEOTitle(title),
            };
        }).filter(Boolean);

        const [
            activeHackathonsResponse,
            categoriesResponse,
            locationsResponse,
            statusesResponse
        ] = await Promise.all([
            getActiveHackathons(),
            getCategories(),
            getLocations(),
            getStatuses()
        ]);

        const activeHackathons = (activeHackathonsResponse?.data || []).map(({ id, title, updated_at, thumbnail_url }) => ({
            url: `/hackathons/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${id}`,
            lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
            priority: '1.0',
            thumbnail_url: thumbnail_url,
            title: formatSEOTitle(title)
        }));

        const hackathonDetailPages = allHackathons.flatMap(({ id, title, updated_at }) => {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return ["#overview", "#schedule", "#judges", "#prizes"].map(section => ({
                url: `/hackathons/${slug}/${id}${section}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.8'
            }));
        });

        const categories = (categoriesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/hackathons?category=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.8",
                title: formatSEOTitle(name)
            },
            {
                url: `/hackathons?category=${name.toLowerCase().replace(/\s+/g, "-")}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.8",
                title: formatSEOTitle(name)
            }
        ]);

        // Process locations with formatted names
        const locations = (locationsResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/hackathons?location=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.7",
                title: formatSEOTitle(name)
            },
            {
                url: `/hackathons?location=${name.toLowerCase().replace(/\s+/g, "-")}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.7",
                title: formatSEOTitle(name)
            }
        ]);

        // Process statuses with formatted names
        const statuses = (statusesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/hackathons?status=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.7",
                title: formatSEOTitle(name)
            },
            {
                url: `/hackathons?status=${name.toLowerCase().replace(/\s+/g, "-")}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.7",
                title: formatSEOTitle(name)
            }
        ]);

        const sortingUrls = [
            { url: `/hackathons?sortby=newest`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
            { url: `/hackathons?sortby=oldest`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
            { url: `/hackathons?sortby=prize_high`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
            { url: `/hackathons?sortby=prize_low`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
        ];

        // Process jobs URLs
        const jobPages = allJobs.map(({ id, title, updated_at, company_logo }: Job) => {
            const formattedUrl = `/jobs/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${id}`;
            if (urlSet.has(formattedUrl)) return null;
            urlSet.add(formattedUrl);

            return {
                url: formattedUrl,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.9',
                thumbnail_url: company_logo,
                title: formatSEOTitle(title),
            };
        }).filter(Boolean);

        // Fetch job-related filter data
        const [
            jobCategoriesResponse,
            jobTypesResponse,
            jobLocationsResponse,
            categoryTypesResponse
        ] = await Promise.all([
            getJobCategories(),
            getJobTypes(),
            getJobLocations(),
            getCategoryTypes()
        ]);

        // Process job categories
        const jobCategories = (jobCategoriesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/jobs?category=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.8",
                title: formatSEOTitle(name)
            }
        ]);

        // Process job types
        const jobTypes = (jobTypesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/jobs?job_type=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.8",
                title: formatSEOTitle(name)
            }
        ]);

        // Process job locations
        const jobLocations = (jobLocationsResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/jobs?location=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.7",
                title: formatSEOTitle(name)
            }
        ]);

        // Process category types
        const jobCategoryTypes = (categoryTypesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/jobs?category_type=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: "0.7",
                title: formatSEOTitle(name)
            }
        ]);

        // Add job sorting URLs
        const jobSortingUrls = [
            { url: `/jobs?sortby=newest`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
            { url: `/jobs?sortby=oldest`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
            { url: `/jobs?sortby=salary_high`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
            { url: `/jobs?sortby=salary_low`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
        ];




        const resourcePages = allResources.map(({ id, title, updated_at, image_url }: resources) => {
            const formattedUrl = `/resources/${title.toLowerCase().replace(/[^a-z0-9]+/, '-')}/${id}`;
            if (urlSet.has(formattedUrl)) return null;
            urlSet.add(formattedUrl);

            return {
                url: formattedUrl,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.9',
                image_url: image_url,
                title: formatSEOTitle(title),
            };
        }).filter(Boolean);

        const [
            resourceCategoriesResponse,
            resourceDifficultyLevelsResponse,
            resourceLanguagesResponse,
            resourcePriceTypesResponse,
            resourceTypesResponse
        ] = await Promise.all([
            getResourceCategories(),
            getResourceDifficultyLevels(),
            getResourceLanguages(),
            getResourcePriceTypes(),
            getResourceTypes()
        ])

        const resourceCategories = (resourceCategoriesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/resources?category=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.8',
                title: formatSEOTitle(name),
            },
        ])

        const resourceDifficultyLevels = (resourceDifficultyLevelsResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/resources?difficulty=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.8',
                title: formatSEOTitle(name),
            },
        ])

        const resourceLanguages = (resourceLanguagesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/resources?language=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.8',
                title: formatSEOTitle(name),
            },
        ])

        const resourcePriceTypes = (resourcePriceTypesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/resources?price_type=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.8',
                title: formatSEOTitle(name),
            },
        ])

        const resourceTypes = (resourceTypesResponse?.data || []).flatMap(({ id, name, updated_at }) => [
            {
                url: `/resources?type=${id}`,
                lastmod: moment(updated_at).utc().format('YYYY-MM-DD'),
                priority: '0.8',
                title: formatSEOTitle(name),
            },
        ])

        const resourceSortingUrls = [
            { url: `/resources?sortby=newest`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },
            { url: `/resources?sortby=oldest`, lastmod: moment().utc().format('YYYY-MM-DD'), priority: "0.8" },

        ]
        return {
            staticPages,
            hackathonPages,
            hackathonDetailPages,
            categories,
            locations,
            statuses,
            activeHackathons,
            sortingUrls,
            jobPages,
            jobCategories,
            jobTypes,
            jobLocations,
            jobCategoryTypes,
            jobSortingUrls,
            resourcePages,
            resourceCategories,
            resourceDifficultyLevels,
            resourceLanguages,
            resourcePriceTypes,
            resourceTypes,
            resourceSortingUrls
        };
    } catch (error) {
        console.error('Error fetching sitemap data:', error);
        return {
            staticPages,
            hackathonPages: [],
            hackathonDetailPages: [],
            categories: [],
            locations: [],
            statuses: [],
            activeHackathons: [],
            sortingUrls: [],
            jobPages: [],
            jobCategories: [],
            jobTypes: [],
            jobLocations: [],
            jobCategoryTypes: [],
            jobSortingUrls: [],
            resourcePages: [],
            resourceCategories: [],
            resourceDifficultyLevels: [],
            resourceLanguages: [],
            resourcePriceTypes: [],
            resourceTypes: [],
        };
    }
}

export default async function generateSitemapss() {
    try {
        await fs.ensureDir(SITEMAPS_DIR);

        const {
            staticPages,
            hackathonPages,
            hackathonDetailPages,
            categories,
            locations,
            statuses,
            activeHackathons,
            sortingUrls,
            jobPages,
            jobCategories,
            jobTypes,
            jobLocations,
            jobCategoryTypes,
            jobSortingUrls,
            resourcePages,
            resourceCategories,
            resourceDifficultyLevels,
            resourceLanguages,
            resourcePriceTypes,
            resourceTypes,
            resourceSortingUrls
        } = await fetchAllUrls();

        // Helper function to batch URLs
        function batchUrls(urls: any[]): any[][] {
            const batches: any[][] = [];
            for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
                batches.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
            }
            return batches;
        }

        const allSitemaps: string[] = [];

        // Process each type of URLs
        const urlTypes = {
            "sitemap-static": staticPages,
            "sitemap-hackathons": hackathonPages,
            "sitemap-hackathon-sections": hackathonDetailPages,
            "sitemap-hackathons-categories": categories,
            "sitemap-hackathons-locations": locations,
            "sitemap-hackathons-statuses": statuses,
            "sitemap-active-hackathons": activeHackathons,
            "sitemap-hackathons-sorting": sortingUrls,
            "sitemap-jobs": jobPages,
            "sitemap-jobs-categories": jobCategories,
            "sitemap-jobs-types": jobTypes,
            "sitemap-jobs-locations": jobLocations,
            "sitemap-jobs-category-types": jobCategoryTypes,
            "sitemap-jobs-sorting": jobSortingUrls,
            "sitemap-resources": resourcePages,
            "sitemap-resources-categories": resourceCategories,
            "sitemap-resources-difficulty-levels": resourceDifficultyLevels,
            "sitemap-resources-languages": resourceLanguages,
            "sitemap-resources-price-types": resourcePriceTypes,
            "sitemap-resources-types": resourceTypes,
            "sitemap-resources-sorting": resourceSortingUrls,
        };

        // Generate sitemaps for each type
        for (const [baseFilename, urls] of Object.entries(urlTypes)) {
            if (!urls || urls.length === 0) continue;

            const batches = batchUrls(urls);

            // Always use index numbers, even for single batches
            for (let i = 0; i < batches.length; i++) {
                const filename = `${baseFilename}-${i + 1}.xml`;
                await generateSitemapXml(batches[i], filename);
                allSitemaps.push(filename);
            }
        }

        const mainSitemapPath = path.join(SITEMAPS_DIR, "sitemap.xml");
        const mainSitemapXml = await generateMainSitemapXml(allSitemaps, mainSitemapPath);

        return {
            mainSitemapXml,
            allSitemaps
        };
    } catch (error) {
        console.error('Error generating sitemaps:', error);
        throw error;
    }
}

