import * as React from 'react';
import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import { getComponent } from '../../components-registry';
import Link from '../../atoms/Link';
import ImageBlock from '../../blocks/ImageBlock';

export default function PostLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { enableAnnotations = true } = site;
    const { title, date, author, excerpt, heroImage, heroImageMobile, markdown_content, bottomSections = [], relatedPosts = [] } = page;
    const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    // Use heroImage if provided, otherwise use a default placeholder
    const desktopImage = heroImage?.url || '/images/hero-placeholder.jpg';
    const mobileImage = heroImageMobile?.url || desktopImage;

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-post-layout">
                {/* Full Viewport Hero Section */}
                <section
                    className="post-hero relative min-h-screen flex flex-col justify-end"
                    style={{
                        '--hero-desktop': `url(${desktopImage})`,
                        '--hero-mobile': `url(${mobileImage})`,
                    } as React.CSSProperties}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                    {/* Hero Content - positioned at bottom, centered */}
                    <div className="relative z-10 px-4 sm:px-8 pb-16 sm:pb-24">
                        <div className="mx-auto max-w-screen-2xl">
                            <header className="max-w-4xl mx-auto text-center">
                                <div className="mb-4 text-sm uppercase tracking-wider text-white/70">
                                    <time dateTime={dateTimeAttr} {...(enableAnnotations && { 'data-sb-field-path': 'date' })}>
                                        {formattedDate}
                                    </time>
                                    {author && (
                                        <>
                                            <span className="mx-2">|</span>
                                            <PostAuthor author={author} enableAnnotations={enableAnnotations} />
                                        </>
                                    )}
                                </div>
                                <h1
                                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                                    {...(enableAnnotations && { 'data-sb-field-path': 'title' })}
                                >
                                    {title}
                                </h1>
                                {excerpt && (
                                    <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                                        {excerpt}
                                    </p>
                                )}
                            </header>
                        </div>
                    </div>
                </section>

                <article className="px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-screen-2xl">
                        {markdown_content && (
                            <Markdown
                                options={{ forceBlock: true }}
                                className="max-w-3xl mx-auto sb-markdown"
                                {...(enableAnnotations && { 'data-sb-field-path': 'markdown_content' })}
                            >
                                {markdown_content}
                            </Markdown>
                        )}
                    </div>
                </article>
                {relatedPosts.length > 0 && (
                    <section className="related-projects-section px-4 py-16 sm:py-20 bg-neutral-fg-dark">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="font-epilogue text-3xl sm:text-4xl font-semibold text-center mb-12">
                                Want to see other projects?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                {relatedPosts.map((post, index) => (
                                    <Link
                                        key={index}
                                        href={post.__metadata?.urlPath}
                                        className="related-project-card group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {post.featuredImage?.url && (
                                            <div className="aspect-square overflow-hidden">
                                                <ImageBlock
                                                    {...post.featuredImage}
                                                    className="w-full h-full"
                                                    imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-5">
                                            <h3 className="font-epilogue text-lg font-semibold group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="mt-2 text-sm opacity-70">{post.excerpt}</p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                {bottomSections.length > 0 && (
                    <div {...(enableAnnotations && { 'data-sb-field-path': 'bottomSections' })}>
                        {bottomSections.map((section, index) => {
                            const Component = getComponent(section.__metadata.modelName);
                            if (!Component) {
                                throw new Error(`no component matching the page section's model name: ${section.__metadata.modelName}`);
                            }
                            return (
                                <Component
                                    key={index}
                                    {...section}
                                    enableAnnotations={enableAnnotations}
                                    {...(enableAnnotations && { 'data-sb-field-path': `bottomSections.${index}` })}
                                />
                            );
                        })}
                    </div>
                )}
            </main>
        </BaseLayout>
    );
}

function PostAuthor({ author, enableAnnotations }) {
    const authorName = author.name && <span {...(enableAnnotations && { 'data-sb-field-path': '.name' })}>{author.name}</span>;
    return author.slug ? (
        <Link {...(enableAnnotations && { 'data-sb-field-path': 'author' })} href={`/blog/author/${author.slug}`}>
            {authorName}
        </Link>
    ) : (
        <span {...(enableAnnotations && { 'data-sb-field-path': 'author' })}>{authorName}</span>
    );
}

/*
function PostCategory({ category, enableAnnotations }) {
    if (!category) {
        return null;
    }
    return (
        <div className="mb-4">
            <Link {...(enableAnnotations && { 'data-sb-field-path': 'category' })} href={category.__metadata?.urlPath}>
                {category.title}
            </Link>
        </div>
    );
}
*/
