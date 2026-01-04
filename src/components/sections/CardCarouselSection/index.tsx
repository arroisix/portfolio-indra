import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';

interface CarouselCard {
    image: string;
    alt?: string;
    shape?: 'portrait' | 'landscape' | 'square';
}

interface CardCarouselSectionProps {
    elementId?: string;
    colors?: string;
    backgroundImage?: any;
    cards?: CarouselCard[];
    styles?: any;
    enableAnnotations?: boolean;
}

function CarouselImage({ src, alt, shape }: { src: string; alt: string; shape: string }) {
    const [isLoading, setIsLoading] = useState(true);

    const dimensions = {
        portrait: { width: 300, height: 400 },
        landscape: { width: 400, height: 300 },
        square: { width: 350, height: 350 },
    };

    const { width, height } = dimensions[shape as keyof typeof dimensions] || dimensions.portrait;

    return (
        <div className="relative w-full h-full">
            {isLoading && (
                <div className="absolute inset-0 skeleton-loading rounded-xl" />
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={classNames(
                    'carousel-card-image transition-opacity duration-300',
                    isLoading ? 'opacity-0' : 'opacity-100'
                )}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}

export default function CardCarouselSection(props: CardCarouselSectionProps) {
    const {
        elementId,
        colors,
        backgroundImage,
        cards = [],
        styles = {},
    } = props;

    // Duplicate cards for seamless infinite scroll
    const duplicatedCards = [...cards, ...cards];

    // Playful rotation patterns
    const getRotation = (index: number) => {
        const patterns = [-3, 2, -1, 3, -2, 1, -2, 3];
        return patterns[index % patterns.length];
    };

    return (
        <Section
            elementId={elementId}
            className="sb-component-card-carousel-section section-card-carousel"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="carousel-container">
                <div className="carousel-track">
                    {duplicatedCards.map((card, index) => (
                        <div
                            key={index}
                            className={classNames(
                                'carousel-card',
                                `card-${card.shape || 'portrait'}`
                            )}
                            style={{
                                '--rotation': `${getRotation(index)}deg`,
                            } as React.CSSProperties}
                        >
                            <CarouselImage
                                src={card.image}
                                alt={card.alt || `Card ${(index % cards.length) + 1}`}
                                shape={card.shape || 'portrait'}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
