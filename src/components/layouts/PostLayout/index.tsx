import * as React from 'react';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import Link from '../../atoms/Link';
import ScrollToTop from '../../atoms/ScrollToTop';
import VideoShowcase from '../../blocks/VideoShowcase';

function ImageLightbox({ url, altText, onClose }) {
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div
            className="lightbox-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={url}
                alt={altText || 'Gallery image'}
                className="lightbox-bounce-in max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
            />
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
            onImageClick({ url: item.url, altText: item.altText || `Project image ${index + 1}` });
        }
    };

    return (
        <div
            className={`relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60 ${isClickable ? 'gallery-item-interactive' : ''}`}
            onClick={isClickable ? handleClick : undefined}
        >
            {isVideo ? (
                <video
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-auto ${item.cropBlackbar ? 'aspect-video object-cover scale-[1.02]' : ''}`}
                />
            ) : isGif ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={item.url}
                    alt={item.altText || `Project image ${index + 1}`}
                    className="w-full h-auto"
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={item.url}
                    alt={item.altText || `Project image ${index + 1}`}
                    className="w-full h-auto"
                />
            )}

            {/* Zoom hint overlay for clickable items */}
            {isClickable && (
                <div className="gallery-zoom-hint absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 bg-black/10 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                    </div>
                </div>
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

    const [activeImage, setActiveImage] = React.useState<{ url: string; altText: string } | null>(null);

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-post-layout bg-white">
                {/* Image Lightbox */}
                {activeImage && (
                    <ImageLightbox
                        url={activeImage.url}
                        altText={activeImage.altText}
                        onClose={() => setActiveImage(null)}
                    />
                )}
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
                                                <GalleryItem item={item} index={i} onImageClick={setActiveImage} />
                                                <GalleryItem item={nextItem} index={i + 1} onImageClick={setActiveImage} />
                                            </div>
                                        );
                                        i += 2;
                                    } else if (item.ratio === 'square' && i + 1 < gallery.length && gallery[i + 1].ratio === 'square') {
                                        // Pair consecutive square images side-by-side on desktop
                                        const nextItem = gallery[i + 1];
                                        elements.push(
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <GalleryItem item={item} index={i} onImageClick={setActiveImage} />
                                                <GalleryItem item={nextItem} index={i + 1} onImageClick={setActiveImage} />
                                            </div>
                                        );
                                        i += 2;
                                    } else {
                                        elements.push(
                                            <GalleryItem key={i} item={item} index={i} onImageClick={setActiveImage} />
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
