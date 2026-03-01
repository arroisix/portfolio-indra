import * as React from 'react';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import Link from '../../atoms/Link';
import ScrollToTop from '../../atoms/ScrollToTop';
import VideoShowcase from '../../blocks/VideoShowcase';

function GalleryItem({ item, index }) {
    const isVideo = item.url?.endsWith('.mp4') || item.url?.endsWith('.webm');
    const isGif = item.url?.endsWith('.gif');

    // Special video showcase with animated background
    if (item.showcase && isVideo) {
        return <VideoShowcase url={item.url} altText={item.altText} />;
    }

    return (
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60">
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

    return (
        <BaseLayout page={page} site={site}>
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
                                                <GalleryItem item={item} index={i} />
                                                <GalleryItem item={nextItem} index={i + 1} />
                                            </div>
                                        );
                                        i += 2;
                                    } else if (item.ratio === 'square' && i + 1 < gallery.length && gallery[i + 1].ratio === 'square') {
                                        // Pair consecutive square images side-by-side on desktop
                                        const nextItem = gallery[i + 1];
                                        elements.push(
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <GalleryItem item={item} index={i} />
                                                <GalleryItem item={nextItem} index={i + 1} />
                                            </div>
                                        );
                                        i += 2;
                                    } else {
                                        elements.push(
                                            <GalleryItem key={i} item={item} index={i} />
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
