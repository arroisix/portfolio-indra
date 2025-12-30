import { useEffect } from 'react';
import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
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

        return () => mediaQuery.removeEventListener('change', updateTheme);
    }, []);

    return <Component {...pageProps} />;
}
