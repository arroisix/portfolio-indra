import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Link } from '../../atoms';

interface PortfolioCardProps {
    post: {
        __metadata?: {
            urlPath?: string;
        };
        title?: string;
        excerpt?: string;
        featuredImage?: {
            url: string;
            altText?: string;
        };
        featuredVideo?: {
            url: string;
        };
        category?: string;
        aspectRatio?: 'tall' | 'medium' | 'short' | 'square';
    };
}

const ASPECT_RATIO_CLASSES = {
    tall: 'aspect-[3/4]',
    medium: 'aspect-[4/3]',
    short: 'aspect-[16/9]',
    square: 'aspect-square',
};

// Check if URL is a video
const isVideoUrl = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

export default function PortfolioCard({ post }: PortfolioCardProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle tap on mobile - auto reset after 3s
    const handleTap = () => {
        if (isMobile && !isHovered) {
            setIsHovered(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setIsHovered(false), 3000);
        }
    };

    // Cleanup timeout
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const url = post.__metadata?.urlPath || '#';
    const title = post.title || 'Untitled';
    const imageUrl = post.featuredImage?.url;
    const videoUrl = post.featuredVideo?.url;
    const imageAlt = post.featuredImage?.altText || title;

    // All covers are 1200x1600 (3:4), default to tall aspect ratio
    const aspectRatio = post.aspectRatio || 'tall';
    const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio];

    // Determine if we should show video (either from featuredVideo or if featuredImage is a video)
    const showVideo = videoUrl || (imageUrl && isVideoUrl(imageUrl));
    const mediaVideoUrl = videoUrl || imageUrl;

    return (
        <div
            className={classNames(
                'portfolio-card-wrapper mb-5',
                isMobile && isHovered && 'mobile-card-active'
            )}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onTouchStart={handleTap}
        >
            <Link href={url} className="block">
                {/* Card Container - WHITE background */}
                <div className="portfolio-card-fm bg-white">
                    {/* Media with padding inside card */}
                    <div className="p-3 pb-0">
                        <div className={classNames('portfolio-card-image-wrap relative overflow-hidden bg-gray-50', aspectClass)}>
                            {showVideo && mediaVideoUrl ? (
                                // Video - autoplay, loop, muted, no controls
                                <video
                                    src={mediaVideoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={classNames(
                                        'absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out',
                                        isHovered && 'scale-105'
                                    )}
                                    onLoadedData={() => setIsLoading(false)}
                                />
                            ) : imageUrl ? (
                                // Image
                                <>
                                    {isLoading && (
                                        <div className="absolute inset-0 skeleton-loading rounded-xl" />
                                    )}
                                    <Image
                                        src={imageUrl}
                                        alt={imageAlt}
                                        fill
                                        className={classNames(
                                            'object-contain transition-transform duration-500 ease-out',
                                            isLoading ? 'opacity-0' : 'opacity-100',
                                            isHovered && 'scale-105'
                                        )}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        onLoad={() => setIsLoading(false)}
                                    />
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-xl">
                                    <span className="text-gray-400 text-sm">No image</span>
                                </div>
                            )}

                            {/* Loading skeleton for video */}
                            {showVideo && isLoading && (
                                <div className="absolute inset-0 skeleton-loading rounded-xl" />
                            )}

                            {/* Blur overlay - expands from bottom on hover */}
                            <div className="portfolio-card-blur-overlay" />
                        </div>
                    </div>

                    {/* Content - with arrow icon on right */}
                    <div className="p-4 pt-3 flex items-center justify-between gap-3">
                        {/* Left: Title only */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-inter font-semibold text-base text-gray-900">
                                {title}
                            </h3>
                        </div>

                        {/* Right: Arrow icon - only visible on hover */}
                        <div
                            className={classNames(
                                'flex-shrink-0 transition-all duration-300 ease-out',
                                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                            )}
                        >
                            <span className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:border-gray-400 transition-colors">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-600"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
