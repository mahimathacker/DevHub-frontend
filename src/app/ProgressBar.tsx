"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Configure NProgress globally
NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 500,
    showSpinner: false
});

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
    // const searchParams = useSearchParams();
    const pathname = usePathname();
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [progressKey, setProgressKey] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            setProgressKey((prev) => prev + 1);
        }
    }, [theme, resolvedTheme, mounted]);

    // Handle navigation events
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor &&
                anchor.href &&
                anchor.href.startsWith(window.location.origin) &&
                !anchor.hasAttribute('download') &&
                anchor.target !== '_blank' &&
                !anchor.href.includes('#') // Don't show progress for hash changes
            ) {
                NProgress.start();
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
            NProgress.done();
        };
    }, []);

    // Handle route changes
    useEffect(() => {
        NProgress.done();
    }, [pathname]);

    if (!mounted) {
        return <>{children}</>;
    }

    const currentTheme = resolvedTheme || theme || "dark";
    const progressColor = currentTheme === "light" ? "#000000" : "#22c55e";

    return (
        <>
            {children}
            <ProgressBar
                key={progressKey}
                height="3px"
                color={progressColor}
                options={{
                    showSpinner: false,
                    minimum: 0.3,
                    easing: 'ease',
                    speed: 500
                }}
                shallowRouting
            />
        </>
    );
};

export default ProgressBarProvider;
