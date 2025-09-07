'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Header from './Header';

export default function SearchContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set('keyword', query);
        } else {
            params.delete('keyword');
        }
        router.replace(`/?${params.toString()}`);
    };

    return <Header onSearch={handleSearch} />;
} 