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

    const textAlignClass = {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right',
    }[textPosition];

    const verticalAlignClass = {
        top: 'justify-start pt-32',
        center: 'justify-center',
        bottom: 'justify-end pb-16 md:pb-24',
    }[textVerticalPosition];

    return (
        <Section
            elementId={elementId}
            className="sb-component-hero-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="hero-container relative w-full min-h-[80vh] md:min-h-[90vh] overflow-hidden">
                {/* Background Image */}
                {backgroundImage?.url && (
                    <>
                        {/* Desktop Image */}
                        <div className="absolute inset-0 hidden md:block">
                            {isLoading && (
                                <div className="absolute inset-0 skeleton-loading" />
                            )}
                            <Image
                                src={backgroundImage.url}
                                alt={backgroundImage.altText || 'Hero background'}
                                fill
                                priority
                                className={classNames(
                                    'object-cover object-center transition-opacity duration-500',
                                    isLoading ? 'opacity-0' : 'opacity-100'
                                )}
                                onLoad={() => setIsLoading(false)}
                            />
                        </div>
                        {/* Mobile Image */}
                        <div className="absolute inset-0 md:hidden">
                            <Image
                                src={backgroundImageMobile?.url || backgroundImage.url}
                                alt={backgroundImageMobile?.altText || backgroundImage.altText || 'Hero background'}
                                fill
                                priority
                                className="object-cover object-center"
                            />
                        </div>
                    </>
                )}

                {/* Text Overlay */}
                <div
                    className={classNames(
                        'relative z-10 flex flex-col h-full min-h-[80vh] md:min-h-[90vh] px-6 md:px-16 lg:px-24',
                        textAlignClass,
                        verticalAlignClass
                    )}
                >
                    <div className="hero-text-container">
                        <h1 className="hero-title font-epilogue">
                            <span className="font-extralight">{title}</span>
                            {' '}
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
