import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateTheme = (e) => {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        updateTheme(mediaQuery);
        mediaQuery.addEventListener('change', updateTheme);

        // Page transition loading
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        // Bouncy click animation for all interactive elements
        const handleMouseDown = (e) => {
            const target = e.target.closest('button, a, [role="button"], .view-all-button, .back-to-work-btn, .portfolio-card-fm');
            if (target) {
                // Remove class first to allow re-triggering
                target.classList.remove('bouncy-click');
                // Force reflow to restart animation
                void target.offsetWidth;
                target.classList.add('bouncy-click');
            }
        };

        const handleAnimationEnd = (e) => {
            if (e.animationName === 'bouncy-click') {
                e.target.classList.remove('bouncy-click');
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('touchstart', handleMouseDown, { passive: true });
        document.addEventListener('animationend', handleAnimationEnd);

        return () => {
            mediaQuery.removeEventListener('change', updateTheme);
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('touchstart', handleMouseDown);
            document.removeEventListener('animationend', handleAnimationEnd);
        };
    }, [router]);

    return (
        <>
            {isLoading && <div className="page-loading-overlay" />}
            <Component {...pageProps} />
        </>
    );
}
