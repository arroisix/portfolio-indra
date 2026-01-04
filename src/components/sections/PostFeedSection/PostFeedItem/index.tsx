import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { mapStylesToClassNames as mapStyles } from '../../../../utils/map-styles-to-class-names';
import { getPageUrl } from '../../../../utils/page-utils';
import Link from '../../../atoms/Link';
import ImageBlock from '../../../blocks/ImageBlock';

export default function PostFeedItem(props) {
    const {
        post,
        showThumbnail,
        showExcerpt,
        showDate,
        showAuthor,
        hasSectionTitle,
        hasBigThumbnail,
        hoverEffect = 'move-up',
        sectionColors,
        hasAnnotations
    } = props;
    const TitleTag = hasSectionTitle ? 'h3' : 'h2';
    const flexDirection = post.styles?.self?.flexDirection ?? 'col';
    const hasThumbnail = !!(showThumbnail && post.featuredImage?.url);
    const isSpreadEffect = hoverEffect === 'spread';

    return (
        <Link
            href={getPageUrl(post)}
            className={classNames(
                'sb-card',
                'flex',
                'justify-center',
                isSpreadEffect ? 'items-start' : 'items-center',
                isSpreadEffect ? 'bg-transparent' : (post.colors ?? 'bg-light-fg-dark'),
                post.styles?.self?.margin ? mapStyles({ margin: post.styles?.self?.margin }) : undefined,
                post.styles?.self?.padding && !isSpreadEffect ? mapStyles({ padding: post.styles?.self?.padding }) : undefined,
                post.styles?.self?.borderWidth && post.styles?.self?.borderWidth !== 0 && post.styles?.self?.borderStyle !== 'none' && !isSpreadEffect
                    ? mapStyles({
                          borderWidth: post.styles?.self?.borderWidth,
                          borderStyle: post.styles?.self?.borderStyle,
                          borderColor: post.styles?.self?.borderColor ?? 'border-primary'
                      })
                    : undefined,
                post.styles?.self?.borderRadius && !isSpreadEffect ? mapStyles({ borderRadius: post.styles?.self?.borderRadius }) : undefined,
                post.styles?.self?.textAlign ? mapStyles({ textAlign: post.styles?.self?.textAlign }) : undefined,
                isSpreadEffect ? '' : 'overflow-hidden',
                mapCardHoverStyles(hoverEffect, sectionColors)
            )}
            {...(hasAnnotations && { 'data-sb-object-id': post.__metadata?.id })}
        >
            <div className={classNames('w-full', 'flex', mapFlexDirectionStyles(flexDirection, hasThumbnail), isSpreadEffect ? 'gap-0' : 'gap-6')}>
                {hasThumbnail && isSpreadEffect ? (
                    <div className="folder-container">
                        {/* Background images that peek out */}
                        <div className="folder-bg-image folder-bg-1">
                            <ImageBlock
                                {...post.featuredImage}
                                imageClassName="w-full h-full object-cover"
                            />
                        </div>
                        <div className="folder-bg-image folder-bg-2">
                            <ImageBlock
                                {...(post.secondaryImage?.url ? post.secondaryImage : post.featuredImage)}
                                imageClassName="w-full h-full object-cover"
                            />
                        </div>
                        {/* Folder in front - single element with clip-path */}
                        <div className="folder-shape"></div>
                    </div>
                ) : hasThumbnail ? (
                    <ImageBlock
                        {...post.featuredImage}
                        className={classNames({
                            'xs:w-[50%] xs:shrink-0': hasBigThumbnail && (flexDirection === 'row' || flexDirection === 'row-reverse'),
                            'xs:w-[28.4%] xs:shrink-0': !hasBigThumbnail && (flexDirection === 'row' || flexDirection === 'row-reverse')
                        })}
                        imageClassName="w-full h-full object-cover"
                        {...(hasAnnotations && { 'data-sb-field-path': 'featuredImage' })}
                    />
                ) : null}
                <div
                    className={classNames('w-full', 'flex', 'flex-col', 'gap-2.5', {
                        'xs:grow': hasThumbnail && (flexDirection === 'row' || flexDirection === 'row-reverse'),
                        'items-center': flexDirection === 'col' && post.styles?.self?.textAlign === 'center',
                        'text-center': flexDirection === 'col' && post.styles?.self?.textAlign === 'center',
                        'mt-4': isSpreadEffect
                    })}
                >
                    <TitleTag className="font-epilogue text-card-title text-dark">
                        <span
                            className={classNames(mapCardTitleHoverStyles(hoverEffect, post.colors))}
                            {...(hasAnnotations && { 'data-sb-field-path': 'title' })}
                        >
                            {post.title}
                        </span>
                    </TitleTag>
                    {showExcerpt && post.excerpt && (
                        <p className="font-epilogue text-body text-dark" {...(hasAnnotations && { 'data-sb-field-path': 'excerpt' })}>
                            {post.excerpt}
                        </p>
                    )}
                    <PostAttribution
                        showAuthor={showAuthor}
                        showDate={showDate}
                        date={post.date}
                        author={post.author}
                        className="mt-3"
                        hasAnnotations={hasAnnotations}
                    />
                </div>
            </div>
        </Link>
    );
}

