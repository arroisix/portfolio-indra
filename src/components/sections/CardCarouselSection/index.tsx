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
                            <img
                                src={card.image}
                                alt={card.alt || `Card ${(index % cards.length) + 1}`}
                                className="carousel-card-image"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
