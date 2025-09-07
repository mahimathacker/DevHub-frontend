'use client';

import { useState, useEffect, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';

interface PriceRangeSliderProps {
    minPrice: number;
    maxPrice: number;
    onPriceChange: (min: number) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function PriceRangeSlider({ minPrice, maxPrice, onPriceChange, isOpen, onClose }: PriceRangeSliderProps) {
    const [value, setValue] = useState(minPrice);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside and prevent event bubbling
    useClickOutside(sliderRef, (e) => {
        // Check if the click was on the button
        const button = document.querySelector('[data-price-button]');
        if (button && button.contains(e.target as Node)) {
            return; // Don't close if clicking the button
        }
        onClose();
    });

    useEffect(() => {
        onPriceChange(value);
    }, [value, onPriceChange]);

    if (!isOpen) return null;

    return (
        <div
            ref={sliderRef}
            className="absolute z-20 mt-2 p-4 w-64 bg-white dark:bg-black border border-black/30 dark:border-[#22c55e] rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
        >
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-black dark:text-[#22c55e] font-mono text-sm">Minimum</span>
                    <span className="text-black dark:text-[#22c55e] font-mono text-sm">
                        ${value.toLocaleString()}
                    </span>
                </div>

                <input
                    type="range"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    min={minPrice}
                    max={maxPrice}
                    step={100}
                    className="w-full h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                    [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-[#2563eb] [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:bg-[#2563eb] [&::-moz-range-thumb]:border-0"
                />
            </div>
        </div>
    );
} 