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
            url: '/images/project/vibe/boon-estimator-cover.png',
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
            className="sb-component-vibe-coded-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="w-full flex flex-col items-center">
                {/* Section Header */}
                <h2 className="font-epilogue text-4xl md:text-5xl font-semibold text-center text-dark mb-16">
                    {title}
                </h2>

                {/* Projects Grid - Match PostFeedSection grid */}
                <div className="w-full grid gap-x-work-gap-x gap-y-work-gap-y grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl justify-center items-start">
                    {resolvedPosts.map((post, index) => (
                        <Link
                            key={index}
                            href={post.__metadata?.urlPath || `/${post.slug}` || '#'}
                            className="sb-card flex justify-center items-start bg-transparent card-spread-effect"
                        >
                            <div className="w-full flex flex-col gap-0">
                                {/* Folder container with spread effect */}
                                {post.featuredImage?.url && (
                                    <div className="folder-container">
                                        <div className="folder-back"></div>
                                        <div className="folder-bg-image folder-bg-1">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={post.featuredImage.url}
                                                alt={post.featuredImage.altText || post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="folder-bg-image folder-bg-2">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={post.featuredImage.url}
                                                alt={post.featuredImage.altText || post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="folder-shape"></div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="w-full flex flex-col gap-2.5 mt-4">
                                    <h3 className="font-epilogue text-card-title text-dark">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="font-epilogue text-body text-dark">
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