function PostAttribution({ showDate, showAuthor, date, author, className = '', hasAnnotations }) {
    if (!showDate && !(showAuthor && author)) {
        return null;
    }
    return (
        <div className={classNames('text-sm', 'uppercase', className)}>
            {showAuthor && author && (
                <>
                    <span {...(hasAnnotations && { 'data-sb-field-path': 'author' })}>
                        <span {...(hasAnnotations && { 'data-sb-field-path': '.name' })}>{author.name}</span>
                    </span>
                    {showDate && <span className="mx-2">|</span>}
                </>
            )}
            {showDate && (
                <time dateTime={dayjs(date).format('YYYY-MM-DD HH:mm:ss')} {...(hasAnnotations && { 'data-sb-field-path': 'date' })}>
                    {dayjs(date).format('YYYY-MM-DD')}
                </time>
            )}
        </div>
    );
}

function mapFlexDirectionStyles(flexDirection: string, hasThumbnail: boolean) {
    switch (flexDirection) {
        case 'row':
            return hasThumbnail ? 'flex-col xs:flex-row xs:items-stretch' : 'flex-col';
        case 'row-reverse':
            return hasThumbnail ? 'flex-col xs:flex-row-reverse xs:items-stretch' : 'flex-col';
        case 'col':
            return 'flex-col';
        case 'col-reverse':
            return 'flex-col-reverse';
        default:
            return null;
    }
}

function mapCardHoverStyles(hoverEffect: string, colors: string) {
    switch (hoverEffect) {
        case 'thin-underline':
        case 'thick-underline':
            return 'group';
        case 'move-up':
            return 'transition duration-200 ease-in hover:-translate-y-1.5';
        case 'shadow':
            return colors === 'bg-dark-fg-light'
                ? 'transition duration-200 ease-in hover:shadow-2xl hover:shadow-black/60'
                : 'transition duration-200 ease-in hover:shadow-2xl';
        case 'shadow-plus-move-up':
            return colors === 'bg-dark-fg-light'
                ? 'transition duration-200 ease-in hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1.5'
                : 'transition duration-200 ease-in hover:shadow-2xl hover:-translate-y-1.5';
        case 'spread':
            return 'card-spread-effect';
        default:
            return null;
    }
}

function mapCardTitleHoverStyles(hoverEffect: string, colors: string) {
    switch (hoverEffect) {
        case 'thin-underline':
            return colors === 'bg-dark-fg-light'
                ? 'bg-left-bottom bg-[length:0_1px] bg-no-repeat bg-gradient-to-r from-light to-light transition-[background-size] duration-300 ease-in-out group-hover:bg-[length:100%_1px]'
                : 'bg-left-bottom bg-[length:0_1px] bg-no-repeat bg-gradient-to-r from-dark to-dark transition-[background-size] duration-300 ease-in-out group-hover:bg-[length:100%_1px]';
        case 'thick-underline':
            return colors === 'bg-dark-fg-light'
                ? 'bg-left-bottom bg-[length:0_50%] bg-no-repeat bg-gradient-to-r from-light/30 to-light/30 transition-[background-size] duration-300 ease-in-out group-hover:bg-[length:100%_50%]'
                : 'bg-left-bottom bg-[length:0_50%] bg-no-repeat bg-gradient-to-r from-dark/20 to-dark/20 transition-[background-size] duration-300 ease-in-out group-hover:bg-[length:100%_50%]';
        default:
            return null;
    }
}
