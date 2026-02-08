import { useState } from 'react';
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
        category?: string;
        aspectRatio?: 'tall' | 'medium' | 'short' | 'square';
    };
    index?: number;
}

// Predefined aspect ratios for Pinterest-style varying heights
const ASPECT_RATIOS = ['tall', 'medium', 'short', 'square', 'medium'] as const;

const ASPECT_RATIO_CLASSES = {
    tall: 'aspect-[3/4]',
    medium: 'aspect-[4/3]',
    short: 'aspect-[16/9]',
    square: 'aspect-square',
};

export default function PortfolioCard({ post, index = 0 }: PortfolioCardProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const url = post.__metadata?.urlPath || '#';
    const title = post.title || 'Untitled';
    const excerpt = post.excerpt || '';
    const imageUrl = post.featuredImage?.url;
    const imageAlt = post.featuredImage?.altText || title;

    const aspectRatio = post.aspectRatio || ASPECT_RATIOS[index % ASPECT_RATIOS.length];
    const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio];

    return (
        <div
            className="portfolio-card-wrapper mb-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={url} className="block">
                {/* Card Container - WHITE background */}
                <div className="portfolio-card-fm bg-white">
                    {/* Image with padding inside card */}
                    <div className="p-3 pb-0">
                        <div className={classNames('portfolio-card-image-wrap relative overflow-hidden rounded-xl', aspectClass)}>
                            {imageUrl ? (
                                <>
                                    {isLoading && (
                                        <div className="absolute inset-0 skeleton-loading rounded-xl" />
                                    )}
                                    <Image
                                        src={imageUrl}
                                        alt={imageAlt}
                                        fill
                                        className={classNames(
                                            'object-cover transition-transform duration-500 ease-out',
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
                        </div>
                    </div>

                    {/* Content - with arrow icon on right */}
                    <div className="p-4 pt-3 flex items-start justify-between gap-3">
                        {/* Left: Title + Description */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-jakarta font-semibold text-base text-gray-900 mb-1">
                                {title}
                            </h3>
                            {excerpt && (
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {excerpt}
                                </p>
                            )}
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
