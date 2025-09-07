'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Option {
    id: number | string;
    name: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export default function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionId: string) => {
        onChange(optionId);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white dark:bg-black border border-black/30 dark:border-[#22c55e]/30 
                rounded-lg px-5 py-3 text-left text-black dark:text-[#22c55e] font-mono text-sm 
                focus:outline-none focus:border-black/50 dark:focus:border-[#22c55e]/50 
                focus:ring-1 focus:ring-black/10 dark:focus:ring-[#22c55e]/20 transition-all
                flex items-center justify-between"
            >
                <span>{placeholder}</span>
                <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-black border border-black/30 
                dark:border-[#22c55e]/30 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id.toString())}
                            className={`w-full text-left px-4 py-2 text-black dark:text-[#22c55e] font-mono
                            hover:bg-black/5 dark:hover:bg-[#22c55e]/5 transition-colors
                            ${option.id.toString() === value ? 'bg-black/5 dark:bg-[#22c55e]/5' : ''}`}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
