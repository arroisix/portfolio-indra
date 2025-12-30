import * as React from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import TitleBlock from '../../blocks/TitleBlock';
import Link from '../../atoms/Link';

interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    logo?: string;
}

interface ExperienceSectionProps {
    elementId?: string;
    colors?: string;
    backgroundImage?: any;
    title?: any;
    subtitle?: string;
    items?: ExperienceItem[];
    detailUrl?: string;
    detailLabel?: string;
    styles?: any;
    enableAnnotations?: boolean;
}

export default function ExperienceSection(props: ExperienceSectionProps) {
    const {
        elementId,
        colors,
        backgroundImage,
        title,
        subtitle,
        items = [],
        detailUrl = '/experience',
        detailLabel = 'Lihat Detail',
        styles = {},
        enableAnnotations
    } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-experience-section section-experience"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className={classNames('w-full', 'flex', 'flex-col', mapStyles({ alignItems: styles?.self?.justifyContent ?? 'center' }))}>
                {title && (
                    <TitleBlock
                        {...title}
                        className={classNames('w-full', 'max-w-sectionBody', 'text-center', 'mx-auto')}
                        {...(enableAnnotations && { 'data-sb-field-path': '.title' })}
                    />
                )}
                {subtitle && (
                    <p
                        className={classNames(
                            'w-full',
                            'max-w-2xl',
                            'text-lg',
                            'text-center',
                            'mx-auto',
                            'opacity-70',
                            { 'mt-4': title?.text }
                        )}
                        {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}
                    >
                        {subtitle}
                    </p>
                )}
                {items.length > 0 && (
                    <div
                        className={classNames(
                            'grid',
                            'grid-cols-1',
                            'md:grid-cols-2',
                            'lg:grid-cols-3',
                            'gap-8',
                            'w-full',
                            'max-w-6xl',
                            'mx-auto',
                            { 'mt-16': title?.text || subtitle }
                        )}
                        {...(enableAnnotations && { 'data-sb-field-path': '.items' })}
                    >
                        {items.map((item, index) => (
                            <ExperienceCard
                                key={index}
                                item={item}
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            />
                        ))}
                    </div>
                )}

                {/* Single Detail Button */}
                <div className="flex justify-center mt-12">
                    <Link href={detailUrl} className="view-detail-btn">
                        <span>{detailLabel}</span>
                        <svg
                            className="detail-chevron"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </Section>
    );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
    return (
        <div className="experience-card text-center flex flex-col items-center">
            {/* Logo */}
            <div className="experience-card-logo">
                {item.logo ? (
                    <img src={item.logo} alt={`${item.company} logo`} />
                ) : (
                    <span className="text-3xl font-bold opacity-30">
                        {item.company.charAt(0)}
                    </span>
                )}
            </div>

            {/* Company Name */}
            <h3 className="experience-card-title">{item.company}</h3>

            {/* Role */}
            <p className="experience-card-role">{item.role}</p>
        </div>
    );
}
