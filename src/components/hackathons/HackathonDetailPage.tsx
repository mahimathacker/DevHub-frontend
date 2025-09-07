'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Breadcrumb from '../Common/Breadcrumb';
import Modal from '../Common/Modal';
import type { Hackathon } from '../../types/hackathon';
import { getHackathons, getLocations, getCategories, getStatuses } from '../../lib/hackathons';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import LoadingAnimation from '../Common/LoadingAnimation';
import PriceRangeSlider from '../Common/PriceRangeSlider';
import FilterTag from '../Common/FilterTag';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import DateRangePicker from '../Common/DateRangePicker';
import CustomSelect from '../Common/CustomSelect';

interface InitialData {
    hackathons: Hackathon[];
    nextCursor: string | null;
    locations: Array<{ id: number; name: string }>;
    categories: Array<{ id: number; name: string }>;
    statuses: Array<{ id: number; name: string }>;
}

interface HackathonDetailPageProps {
    initialData: InitialData;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export default function HackathonDetailPage({ initialData }: HackathonDetailPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('Sort By');
    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [locations, setLocations] = useState(initialData.locations);
    const [categories, setCategories] = useState(initialData.categories);
    const [statuses, setStatuses] = useState(initialData.statuses);
    const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    console.log(selectedCategories);
    const router = useRouter();
    const searchParams = useSearchParams();

    const { items: hackathons, loading, error, loadingRef } = useInfiniteScroll<Hackathon>({
        fetchItems: async (cursor) => {
            try {
                const params = new URLSearchParams(searchParams.toString());
                if (cursor) {
                    params.set('cursor', cursor);
                }
                params.set('limit', '10');

                const response = await getHackathons(cursor, 10, params.toString());
                return {
                    data: response.data,
                    nextCursor: response.nextCursor || null
                };
            } catch (error) {
                console.error('Error fetching hackathons:', error);
                throw error;
            }
        },
        limit: 10,
        key: searchParams.toString(),
        initialData: initialData.hackathons,
        initialCursor: initialData.nextCursor
    });

    useEffect(() => {
        console.log('SearchParams changed:', searchParams.toString());
    }, [searchParams]);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Hackathons' }
    ];

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const category = searchParams.get('category') || '';
        const status = searchParams.get('status') || '';
        const location = searchParams.get('location') || '';
        const date = searchParams.get('date') || '';
        const price = searchParams.get('price') || '';
        const sortby = searchParams.get('sortby') || 'newest';

