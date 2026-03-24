import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Link } from '../../atoms';

interface VibeProject {
    __metadata?: {
        urlPath?: string;
    };
    title?: string;
    excerpt?: string;
    slug?: string;
    featuredImage?: {
        url: string;
        altText?: string;
    };
    workedOn?: string[];
}

interface VibeCodedProjectsSectionProps {
    elementId?: string;
    colors?: string;
    title?: string;
    subtitle?: string;
    posts?: (VibeProject | string)[];
    styles?: any;
    enableAnnotations?: boolean;
}

// Hardcoded project data for vibe coded projects
const VIBE_PROJECTS: Record<string, VibeProject> = {
    'boon-estimator': {
        title: 'Early Estimate Builder',
        excerpt: 'Pre-construction estimating tool with line item management, quantity optimization, and real-time cost calculations.',
        slug: 'project/boon-estimator',
        workedOn: ['Product Design', 'AI Integration', 'Interactive Prototype'],
        featuredImage: {
            url: '/images/project/vibe/boon-estimator-cover.png',
            altText: 'Boon AI Early Estimate Builder'
        },
        __metadata: {
            urlPath: '/project/boon-estimator'
        }
    },
    'harmoni-dashboard': {
        title: 'Harmoni Dashboard',
        excerpt: 'Modern accounting dashboard with Chart of Accounts management, bank connections, and financial reporting.',
        slug: 'project/harmoni-dashboard',
        workedOn: ['Product Design', 'Dashboard UI', 'Interactive Prototype'],
        featuredImage: {
            url: '/images/project/6/exploration-6.webp',
            altText: 'Harmoni Dashboard'
        },
        __metadata: {
            urlPath: '/project/harmoni-dashboard'
        }
    }
};

export default function VibeCodedProjectsSection(props: VibeCodedProjectsSectionProps) {
    const {
        elementId,
        colors,
        title = "Vibe Coded Projects",
        posts = [],
        styles = {},
    } = props;

    // Resolve posts - handle both string references and resolved objects
    const resolvedPosts = posts.map(post => {
        if (typeof post === 'string') {
            const match = post.match(/\/([^/]+)\.md$/);
            const slug = match ? match[1] : '';
            return VIBE_PROJECTS[slug] || { title: slug, __metadata: { urlPath: `/${slug}` } };
        }
        return post;
    });

    if (resolvedPosts.length === 0) return null;

    return (
        <Section
            elementId={elementId}
            className="sb-component-vibe-coded-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="w-full flex flex-col items-center">
                {/* Section Header */}
                <h2 className="font-epilogue text-4xl md:text-5xl font-semibold text-center text-dark mb-4">
                    {title}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium mb-16" style={{ backgroundColor: '#FFF8E6', color: '#B8860B' }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#B8860B' }} />
                    Ongoing Project
                </span>

                {/* Projects Grid */}
                <div className="w-full grid gap-x-work-gap-x gap-y-work-gap-y grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl justify-center items-start">
                    {resolvedPosts.map((post, index) => (
                        <Link
                            key={index}
                            href={post.__metadata?.urlPath || `/${post.slug}` || '#'}
                            className="group block"
                        >
                            <div className="portfolio-card-fm bg-white">
                                {/* Image with padding inside card */}
                                <div className="p-3 pb-0">
                                    <div className="portfolio-card-image-wrap relative overflow-hidden bg-gray-50 aspect-[4/3]">
                                        {post.featuredImage?.url && (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={post.featuredImage.url}
                                                alt={post.featuredImage.altText || post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 pt-3">
                                    <h3 className="font-inter font-semibold text-base text-gray-900">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="font-inter text-sm text-gray-500 mt-1 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    );
}
