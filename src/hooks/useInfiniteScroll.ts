'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions<T> {
    fetchItems: (cursor: string | null) => Promise<{
        data: T[];
        nextCursor: string | null;
    }>;
    limit: number;
    key: string;
    initialData?: T[];
    initialCursor?: string | null;
}

export function useInfiniteScroll<T>({
    fetchItems,
    limit,
    key,
    initialData = [],
    initialCursor = null
}: UseInfiniteScrollOptions<T>) {
    const [items, setItems] = useState<T[]>(initialData);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [hasMore, setHasMore] = useState(initialData.length >= limit);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const keyRef = useRef(key);

    // Reset state when key (filters) changes
    useEffect(() => {
        if (keyRef.current !== key) {
            setItems(initialData);
            setCursor(initialCursor);
            setHasMore(initialData.length >= limit);
            setError(null);
            keyRef.current = key;
        }
    }, [key, initialData, initialCursor, limit]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);
            const response = await fetchItems(cursor);

            if (!response.data || response.data.length === 0) {
                setHasMore(false);
                return;
            }

            setItems(prevItems => [...prevItems, ...response.data]);
            setCursor(response.nextCursor);
            // Only set hasMore true if we got at least 'limit' items
            setHasMore(response.data.length >= limit && !!response.nextCursor);
        } catch (err) {
            setError(err as Error);
            console.error('Error loading more items:', err);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, fetchItems, cursor, limit]);

    useEffect(() => {
        const currentElement = loadingRef.current;
        if (!currentElement) return;

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        observer.current.observe(currentElement);

        return () => {
            if (observer.current && currentElement) {
                observer.current.unobserve(currentElement);
            }
        };
    }, [loadMore, hasMore, loading]);

    return { items, loading, error, loadingRef };
}
