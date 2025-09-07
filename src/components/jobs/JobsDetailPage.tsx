'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Breadcrumb from '../Common/Breadcrumb';
import type { Job } from '../../types/job';
import { getJobs, getJobCategories, getJobTypes, getCategoryTypes, getJobLocations } from '../../lib/jobs';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import LoadingAnimation from '../Common/LoadingAnimation';
import FilterTag from '../Common/FilterTag';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import CustomSelect from '../Common/CustomSelect';
import PriceRangeSlider from '../Common/PriceRangeSlider';
import JobModal from './JobModal';

interface InitialData {
    jobs: Job[];
    nextCursor: string | null;
    categories: Array<{ id: number; name: string }>;
    jobTypes: Array<{ id: number; name: string }>;
    categoryTypes: Array<{ id: number; name: string }>;
    locations: Array<{ id: number; name: string }>;
}

interface JobsDetailPageProps {
    initialData: InitialData;
}

export default function JobsDetailPage({ initialData }: JobsDetailPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedCategoryTypes, setSelectedCategoryTypes] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('Sort By');
    const [categories, setCategories] = useState(initialData.categories);
    const [jobTypes, setJobTypes] = useState(initialData.jobTypes);
    const [locations, setLocations] = useState(initialData.locations);
    const [categoryTypes, setCategoryTypes] = useState(initialData.categoryTypes);
    const [isSalaryFilterOpen, setIsSalaryFilterOpen] = useState(false);
    const [minSalary, setMinSalary] = useState(0);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const router = useRouter();
    const searchParams = useSearchParams();

    const { items: jobs, loading, error, loadingRef } = useInfiniteScroll<Job>({
        fetchItems: async (cursor) => {
            try {
                const params = new URLSearchParams(searchParams.toString());
                if (cursor) {
                    params.set('cursor', cursor);
                }
                params.set('limit', '10');

                const response = await getJobs(cursor, 10, params.toString());
                return {
                    data: response.data,
                    nextCursor: response.nextCursor || null
                };
            } catch (error) {
                console.error('Error fetching jobs:', error);
                throw error;
            }
        },
        limit: 10,
        key: searchParams.toString(),
        initialData: initialData.jobs,
        initialCursor: initialData.nextCursor
    });

    useEffect(() => {
        console.log('SearchParams changed:', searchParams.toString());
    }, [searchParams]);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Jobs' }
    ];

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const category = searchParams.get('category') || '';
        const jobType = searchParams.get('job_type') || '';
        const location = searchParams.get('location') || '';
        const categoryType = searchParams.get('category_type') || '';
        const salary = searchParams.get('salary') || '';
        const sortby = searchParams.get('sortby') || 'newest';

        setSearchQuery(keyword);
        setSelectedCategories(category ? category.split(',') : []);
        setSelectedJobTypes(jobType ? jobType.split(',') : []);
        setSelectedLocations(location ? location.split(',') : []);
        setSelectedCategoryTypes(categoryType ? categoryType.split(',') : []);
        setMinSalary(salary ? Number(salary) : 0);
        setSortBy(sortby);
    }, [searchParams]);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [categoriesData, jobTypesData, locationsData, categoryTypesData] = await Promise.all([
                    getJobCategories(),
                    getJobTypes(),
                    getJobLocations(),
                    getCategoryTypes()
                ]);
                setCategories(categoriesData.data);
                setJobTypes(jobTypesData.data);
                setLocations(locationsData.data);
                setCategoryTypes(categoryTypesData.data);

            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilterData();
    }, []);

    const filteredJobs = jobs.filter((job, index, self) =>
        index === self.findIndex((j) => j.id === job.id)
    );

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

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    };

    const handleJobTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newJobTypes = [...selectedJobTypes, value];
            setSelectedJobTypes(newJobTypes);
            params.set('job_type', newJobTypes.join(','));
        } else {
            setSelectedJobTypes([]);
            params.delete('job_type');
        }

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    };

    const handleLocationChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newLocations = [...selectedLocations, value];
            setSelectedLocations(newLocations);
            params.set('location', newLocations.join(','));
        } else {
            setSelectedLocations([]);
            params.delete('location');
        }

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    };

    const handleCategoryTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newCategoryTypes = [...selectedCategoryTypes, value];
            setSelectedCategoryTypes(newCategoryTypes);
            params.set('category_type', newCategoryTypes.join(','));
        } else {
            setSelectedCategoryTypes([]);
            params.delete('category_type');
        }

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    };

    const handleSalaryChange = useDebouncedCallback((salary: number) => {
        setMinSalary(salary);
        const params = new URLSearchParams(searchParams);

        if (salary > 0) {
            params.set('salary', salary.toString());
        } else {
            params.delete('salary');
        }

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    }, 100);

    const sortOptions = [
        { id: 'newest', name: 'Newest First' },
        { id: 'oldest', name: 'Oldest First' },
        { id: 'salary_high', name: 'Salary: High to Low' },
        { id: 'salary_low', name: 'Salary: Low to High' }
    ];

    const handleSortChange = (value: string) => {
        setSortBy(value);

        const params = new URLSearchParams(searchParams);
        if (value !== 'newest') {
            params.set('sortby', value);
        } else {
            params.delete('sortby');
        }

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    };

    const clearAllFilters = () => {
        const params = new URLSearchParams(searchParams);

        setSelectedCategories([]);
        setSelectedJobTypes([]);
        setSelectedLocations([]);
        setSelectedCategoryTypes([]);
        setMinSalary(0);
        setSearchQuery('');
        setIsSalaryFilterOpen(false);

        params.delete('category');
        params.delete('job_type');
        params.delete('location');
        params.delete('category_type');
        params.delete('salary');
        params.delete('keyword');

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        setSearchQuery(value);

        if (value) {
            params.set('keyword', value);
        } else {
            params.delete('keyword');
        }

        router.replace(`/jobs?${params.toString()}`, { scroll: false });
    }, 300);

    const handleJobClick = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl font-mono text-black dark:text-[#22c55e] font-bold text-center mb-12">
                    Jobs
                </h1>

                <div className="max-w-2xl mx-auto space-y-8 mb-12">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search jobs..."
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
                                options={jobTypes}
                                value={selectedJobTypes[0] || 'all'}
                                onChange={handleJobTypeChange}
                                placeholder="Mode"
                            />
                        </div>

                        <div className="relative">
                            <CustomSelect
                                options={locations}
                                value={selectedLocations[0] || 'all'}
                                onChange={handleLocationChange}
                                placeholder="Location"
                            />
                        </div>

                        <div className="relative">
                            <CustomSelect
                                options={categoryTypes}
                                value={selectedCategoryTypes[0] || 'all'}
                                onChange={handleCategoryTypeChange}
                                placeholder="Track"
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsSalaryFilterOpen(!isSalaryFilterOpen);
                                }}
                                className="w-full bg-transparent border border-black/30 dark:border-[#22c55e]/30 
                                rounded-lg px-5 py-3 text-black dark:text-[#22c55e] font-mono text-sm focus:outline-none 
                                focus:border-black/50 dark:focus:border-[#22c55e]/50 focus:ring-1 
                                focus:ring-black/10 dark:focus:ring-[#22c55e]/20 transition-all flex items-center justify-between"
                            >
                                <span>{minSalary === 0 ? 'Salary' : `$${minSalary.toLocaleString()}`}</span>
                                <svg className={`h-4 w-4 transition-transform ${isSalaryFilterOpen ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <PriceRangeSlider
                                minPrice={0}
                                maxPrice={500000}
                                onPriceChange={handleSalaryChange}
                                isOpen={isSalaryFilterOpen}
                                onClose={() => setIsSalaryFilterOpen(false)}
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
                                        router.replace(`/jobs?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {selectedJobTypes.map((jobTypeId) => (
                                <FilterTag
                                    key={`job_type-${jobTypeId}`}
                                    type="jobType"
                                    value={jobTypeId}
                                    jobTypes={jobTypes}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedJobTypes = selectedJobTypes.filter(id => id !== jobTypeId);
                                        if (updatedJobTypes.length > 0) {
                                            params.set('job_type', updatedJobTypes.join(','));
                                        } else {
                                            params.delete('job_type');
                                        }
                                        setSelectedJobTypes(updatedJobTypes);
                                        router.replace(`/jobs?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {selectedLocations.map((locationId) => (
                                <FilterTag
                                    key={`location-${locationId}`}
                                    type="location"
                                    value={locationId}
                                    locations={locations}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedLocations = selectedLocations.filter(id => id !== locationId);
                                        if (updatedLocations.length > 0) {
                                            params.set('location', updatedLocations.join(','));
                                        } else {
                                            params.delete('location');
                                        }
                                        setSelectedLocations(updatedLocations);
                                        router.replace(`/jobs?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {selectedCategoryTypes.map((typeId) => (
                                <FilterTag
                                    key={`category_type-${typeId}`}
                                    type="categoryType"
                                    value={typeId}
                                    categoryTypes={categoryTypes}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedTypes = selectedCategoryTypes.filter(id => id !== typeId);
                                        if (updatedTypes.length > 0) {
                                            params.set('category_type', updatedTypes.join(','));
                                        } else {
                                            params.delete('category_type');
                                        }
                                        setSelectedCategoryTypes(updatedTypes);
                                        router.replace(`/jobs?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            ))}
                            {minSalary > 0 && (
                                <FilterTag
                                    type="salary"
                                    value={minSalary.toString()}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        params.delete('salary');
                                        setMinSalary(0);
                                        setIsSalaryFilterOpen(false);
                                        router.replace(`/jobs?${params.toString()}`, { scroll: false });
                                    }}
                                />
                            )}
                            {(selectedCategories.length > 0 ||
                                selectedJobTypes.length > 0 ||
                                selectedLocations.length > 0 ||
                                selectedCategoryTypes.length > 0 ||
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
                    {filteredJobs.map((job, index) => (
                        <div
                            key={`${job.id}-${index}`}
                            onClick={() => handleJobClick(job)}
                            className="border border-black/30 dark:border-[#22c55e]/30 rounded-lg p-4 sm:p-6 
                            hover:border-black/50 dark:hover:border-[#22c55e]/50 transition-all bg-transparent 
                            cursor-pointer hover:bg-black/5 dark:hover:bg-[#22c55e]/5 overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <div className="relative flex-shrink-0 rounded-full overflow-hidden 
                                    bg-white/50 dark:bg-black/50 border border-black/30 dark:border-[#22c55e]/30
                                    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                                        <Image
                                            src={job.company_logo || '/placeholder.gif'}
                                            alt={job.company_name}
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
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-mono text-black/70 dark:text-[#22c55e]/70">
                                                {job.company_name}
                                            </span>
                                            <span className="text-sm font-mono text-black/70 dark:text-[#22c55e]/70 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {job.location}
                                            </span>
                                            {job.category && (
                                                <div className="relative group">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono
                                                        bg-black/10 dark:bg-[#22c55e]/10 text-black/70 dark:text-[#22c55e]/70 
                                                        border border-black/20 dark:border-[#22c55e]/20 cursor-help">
                                                        {job.category}
                                                    </span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 
                                                        bg-black/90 dark:bg-[#22c55e]/90 text-white dark:text-black text-xs font-mono 
                                                        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none 
                                                        whitespace-nowrap z-10">
                                                        Category Type
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex flex-col sm:items-end gap-2 sm:gap-4">
                                    <button
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-black/10 dark:bg-[#22c55e] 
                                        text-black dark:text-black font-mono rounded-lg hover:bg-black/20 
                                        dark:hover:bg-[#22c55e]/90 transition-all text-sm sm:text-base text-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(job.apply_url, '_blank');
                                        }}
                                    >
                                        Apply
                                    </button>

                                    <div className="font-mono text-black dark:text-[#22c55e] text-sm">
                                        {job.salary_range}
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
                        {!loading && jobs.length === 0 && (
                            <p className="text-black/50 dark:text-[#22c55e]/50 font-mono">
                                No jobs found.
                            </p>
                        )}
                    </div>
                </div>

                {selectedJob && (
                    <JobModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        job={selectedJob}
                    />
                )}
            </div>
        </div>
    );
}
