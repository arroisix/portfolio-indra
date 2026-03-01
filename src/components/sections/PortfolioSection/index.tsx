import classNames from 'classnames';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Link } from '../../atoms';
import PortfolioCard from './PortfolioCard';

interface Post {
    __metadata?: {
        urlPath?: string;
    };
    title?: string;
    excerpt?: string;
    featuredImage?: {
        url: string;
        altText?: string;
    };
    isFeatured?: boolean;
    date?: string;
}

interface PortfolioSectionProps {
    elementId?: string;
    colors?: string;
    posts?: Post[];
    maxItems?: number;
    viewAllUrl?: string;
    viewAllLabel?: string;
    styles?: any;
    enableAnnotations?: boolean;
}

export default function PortfolioSection(props: PortfolioSectionProps) {
    const {
        elementId,
        colors,
        posts = [],
        maxItems = 5,
        viewAllUrl = '/project',
        viewAllLabel = 'View All Projects',
        styles = {},
        enableAnnotations
    } = props;

    const displayedPosts = posts.slice(0, maxItems);
    const hasMorePosts = posts.length > maxItems;

    return (
        <Section
            elementId={elementId}
            className="sb-component-portfolio-section py-16 md:py-24"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            {/* Aurora fade continuation from hero */}
            <div className="aurora-fade absolute top-0 left-0 right-0 h-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Pinterest-style Masonry Grid */}
                <div
                    className="portfolio-masonry-grid"
                    {...(enableAnnotations && { 'data-sb-field-path': '.posts' })}
                >
                    {displayedPosts.map((post, index) => (
                        <PortfolioCard
                            key={index}
                            post={post}
                        />
                    ))}

                    {/* Exploration Card */}
                    <div className="portfolio-card-wrapper mb-5">
                        <Link href="/project/exploration" className="block">
                            <div className="portfolio-card-fm bg-white">
                                <div className="p-3 pb-0">
                                    <div className="portfolio-card-image-wrap relative overflow-hidden rounded-xl bg-gray-50 aspect-[3/4] flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 hover:border-gray-400 hover:scale-105">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-gray-500"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 pt-3 flex items-center justify-center">
                                    <h3 className="font-inter font-semibold text-base text-gray-900">
                                        Other Exploration
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* View All Button */}
                {hasMorePosts && (
                    <div className="flex justify-center mt-16">
                        <Link
                            href={viewAllUrl}
                            className="view-all-button"
                        >
                            {viewAllLabel}
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                )}

                {/* Empty State */}
                {displayedPosts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">No projects found.</p>
                    </div>
                )}
            </div>
        </Section>
    );
}
