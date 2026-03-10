import * as React from 'react';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import Link from '../../atoms/Link';
import ScrollToTop from '../../atoms/ScrollToTop';
import VideoShowcase from '../../blocks/VideoShowcase';

// Lightbox component with bouncy animation
function Lightbox({ item, onClose }) {
    const [isVisible, setIsVisible] = React.useState(false);
    const isVideo = item?.url?.endsWith('.mp4') || item?.url?.endsWith('.webm') || item?.url?.endsWith('.mov') || item?.url?.endsWith('.ogg');

    React.useEffect(() => {
        // Trigger animation after mount
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';

        // Handle escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    if (!item) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 transition-all duration-200 ${
                isVisible ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0'
            }`}
            onClick={handleClose}
        >
            {/* Close button */}
            <button
                className={`absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                onClick={handleClose}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {/* Image/Video container with bouncy animation */}
            <div
                className={`relative max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    isVisible
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75'
                }`}
                style={{
                    transitionTimingFunction: isVisible ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {isVideo ? (
                    <video
                        src={item.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="max-w-full max-h-[85vh] w-auto h-auto"
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.url}
                        alt={item.altText || 'Gallery image'}
                        className="max-w-full max-h-[85vh] w-auto h-auto"
                    />
                )}
            </div>

            {/* Caption */}
            {item.caption && (
                <p
                    className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm md:text-base text-center max-w-lg px-4 transition-all duration-300 delay-100 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    {item.caption}
                </p>
            )}
        </div>
    );
}

function GalleryItem({ item, index, onImageClick }) {
    const isVideo = item.url?.endsWith('.mp4') || item.url?.endsWith('.webm') || item.url?.endsWith('.mov') || item.url?.endsWith('.ogg');
    const isGif = item.url?.endsWith('.gif');
    const isClickable = !isVideo || isGif;

    // Special video showcase with animated background
    if (item.showcase && isVideo) {
        return <VideoShowcase url={item.url} altText={item.altText} />;
    }

    const handleClick = () => {
        if (isClickable && onImageClick) {
            onImageClick({ url: item.url, altText: item.altText || `Project image ${index + 1}`, caption: item.caption });
        }
    };

    return (
        <div
            className={`relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60 group ${
                isClickable ? 'cursor-zoom-in' : ''
            }`}
            onClick={isClickable ? handleClick : undefined}
        >
            {/* Hover overlay */}
            {isClickable && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-700"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </div>
                </div>
            )}

            {isVideo ? (
                <video
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-auto transition-transform duration-300 group-hover:scale-[1.02] ${item.cropBlackbar ? 'aspect-video object-cover scale-[1.02]' : ''}`}
                />
            ) : isGif ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={item.url}
                    alt={item.altText || `Project image ${index + 1}`}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={item.url}
                    alt={item.altText || `Project image ${index + 1}`}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                />
            )}

            {item.caption && (
                <p className="text-center text-sm text-gray-500 mt-3 px-4 pb-4">
                    {item.caption}
                </p>
            )}
        </div>
    );
}

export default function PostLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { enableAnnotations = true } = site;
    const {
        title,
        excerpt,
        gallery = [],
    } = page;

    const [lightboxItem, setLightboxItem] = React.useState(null);

    const handleImageClick = (item) => {
        setLightboxItem(item);
    };

    const handleCloseLightbox = () => {
        setLightboxItem(null);
    };

    return (
        <BaseLayout page={page} site={site}>
            {/* Lightbox */}
            {lightboxItem && (
                <Lightbox item={lightboxItem} onClose={handleCloseLightbox} />
            )}

            <main id="main" className="sb-layout sb-post-layout bg-white">
                {/* Back Button - Fixed at top */}
                <div className="fixed top-6 left-6 z-50">
                    <Link
                        href="/"
                        className="back-to-work-btn bg-white/80 backdrop-blur-md"
                    >
                        <svg
                            className="back-chevron"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        <span>Back</span>
                    </Link>
                </div>

                {/* Header Section */}
                <section className="pt-20 md:pt-32 pb-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Title */}
                        <h1
                            className="font-baskerville italic text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight mb-6"
                            {...(enableAnnotations && { 'data-sb-field-path': 'title' })}
                        >
                            {title}
                        </h1>

                        {/* Subtitle/Excerpt */}
                        {excerpt && (
                            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl">
                                {excerpt}
                            </p>
                        )}
                    </div>
                </section>

                {/* Gallery - Images and GIFs */}
                {gallery.length > 0 && (
                    <section className="px-6 pb-16">
                        <div className="max-w-6xl mx-auto space-y-6">
                            {(() => {
                                const elements = [];
                                let i = 0;

                                while (i < gallery.length) {
                                    const item = gallery[i];

                                    // Check if this item starts a grid pair (explicit grid:2 or consecutive squares)
                                    if (item.grid === 2 && i + 1 < gallery.length) {
                                        const nextItem = gallery[i + 1];
                                        elements.push(
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <GalleryItem item={item} index={i} onImageClick={handleImageClick} />
                                                <GalleryItem item={nextItem} index={i + 1} onImageClick={handleImageClick} />
                                            </div>
                                        );
                                        i += 2;
                                    } else if (item.ratio === 'square' && i + 1 < gallery.length && gallery[i + 1].ratio === 'square') {
                                        // Pair consecutive square images side-by-side on desktop
                                        const nextItem = gallery[i + 1];
                                        elements.push(
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <GalleryItem item={item} index={i} onImageClick={handleImageClick} />
                                                <GalleryItem item={nextItem} index={i + 1} onImageClick={handleImageClick} />
                                            </div>
                                        );
                                        i += 2;
                                    } else {
                                        elements.push(
                                            <GalleryItem key={i} item={item} index={i} onImageClick={handleImageClick} />
                                        );
                                        i += 1;
                                    }
                                }

                                return elements;
                            })()}
                        </div>
                    </section>
                )}

                {/* Footer spacer */}
                <div className="h-24" />

                {/* Scroll to Top - Mobile Only */}
                <ScrollToTop />
            </main>
        </BaseLayout>
    );
}
