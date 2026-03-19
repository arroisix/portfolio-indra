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
            url: '/images/project/6/Frame-2147236739.webp',
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
                            <div
                                className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                style={{ isolation: 'isolate' }}
                            >
                                {/* Image container */}
                                {post.featuredImage?.url && (
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        {/* Normal image */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={post.featuredImage.url}
                                            alt={post.featuredImage.altText || post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Blurred image - smooth in, instant out */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={post.featuredImage.url}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover scale-110 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-300"
                                            style={{ filter: 'blur(20px)' }}
                                        />
                                        {/* Dark tint - smooth in, instant out */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 group-hover:transition-colors group-hover:duration-300" />
                                    </div>
                                )}

                                {/* Bottom blur with gradient mask - always visible */}
                                <div
                                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                                    style={{
                                        height: '50%',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)',
                                    }}
                                />

                                {/* Dark gradient overlay */}
                                <div
                                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                                    style={{
                                        height: '50%',
                                        background: 'linear-gradient(180deg, rgba(16, 16, 16, 0) 0%, rgba(16, 16, 16, 0.5) 40%, rgba(16, 16, 16, 0.7) 100%)',
                                    }}
                                />

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end items-start gap-1 p-4">
                                    <h3 className="font-epilogue text-card-title text-white group-hover:text-gray-200 transition-colors">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="font-epilogue text-sm text-white/80 line-clamp-2">
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
