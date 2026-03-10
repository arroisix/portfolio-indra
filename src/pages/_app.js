import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [loadingState, setLoadingState] = useState('idle'); // 'idle' | 'loading' | 'finishing'
    const [progress, setProgress] = useState(0);
    const progressInterval = useRef(null);

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

        // Page transition loading with progress simulation
        const handleStart = () => {
            setLoadingState('loading');
            setProgress(0);

            // Simulate progress
            let currentProgress = 0;
            progressInterval.current = setInterval(() => {
                currentProgress += Math.random() * 15;
                if (currentProgress > 90) currentProgress = 90;
                setProgress(currentProgress);
            }, 100);
        };

        const handleComplete = () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
            setProgress(100);
            setLoadingState('finishing');

            // Reset after animation completes
            setTimeout(() => {
                setLoadingState('idle');
                setProgress(0);
            }, 400);
        };

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
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, [router]);

    return (
        <>
            {/* Progress bar at top - only shown during route changes */}
            {loadingState !== 'idle' && (
                <div className="page-transition-container">
                    <div className="page-progress-bar">
                        <div
                            className="page-progress-fill"
                            style={{
                                width: `${progress}%`,
                                transition: loadingState === 'finishing'
                                    ? 'width 0.2s ease-out, opacity 0.3s ease-out 0.1s'
                                    : 'width 0.3s ease-out',
                                opacity: loadingState === 'finishing' ? 0 : 1
                            }}
                        />
                    </div>
                </div>
            )}
            <Component {...pageProps} />
        </>
    );
}
