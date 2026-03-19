import * as React from 'react';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import Link from '../../atoms/Link';
import ScrollToTop from '../../atoms/ScrollToTop';
import VideoShowcase from '../../blocks/VideoShowcase';

// Lightbox component with bouncy animation
function Lightbox({ item, onClose }) {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isZoomed, setIsZoomed] = React.useState(false);
    const isVideo = item?.url?.endsWith('.mp4') || item?.url?.endsWith('.webm') || item?.url?.endsWith('.mov') || item?.url?.endsWith('.ogg');

    React.useEffect(() => {
        // Trigger animation after mount
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        // Prevent body scroll when lightbox is open (works on iOS too)
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';

        // Handle escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEscape);

        return () => {
            // Restore scroll position
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            window.scrollTo(0, scrollY);
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    const handleOpenNewTab = (e) => {
        e.stopPropagation();
        window.open(item.url, '_blank');
    };

    const handleToggleZoom = (e) => {
        e.stopPropagation();
        setIsZoomed(!isZoomed);
    };

    if (!item) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 transition-all duration-200 ${
                isVisible ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0'
            } ${isZoomed ? 'overflow-auto' : ''}`}
            onClick={isZoomed ? handleToggleZoom : handleClose}
        >
            {/* Action buttons - top right */}
            <div
                className={`absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-2 transition-all duration-200 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
            >
                {/* Zoom button - only for images */}
                {!isVideo && (
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
                        onClick={handleToggleZoom}
                        title={isZoomed ? 'Zoom out' : 'Zoom in'}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            {isZoomed ? (
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            ) : (
                                <>
                                    <line x1="11" y1="8" x2="11" y2="14"></line>
                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                </>
                            )}
                        </svg>
                    </button>
                )}

                {/* Open in new tab button */}
                <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
                    onClick={handleOpenNewTab}
                    title="Open in new tab"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </button>

                {/* Close button */}
                <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
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
            </div>

            {/* Image/Video container with bouncy animation */}
            <div
                className={`relative ${isZoomed ? '' : 'max-w-[90vw] max-h-[90vh]'} rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
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
                        className={`${isZoomed ? 'max-w-none cursor-zoom-out' : 'max-w-full max-h-[85vh] cursor-zoom-in'} w-auto h-auto`}
                        onClick={handleToggleZoom}
                    />
                )}
            </div>

            {/* Caption */}
            {item.caption && !isZoomed && (
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
    const [isLoading, setIsLoading] = React.useState(true);
    const [showContent, setShowContent] = React.useState(false);

    const handleImageClick = (item) => {
        setLightboxItem(item);
    };

    const handleCloseLightbox = () => {
        setLightboxItem(null);
    };

    // Content loading animation
    React.useEffect(() => {
        // Small delay before starting the reveal
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        // Stagger the content reveal
        const showTimer = setTimeout(() => {
            setShowContent(true);
        }, 350);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(showTimer);
        };
    }, []);

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
                        {/* Loading skeleton for header */}
                        {isLoading ? (
                            <div>
                                {/* Title skeleton */}
                                <div className="h-12 md:h-14 lg:h-16 skeleton-loading rounded-lg mb-4 w-3/4"></div>
                                <div className="h-12 md:h-14 lg:h-16 skeleton-loading rounded-lg mb-6 w-1/2"></div>
                                {/* Excerpt skeleton */}
                                <div className="space-y-3 max-w-3xl">
                                    <div className="h-5 md:h-6 skeleton-loading rounded w-full"></div>
                                    <div className="h-5 md:h-6 skeleton-loading rounded w-5/6"></div>
                                    <div className="h-5 md:h-6 skeleton-loading rounded w-2/3"></div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`transition-all duration-500 ease-out ${
                                    showContent
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-4'
                                }`}
                            >
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
                        )}
                    </div>
                </section>

                {/* Gallery - Images and GIFs */}
                {gallery.length > 0 && (
                    <section className="px-6 pb-16">
                        <div className="max-w-6xl mx-auto space-y-6">
                            {/* Loading skeleton for gallery */}
                            {isLoading ? (
                                <div className="space-y-6">
                                    {/* First large skeleton */}
                                    <div className="aspect-video skeleton-loading rounded-2xl"></div>
                                    {/* Two column skeleton */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="aspect-square skeleton-loading rounded-2xl"></div>
                                        <div className="aspect-square skeleton-loading rounded-2xl"></div>
                                    </div>
                                    {/* Another large skeleton */}
                                    <div className="aspect-video skeleton-loading rounded-2xl"></div>
                                </div>
                            ) : (
                                <div
                                    className={`space-y-6 transition-all duration-500 ease-out delay-150 ${
                                        showContent
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-6'
                                    }`}
                                >
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
                            )}
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
