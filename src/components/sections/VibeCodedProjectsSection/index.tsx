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
        excerpt: 'AI-powered pre-construction estimating tool for Boon AI. Features include line item management, AI-assisted quantity optimization, and real-time cost calculations.',
        slug: 'project/boon-estimator',
        workedOn: ['Product Design', 'AI Integration', 'Interactive Prototype'],
        featuredImage: {
            url: '/images/project/vibe/boon-estimator-preview.png',
            altText: 'Boon AI Early Estimate Builder'
        },
        __metadata: {
            urlPath: '/project/boon-estimator'
        }
    }
};

export default function VibeCodedProjectsSection(props: VibeCodedProjectsSectionProps) {
    const {
        elementId,
        colors,
        title = "Vibe Coded Projects",
        subtitle = "Interactive prototypes built with AI-assisted tools",
        posts = [],
        styles = {},
    } = props;

    // Resolve posts - handle both string references and resolved objects
    const resolvedPosts = posts.map(post => {
        if (typeof post === 'string') {
            // Extract slug from path like "content/pages/project/boon-estimator.md"
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
            className="sb-component-vibe-coded-section py-16 md:py-24"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-boon-100 to-boon-200 rounded-full mb-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-boon-600">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                        <span className="text-sm font-medium text-boon-700">AI-Powered</span>
                    </div>
                    <h2 className="font-baskerville italic text-3xl md:text-4xl font-normal text-gray-900 mb-3">
                        {title}
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resolvedPosts.map((post, index) => (
                        <Link
                            key={index}
                            href={post.__metadata?.urlPath || `/${post.slug}` || '#'}
                            className="group block"
                        >
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1">
                                {/* Preview Image / Interactive Badge */}
                                <div className="relative aspect-[16/10] bg-gradient-to-br from-boon-50 to-gray-100 overflow-hidden">
                                    {post.featuredImage?.url ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={post.featuredImage.url}
                                            alt={post.featuredImage.altText || post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-boon-500 to-boon-600 flex items-center justify-center">
                                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                                        <polyline points="14 2 14 8 20 8"/>
                                                        <line x1="16" y1="13" x2="8" y2="13"/>
                                                        <line x1="16" y1="17" x2="8" y2="17"/>
                                                    </svg>
                                                </div>
                                                <span className="text-sm text-gray-500">Interactive Prototype</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Interactive Badge */}
                                    <div className="absolute top-3 right-3">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                                            <span className="text-xs font-medium text-gray-700">Interactive</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-boon-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* Tags */}
                                    {post.workedOn && post.workedOn.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {post.workedOn.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-sm font-medium text-boon-600 group-hover:text-boon-700">
                                            Try it out
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-boon-100 flex items-center justify-center group-hover:bg-boon-200 transition-colors">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-boon-600">
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    );
}