        setSearchQuery(keyword);
        setSelectedCategories(category ? category.split(',') : []);
        setSelectedStatuses(status ? status.split(',') : []);
        setSelectedLocations(location ? location.split(',') : []);
        setSelectedDates(date ? date.split(',') : []);
        setMinPrice(price ? Number(price) : 0);
        setSortBy(sortby);
    }, [searchParams]);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [locationsData, categoriesData, statusesData] = await Promise.all([
                    getLocations(),
                    getCategories(),
                    getStatuses()
                ]);
                setLocations(locationsData.data);
                setCategories(categoriesData.data);
                setStatuses(statusesData.data);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilterData();
    }, []);

    const handleHackathonClick = (hackathon: Hackathon) => {
        setSelectedHackathon(hackathon);
        setIsModalOpen(true);
    };

    const filteredHackathons = hackathons.filter((hackathon, index, self) =>
        index === self.findIndex((h) => h.id === hackathon.id)
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

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    };

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== 'all') {
            const newStatuses = [...selectedStatuses, value];
            setSelectedStatuses(newStatuses);
            params.set('status', newStatuses.join(','));
        } else {
            setSelectedStatuses([]);
            params.delete('status');
        }

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
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

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    };

    const handleDateChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value === 'custom') {
            setIsCustomDateOpen(true);
            return;
        }

        setIsCustomDateOpen(false);

        if (value !== 'all') {
            const updatedDates = [...selectedDates, value];
            setSelectedDates(updatedDates);
            params.set('date', updatedDates.join(','));
        } else {
            setSelectedDates([]);
            params.delete('date');
        }

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    };

    const handleStartDateChange = (date: string) => {
        setStartDate(date);
        const params = new URLSearchParams(searchParams);
        params.set('startDate', date);
        if (endDate) {
            params.set('endDate', endDate);
        }
        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    };

    const handleEndDateChange = (date: string) => {
        setEndDate(date);
        const params = new URLSearchParams(searchParams);
        if (startDate) {
            params.set('startDate', startDate);
        }
        params.set('endDate', date);
        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    };

    const handlePriceChange = useDebouncedCallback((price: number) => {
        setMinPrice(price);
        const params = new URLSearchParams(searchParams);

        if (price > 0) {
            params.set('price', price.toString());
        } else {
            params.delete('price');
        }

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    }, 100);

    const clearAllFilters = () => {
        const params = new URLSearchParams(searchParams);

        setSelectedCategories([]);
        setSelectedStatuses([]);
        setSelectedLocations([]);
        setSelectedDates([]);
        setMinPrice(0);
        setSearchQuery('');
        setIsPriceFilterOpen(false);

        params.delete('category');
        params.delete('status');
        params.delete('location');
        params.delete('date');
        params.delete('price');
        params.delete('keyword');

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    };
    const sortOptions = [
        { id: 'newest', name: 'Newest First' },
        { id: 'oldest', name: 'Oldest First' },
        { id: 'prize_high', name: 'Prize: High to Low' },
        { id: 'prize_low', name: 'Prize: Low to High' }
    ];

    const handleSortChange = (value: string) => {
        setSortBy(value);

        const params = new URLSearchParams(searchParams);
        if (value !== 'newest') {
            params.set('sortby', value);
        } else {
            params.delete('sortby');
        }

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('keyword', value);
        } else {
            params.delete('keyword');
        }

        router.replace(`/hackathons?${params.toString()}`, { scroll: false });
    }, 100);

    return (
        <div className="min-h-screen bg-white dark:bg-black px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl font-mono text-black dark:text-[#22c55e] font-bold text-center mb-12">
                    Hackathons
                </h1>

                <div className="max-w-2xl mx-auto space-y-8 mb-12">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search hackathons..."
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
                            {/* <select
                                value={sortBy}
                                onChange={handleSortChange}
                                className="w-full appearance-none bg-transparent border border-black/30 dark:border-[#22c55e]/30 
                                rounded-lg px-5 py-3 text-black dark:text-[#22c55e] font-mono text-sm focus:outline-none 
                                focus:border-black/50 dark:focus:border-[#22c55e]/50 focus:ring-1 
                                focus:ring-black/10 dark:focus:ring-[#22c55e]/20 transition-all"
                            >
                                <option value="all">Sort By</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="prize_high">Highest Prize</option>
                                <option value="prize_low">Lowest Prize</option>
                                <option value="start_date">Start Date</option>
                                <option value="end_date">End Date</option>
                            </select> */}

                            {/* <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-black dark:text-[#22c55e]">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div> */}
                            <CustomSelect
                                options={sortOptions}
                                value={sortBy}
                                onChange={handleSortChange}
                                placeholder="Sort By"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
                                options={statuses}
                                value={selectedStatuses[0] || 'all'}
                                onChange={handleStatusChange}
                                placeholder="Status"
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
                                options={[
                                    { id: 'today', name: 'Today' },
                                    { id: 'this-week', name: 'This Week' },
                                    { id: 'this-month', name: 'This Month' },
                                    { id: 'custom', name: 'Custom' }
                                ]}
                                value={selectedDates[0] || 'all'}
                                onChange={handleDateChange}
                                placeholder="Date"
                            />
                            <DateRangePicker
                                isOpen={isCustomDateOpen}
                                startDate={startDate}
                                endDate={endDate}
                                onStartDateChange={handleStartDateChange}
                                onEndDateChange={handleEndDateChange}
                                onClose={() => setIsCustomDateOpen(false)}
                            />
                        </div>

                        <div className="relative">
                            <button
                                data-price-button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPriceFilterOpen(!isPriceFilterOpen);
                                }}
                                className="w-full bg-transparent border border-black/30 dark:border-[#22c55e]/30 
                                rounded-lg px-5 py-3 text-black dark:text-[#22c55e] font-mono text-sm focus:outline-none 
                                focus:border-black/50 dark:focus:border-[#22c55e]/50 focus:ring-1 
                                focus:ring-black/10 dark:focus:ring-[#22c55e]/20 transition-all flex items-center justify-between"
                            >
                                <span>{minPrice === 0 ? 'Price' : `$${minPrice.toLocaleString()}`}</span>
                                <svg className={`h-4 w-4 transition-transform ${isPriceFilterOpen ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <PriceRangeSlider
                                minPrice={0}
                                maxPrice={100000}
                                onPriceChange={handlePriceChange}
                                isOpen={isPriceFilterOpen}
                                onClose={() => setIsPriceFilterOpen(false)}
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
                                        router.push(`/hackathons?${params.toString()}`);
                                    }}
                                />
                            ))}
                            {selectedStatuses.map((statusId) => (
                                <FilterTag
                                    key={`status-${statusId}`}
                                    type="status"
                                    value={statusId}
                                    statuses={statuses}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedStatuses = selectedStatuses.filter(id => id !== statusId);
                                        if (updatedStatuses.length > 0) {
                                            params.set('status', updatedStatuses.join(','));
                                        } else {
                                            params.delete('status');
                                        }
                                        setSelectedStatuses(updatedStatuses);
                                        router.push(`/hackathons?${params.toString()}`);
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
                                        router.push(`/hackathons?${params.toString()}`);
                                    }}
                                />
                            ))}
                            {selectedDates.map((date) => (
                                <FilterTag
                                    key={`date-${date}`}
                                    type="date"
                                    value={date}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        const updatedDates = selectedDates.filter(d => d !== date);
                                        if (updatedDates.length > 0) {
                                            params.set('date', updatedDates.join(','));
                                        } else {
                                            params.delete('date');
                                        }
                                        setSelectedDates(updatedDates);
                                        router.push(`/hackathons?${params.toString()}`);
                                    }}
                                />
                            ))}
                            {minPrice > 0 && (
                                <FilterTag
                                    type="price"
                                    value={minPrice.toString()}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        params.delete('price');
                                        setMinPrice(0);
                                        setIsPriceFilterOpen(false);
                                        router.push(`/hackathons?${params.toString()}`);
                                    }}
                                />
                            )}
                            {startDate && (
                                <FilterTag
                                    type="date"
                                    value={`From: ${formatDate(startDate)}`}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        params.delete('startDate');
                                        setStartDate('');
                                        router.push(`/hackathons?${params.toString()}`);
                                    }}
                                />
                            )}
                            {endDate && (
                                <FilterTag
                                    type="date"
                                    value={`To: ${formatDate(endDate)}`}
                                    onRemove={() => {
                                        const params = new URLSearchParams(searchParams);
                                        params.delete('endDate');
                                        setEndDate('');
                                        router.push(`/hackathons?${params.toString()}`);
                                    }}
                                />
                            )}
                            {(selectedCategories.length > 0 ||
                                selectedStatuses.length > 0 ||
                                selectedLocations.length > 0 ||
                                selectedDates.length > 0 ||
                                minPrice > 0 ||
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
                    {filteredHackathons.map((hackathon, index) => (
                        <div
                            key={`${hackathon.id}-${index}`}
                            onClick={() => handleHackathonClick(hackathon)}
                            className="border border-black/30 dark:border-[#22c55e]/30 rounded-lg p-4 sm:p-6 
                            hover:border-black/50 dark:hover:border-[#22c55e]/50 transition-all bg-transparent 
                            cursor-pointer hover:bg-black/5 dark:hover:bg-[#22c55e]/5 overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <div className="relative flex-shrink-0 rounded-full overflow-hidden 
                                    bg-white dark:bg-black border border-black/30 dark:border-[#22c55e]/30
                                    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                                        <Image
                                            src={hackathon.thumbnail_url}
                                            alt={hackathon.title}
                                            fill
                                            sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                                            className="object-cover"
                                            priority={index < 4}
                                            quality={75}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = './placeholder.gif';
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-mono text-black dark:text-[#22c55e] mb-1 break-words">
                                            {hackathon.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-mono text-black/70 dark:text-[#22c55e]/70">
                                                by <span className="font-bold">{hackathon.organizer_name}</span>
                                            </span>
                                            <span className="text-sm font-mono text-black/70 dark:text-[#22c55e]/70 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {hackathon.location}
                                            </span>
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
                                            window.open(hackathon.hackathon_url, '_blank');
                                        }}
                                    >
                                        Apply
                                    </button>

                                    <div className="font-mono text-black/70 dark:text-[#22c55e]/70 text-sm">
                                        {formatDate(hackathon.start_date)} - {formatDate(hackathon.extended_date || hackathon.end_date)}
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
                        {!loading && hackathons.length === 0 && (
                            <p className="text-black/50 dark:text-[#22c55e]/50 font-mono">
                                No hackathons found.
                            </p>
                        )}
                    </div>
                </div>

                {selectedHackathon && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        hackathon={selectedHackathon}
                    />
                )}
            </div>
        </div>
    );
}