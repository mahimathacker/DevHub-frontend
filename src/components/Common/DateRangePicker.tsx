'use client';

import { useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';

interface DateRangePickerProps {
    isOpen: boolean;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    startDate: string;
    endDate: string;
    onClose: () => void;
}

export default function DateRangePicker({
    isOpen,
    onStartDateChange,
    onEndDateChange,
    startDate,
    endDate,
    onClose
}: DateRangePickerProps) {
    const datePickerRef = useRef<HTMLDivElement>(null);
    useClickOutside(datePickerRef, onClose);

    if (!isOpen) return null;

    return (
        <div ref={datePickerRef} className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-black border 
        border-black/30 dark:border-[#22c55e]/30 rounded-lg p-4 z-50 shadow-lg">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-mono text-black dark:text-[#22c55e] mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="w-full bg-transparent border border-black/30 dark:border-[#22c55e]/30 
                        rounded-lg px-3 py-2 text-black dark:text-[#22c55e] font-mono text-sm focus:outline-none 
                        focus:border-black/50 dark:focus:border-[#22c55e]/50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-mono text-black dark:text-[#22c55e] mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="w-full bg-transparent border border-black/30 dark:border-[#22c55e]/30 
                        rounded-lg px-3 py-2 text-black dark:text-[#22c55e] font-mono text-sm focus:outline-none 
                        focus:border-black/50 dark:focus:border-[#22c55e]/50"
                    />
                </div>
            </div>
        </div>
    );
} 