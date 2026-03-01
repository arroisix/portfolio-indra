import * as React from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import TitleBlock from '../../blocks/TitleBlock';
import Link from '../../atoms/Link';

interface TimelineItem {
    date: string;
    title: string;
    subtitle?: string;
    description?: string;
    tags?: string[];
    logo?: string;
}

interface BackButton {
    label: string;
    url: string;
}

interface TimelineSectionProps {
    elementId?: string;
    colors?: string;
    backgroundImage?: any;
    title?: any;
    subtitle?: string;
    items?: TimelineItem[];
    backButton?: BackButton;
    styles?: any;
    enableAnnotations?: boolean;
}

export default function TimelineSection(props: TimelineSectionProps) {
    const { elementId, colors, backgroundImage, title, subtitle, items = [], backButton, styles = {}, enableAnnotations } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-timeline-section"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className={classNames('w-full', 'flex', 'flex-col', mapStyles({ alignItems: styles?.self?.justifyContent ?? 'flex-start' }))}>
                {/* Back Button - same style as blog */}
                {backButton && (
                    <div className="w-full max-w-sectionBody mb-8">
                        <Link href={backButton.url} className="back-to-work-btn">
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
                            <span>{backButton.label}</span>
                        </Link>
                    </div>
                )}

                {title && title.text && (
                    <TitleBlock
                        {...title}
                        className={classNames('w-full', 'max-w-sectionBody')}
                        {...(enableAnnotations && { 'data-sb-field-path': '.title' })}
                    />
                )}
                {subtitle && (
                    <p
                        className={classNames(
                            'w-full',
                            'max-w-sectionBody',
                            'text-lg',
                            'sm:text-xl',
                            'opacity-70',
                            'text-center',
                            { 'mt-4': title?.text }
                        )}
                        {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}
                    >
                        {subtitle}
                    </p>
                )}
                {items.length > 0 && (
                    <div
                        className={classNames('timeline-container', 'w-full', 'max-w-sectionBody', { 'mt-16': title?.text || subtitle, 'mt-4': !title?.text && !subtitle })}
                        {...(enableAnnotations && { 'data-sb-field-path': '.items' })}
                    >
                        {items.map((item, index) => (
                            <TimelineItemComponent
                                key={index}
                                item={item}
                                index={index}
                                isLast={index === items.length - 1}
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
}

function TimelineItemComponent({ item, index, isLast }: { item: TimelineItem; index: number; isLast: boolean }) {
    return (
        <div className={classNames('timeline-item', 'relative', 'flex', 'gap-5', { 'pb-12 md:pb-14': !isLast })}>
            {/* Timeline line and logo/dot */}
            <div className="timeline-marker flex flex-col items-center flex-shrink-0 w-12 md:w-14">
                {/* Logo or dot */}
                {item.logo ? (
                    <div className="timeline-logo w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden z-10 border border-gray-100">
                        <img
                            src={item.logo}
                            alt={item.subtitle || 'Company logo'}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ) : (
                    <div className="timeline-dot w-4 h-4 rounded-full bg-primary border-4 border-neutral z-10 flex-shrink-0" />
                )}
                {/* Connecting line */}
                {!isLast && (
                    <div className="timeline-line w-0.5 flex-grow bg-gray-200 mt-4" />
                )}
            </div>

            {/* Content */}
            <div className="timeline-content flex-grow pb-2 -mt-1">
                {/* Date */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="timeline-date inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 uppercase tracking-wide">
                        {item.date}
                    </div>
                </div>

                {/* Title */}
                <h3 className="timeline-title text-xl md:text-2xl font-bold mb-1">
                    {item.title}
                </h3>

                {/* Subtitle (Company name) */}
                {item.subtitle && (
                    <p className="timeline-subtitle text-base font-medium text-gray-500 mb-3">
                        {item.subtitle}
                    </p>
                )}

                {/* Description */}
                {item.description && (
                    <p className="timeline-description text-base leading-relaxed text-gray-600">
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
}
