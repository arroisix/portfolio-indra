import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';

interface HeroSectionProps {
    elementId?: string;
    colors?: string;
    backgroundImage?: {
        url: string;
        altText?: string;
    };
    backgroundImageMobile?: {
        url: string;
        altText?: string;
    };
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    textPosition?: 'left' | 'center' | 'right';
    textVerticalPosition?: 'top' | 'center' | 'bottom';
    styles?: any;
    enableAnnotations?: boolean;
}

export default function HeroSection(props: HeroSectionProps) {
    const {
        elementId,
        colors,
        backgroundImage,
        backgroundImageMobile,
        title = "Hello, I'm",
        titleHighlight = "Indra.",
        subtitle,
        textPosition = 'left',
        textVerticalPosition = 'bottom',
        styles = {},
    } = props;

    const [isLoading, setIsLoading] = useState(true);

    return (
        <Section
            elementId={elementId}
            className="sb-component-hero-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="hero-container relative w-full">
                {/* Centered Image Container */}
                <div className="hero-image-wrapper">
                    {backgroundImage?.url && (
                        <div className="hero-image-container">
                            {isLoading && (
                                <div className="absolute inset-0 skeleton-loading" />
                            )}
                            <Image
                                src={backgroundImage.url}
                                alt={backgroundImage.altText || 'Hero image'}
                                width={1200}
                                height={1200}
                                priority
                                className={classNames(
                                    'hero-image transition-opacity duration-500',
                                    isLoading ? 'opacity-0' : 'opacity-100'
                                )}
                                onLoad={() => setIsLoading(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Text Overlay */}
                <div className="hero-text-wrapper">
                    <div className="hero-text-container">
                        <h1 className="hero-title font-epilogue">
                            <span className="font-extralight">{title}</span>
                            <br />
                            <span className="font-extrabold italic">{titleHighlight}</span>
                        </h1>
                        {subtitle && (
                            <p className="hero-subtitle font-epilogue mt-4">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}
