'use client';

interface FilterTagProps {
    type: 'category' | 'status' | 'location' | 'date' | 'price' | 'jobType' | 'categoryType' | 'salary' | 'language' | 'resourceType' | 'difficultyLevel' | 'priceType';
    value: string;
    onRemove: () => void;
    categories?: Array<{ id: number; name: string }>;
    statuses?: Array<{ id: number; name: string }>;
    locations?: Array<{ id: number; name: string }>;
    jobTypes?: Array<{ id: number; name: string }>;
    categoryTypes?: Array<{ id: number; name: string }>;
    salaries?: Array<{ id: number; name: string }>;
    languages?: Array<{ id: number; name: string }>;
    resourceTypes?: Array<{ id: number; name: string }>;
    difficultyLevels?: Array<{ id: number; name: string }>;
    priceTypes?: Array<{ id: number; name: string }>;
}

export default function FilterTag({
    type,
    value,
    onRemove,
    categories = [],
    statuses = [],
    locations = [],
    jobTypes = [],
    categoryTypes = [],
    salaries = [],
    languages = [],
    resourceTypes = [],
    difficultyLevels = [],
    priceTypes = []
}: FilterTagProps) {
    // Helper function to get display name
    const getDisplayName = () => {
        switch (type) {
            case 'category':
                const category = categories.find(c => c.id.toString() === value);
                return category ? category.name : value;
            case 'status':
                const status = statuses.find(s => s.id.toString() === value);
                return status ? status.name : value;
            case 'location':
                const location = locations.find(l => l.id.toString() === value);
                return location ? location.name : value;
            case 'price':
                return `Min $${value}`;
            case 'date':
                // Format date range or specific date
                return formatDateFilter(value);
            case 'jobType':
                const jobType = jobTypes.find(j => j.id.toString() === value);
                return jobType ? jobType.name : value;
            case 'categoryType':
                const categoryType = categoryTypes.find(ct => ct.id.toString() === value);
                return categoryType ? categoryType.name : value;
            case 'salary':
                const salary = salaries.find(s => s.id.toString() === value);
                return salary ? salary.name : value;
            case 'language':
                const language = languages.find(l => l.id.toString() === value);
                return language ? language.name : value;
            case 'resourceType':
                const resourceType = resourceTypes.find(rt => rt.id.toString() === value);
                return resourceType ? resourceType.name : value;
            case 'difficultyLevel':
                const difficultyLevel = difficultyLevels.find(dl => dl.id.toString() === value);
                return difficultyLevel ? difficultyLevel.name : value;
            case 'priceType':
                const priceType = priceTypes.find(pt => pt.id.toString() === value);
                return priceType ? priceType.name : value;
            default:
                return value;
        }
    };

    // Helper function to format date filter
    const formatDateFilter = (dateValue: string) => {
        switch (dateValue) {
            case 'today':
                return 'Today';
            case 'this-week':
                return 'This Week';
            case 'this-month':
                return 'This Month';
            case 'upcoming':
                return 'Upcoming';
            default:
                return dateValue;
        }
    };

    return (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/10 dark:bg-[#22c55e]/10 border border-black/20 
        dark:border-[#22c55e]/20 rounded-full text-sm font-mono text-black dark:text-[#22c55e]">
            {getDisplayName()}
            <button onClick={onRemove} className="hover:text-black/80 dark:hover:text-[#22c55e]/80 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
} 