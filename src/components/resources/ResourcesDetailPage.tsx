'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Breadcrumb from '../Common/Breadcrumb';
import type { resources } from '../../types/resources';
import { getResources, getResourceCategories, getResourceTypes, getResourceLanguages, getResourceDifficultyLevels, getResourcePriceTypes } from '../../lib/resources';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import LoadingAnimation from '../Common/LoadingAnimation';
import FilterTag from '../Common/FilterTag';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import CustomSelect from '../Common/CustomSelect';
import ResourceModal from './ResourceModal';
import Link from 'next/link';
import { slugify } from '@/utils/slugify';
interface InitialData {
    resources: resources[];
    nextCursor: string | null | undefined;
    categories: Array<{ id: number; name: string }>;
    languages: Array<{ id: number; name: string }>;
    resourcesType: Array<{ id: number; name: string }>;
    priceType: Array<{ id: number; name: string }>;
    difficultyLevels: Array<{ id: number; name: string }>;
}

interface ResourcesDetailPageProps {
    initialData: InitialData;
}

export default function ResourcesDetailPage({ initialData }: ResourcesDetailPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedResourcesType, setSelectedResourcesType] = useState<string[]>([]);
    const [selectedPriceType, setSelectedPriceType] = useState<string[]>([]);
    const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('Sort By');
    const [categories, setCategories] = useState(initialData.categories);
    const [languages, setLanguages] = useState(initialData.languages);
    const [resourcesType, setResourcesType] = useState(initialData.resourcesType);
    const [priceType, setPriceType] = useState(initialData.priceType);
    const [difficultyLevels, setDifficultyLevels] = useState(initialData.difficultyLevels);
    const [selectedResource, setSelectedResource] = useState<resources | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const { items: resources, loading, error, loadingRef } = useInfiniteScroll<resources>({
        fetchItems: async (cursor) => {
            try {
                const params = new URLSearchParams(searchParams.toString());
                if (cursor) {
                    params.set('cursor', cursor);
                }
                params.set('limit', '10');

                const response = await getResources(cursor, 10, params.toString());
                return {
                    data: response.data,
                    nextCursor: response.nextCursor || null
                };
            } catch (error) {
                console.error('Error fetching resources:', error);
                throw error;
            }
        },
        limit: 10,
        key: searchParams.toString(),
        initialData: initialData.resources,
        initialCursor: initialData.nextCursor
    });

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const category = searchParams.get('category') || '';
        const language = searchParams.get('language') || '';
        const resourceType = searchParams.get('resource_type') || '';
        const priceType = searchParams.get('price_type') || '';
        const difficultyLevel = searchParams.get('difficulty_level') || '';
        const sortby = searchParams.get('sortby') || 'newest';

        setSearchQuery(keyword);
        setSelectedCategories(category ? category.split(',') : []);
        setSelectedLanguages(language ? language.split(',') : []);
        setSelectedResourcesType(resourceType ? resourceType.split(',') : []);
        setSelectedPriceType(priceType ? priceType.split(',') : []);
        setSelectedDifficultyLevel(difficultyLevel ? difficultyLevel.split(',') : []);
        setSortBy(sortby);
    }, [searchParams]);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [
                    categoriesData,
                    resourcesTypeData,
                    languagesData,
                    difficultyLevelsData,
                    priceTypesData
                ] = await Promise.all([
                    getResourceCategories(),
                    getResourceTypes(),
                    getResourceLanguages(),
                    getResourceDifficultyLevels(),
                    getResourcePriceTypes()
                ]);

                setCategories(categoriesData.data);
                setResourcesType(resourcesTypeData.data);
                setLanguages(languagesData.data);
                setDifficultyLevels(difficultyLevelsData.data);
                setPriceType(priceTypesData.data);

            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilterData();
    }, []);


    const handleCategoryChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newCategories = [...selectedCategories, value];
            setSelectedCategories(newCategories);
            params.set('category', newCategories.join(','));
        } else {
            setSelectedCategories([]);
            params.delete('category');
        }

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    };

    const handleResourceTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newTypes = [...selectedResourcesType, value];
            setSelectedResourcesType(newTypes);
            params.set('resource_type', newTypes.join(','));
        } else {
            setSelectedResourcesType([]);
            params.delete('resource_type');
        }

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    };

    const handleLanguageChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newLanguages = [...selectedLanguages, value];
            setSelectedLanguages(newLanguages);
            params.set('language', newLanguages.join(','));
        } else {
            setSelectedLanguages([]);
            params.delete('language');
        }

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    };

    const handleDifficultyLevelChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newLevels = [...selectedDifficultyLevel, value];
            setSelectedDifficultyLevel(newLevels);
            params.set('difficulty_level', newLevels.join(','));
        } else {
            setSelectedDifficultyLevel([]);
            params.delete('difficulty_level');
        }

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    };

    const handlePriceTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newPriceTypes = [...selectedPriceType, value];
            setSelectedPriceType(newPriceTypes);
            params.set('price_type', newPriceTypes.join(','));
        } else {
            setSelectedPriceType([]);
            params.delete('price_type');
        }

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    };

    const sortOptions = [
        { id: 'newest', name: 'Newest First' },
        { id: 'oldest', name: 'Oldest First' }
    ];

    const handleSortChange = (value: string) => {
        setSortBy(value);

        const params = new URLSearchParams(searchParams);
        if (value !== 'newest') {
            params.set('sortby', value);
        } else {
            params.delete('sortby');
        }

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    };

    const clearAllFilters = () => {
        const params = new URLSearchParams(searchParams);

        setSelectedCategories([]);
        setSelectedLanguages([]);
        setSelectedResourcesType([]);
        setSelectedPriceType([]);
        setSelectedDifficultyLevel([]);
        setSearchQuery('');
        setSortBy('newest');

        params.delete('category');
        params.delete('language');
        params.delete('resource_type');
        params.delete('price_type');
        params.delete('difficulty_level');
        params.delete('keyword');
        params.delete('sortby');

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        setSearchQuery(value);

        if (value) {
            params.set('keyword', value);
        } else {
            params.delete('keyword');
        }

        router.replace(`/resources?${params.toString()}`, { scroll: false });
    }, 300);

    const handleResourceClick = (resource: resources) => {
        setSelectedResource(resource);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />

                <h1 className="text-3xl font-mono text-black dark:text-[#22c55e] font-bold text-center mb-12">
                    Learning Resources
                </h1>

                <div className="max-w-2xl mx-auto space-y-8 mb-12">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={searchQuery}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchQuery(value);
                                    debouncedSearch(value);
                                }}
                                className="w-full bg-transparent border border-black/30 dark:border-[#22c55e]/30 rounded-lg 
                                py-3 px-5 text-black dark:text-[#22c55e] placeholder-black/40 dark:placeholder-[#22c55e]/40 
                                font-mono text-sm focus:outline-none focus:border-black/50 dark:focus:border-[#22c55e]/50 
                                focus:ring-1 focus:ring-black/10 dark:focus:ring-[#22c55e]/20 transition-all"
                            />
                            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-black dark:text-[#22c55e]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="relative sm:w-48">
                            <CustomSelect
                                options={sortOptions}
                                value={sortBy}
                                onChange={handleSortChange}
                                placeholder="Sort By"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="relative">
                            <CustomSelect
                                options={categories}
                                value={selectedCategories[0] || 'all'}
                                onChange={handleCategoryChange}
                                placeholder="Category"
                            />
                        </div>

                        <div className="relative">
                            <CustomSelect
                                options={resourcesType}
                                value={selectedResourcesType[0] || 'all'}
                                onChange={handleResourceTypeChange}
                                placeholder="Type"
                            />
                        </div>

                        <div className="relative">
                            <CustomSelect
                                options={languages}
                                value={selectedLanguages[0] || 'all'}
                                onChange={handleLanguageChange}
                                placeholder="Language"
                            />
                        </div>

                        <div className="relative">
                            <CustomSelect
                                options={difficultyLevels}
                                value={selectedDifficultyLevel[0] || 'all'}
                                onChange={handleDifficultyLevelChange}
                                placeholder="Level"
                            />
                        </div>

                        <div className="relative">
                            <CustomSelect
                                options={priceType}
                                value={selectedPriceType[0] || 'all'}
                                onChange={handlePriceTypeChange}
                                placeholder="Price"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            {selectedCategories.map((categoryId) => (
                                <FilterTag
                                    key={`category-${categoryId}`}
                                    type="category"
                                    value={categoryId}
                                    categories={categories}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedCategories = selectedCategories.filter(id => id !== categoryId);
                                        if (updatedCategories.length > 0) {
                                            params.set('category', updatedCategories.join(','));
                                        } else {
                                            params.delete('category');
                                        }
                                        setSelectedCategories(updatedCategories);
                                        router.replace(`/resources?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {selectedLanguages.map((languageId) => (
                                <FilterTag
                                    key={`language-${languageId}`}
                                    type="language"
                                    value={languageId}
                                    languages={languages}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedLanguages = selectedLanguages.filter(id => id !== languageId);
                                        if (updatedLanguages.length > 0) {
                                            params.set('language', updatedLanguages.join(','));
                                        } else {
                                            params.delete('language');
                                        }
                                        setSelectedLanguages(updatedLanguages);
                                        router.replace(`/resources?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {selectedResourcesType.map((typeId) => (
                                <FilterTag
                                    key={`resource_type-${typeId}`}
                                    type="resourceType"
                                    value={typeId}
                                    resourceTypes={resourcesType}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedTypes = selectedResourcesType.filter(id => id !== typeId);
                                        if (updatedTypes.length > 0) {
                                            params.set('resource_type', updatedTypes.join(','));
                                        } else {
                                            params.delete('resource_type');
                                        }
                                        setSelectedResourcesType(updatedTypes);
                                        router.replace(`/resources?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {selectedDifficultyLevel.map((levelId) => (
                                <FilterTag
                                    key={`difficulty_level-${levelId}`}
                                    type="difficultyLevel"
                                    value={levelId}
                                    difficultyLevels={difficultyLevels}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedLevels = selectedDifficultyLevel.filter(id => id !== levelId);
                                        if (updatedLevels.length > 0) {
                                            params.set('difficulty_level', updatedLevels.join(','));
                                        } else {
                                            params.delete('difficulty_level');
                                        }
                                        setSelectedDifficultyLevel(updatedLevels);
                                        router.replace(`/resources?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {selectedPriceType.map((priceTypeId) => (
                                <FilterTag
                                    key={`price_type-${priceTypeId}`}
                                    type="priceType"
                                    value={priceTypeId}
                                    priceTypes={priceType}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedPriceTypes = selectedPriceType.filter(id => id !== priceTypeId);
                                        if (updatedPriceTypes.length > 0) {
                                            params.set('price_type', updatedPriceTypes.join(','));
                                        } else {
                                            params.delete('price_type');
                                        }
                                        setSelectedPriceType(updatedPriceTypes);
                                        router.replace(`/resources?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {(selectedCategories.length > 0 ||
                                selectedLanguages.length > 0 ||
                                selectedResourcesType.length > 0 ||
                                selectedDifficultyLevel.length > 0 ||
                                selectedPriceType.length > 0 ||
                                searchQuery) && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 
                                        rounded-full text-sm font-mono text-red-500 hover:bg-red-500/20 transition-all whitespace-nowrap"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear All Filters
                                    </button>
                                )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {resources.map((resource, index) => (
                        <div
                            key={`${resource.id}-${index}`}
                            className="border border-black/30 dark:border-[#22c55e]/30 rounded-lg p-4 sm:p-6 
                            hover:border-black/50 dark:hover:border-[#22c55e]/50 transition-all bg-transparent 
                            cursor-pointer hover:bg-black/5 dark:hover:bg-[#22c55e]/5 overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <Link href={`/resources/${slugify(resource.title)}/${resource.id}`}>

                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <div className="relative flex-shrink-0 rounded-full overflow-hidden 
                                    bg-white/50 dark:bg-black/50 border border-black/30 dark:border-[#22c55e]/30
                                    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                                            <Image
                                                src={resource.image_url || '/placeholder.gif'}
                                                alt={resource.title}
                                                fill
                                                sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                                                className="object-cover w-full h-full"
                                                priority={index < 4}
                                                quality={75}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/placeholder.gif';
                                                }}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg sm:text-xl font-mono text-black dark:text-[#22c55e] mb-1 break-words">
                                                {resource.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-mono text-black/70 dark:text-[#22c55e]/70">
                                                    {resource.content_by}
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-sm font-mono bg-black/10 dark:bg-[#22c55e]/10 
                                    text-black dark:text-[#22c55e] border border-black/20 dark:border-[#22c55e]/20">
                                                    {resource.type_name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="shrink-0 flex flex-col sm:items-end gap-2 sm:gap-4">
                                    <button
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-black/10 dark:bg-[#22c55e] 
                                        text-black dark:text-black font-mono rounded-lg hover:bg-black/20 
                                        dark:hover:bg-[#22c55e]/90 transition-all text-sm sm:text-base text-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(resource.url, '_blank');
                                        }}
                                    >
                                        View Resource
                                    </button>

                                    <div className="font-mono text-black dark:text-[#22c55e] text-sm">
                                        {resource.price_type}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div ref={loadingRef} className="py-4 text-center">
                        {loading && (
                            <div className="flex justify-center">
                                <LoadingAnimation />
                            </div>
                        )}
                        {!loading && resources.length === 0 && (
                            <p className="text-black/50 dark:text-[#22c55e]/50 font-mono">
                                No resources found.
                            </p>
                        )}
                    </div>
                </div>

                {selectedResource && (
                    <ResourceModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        resource={selectedResource}
                    />
                )}
            </div>
        </div>
    );
}
