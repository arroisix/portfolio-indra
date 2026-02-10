import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import BackgroundImage from '../../atoms/BackgroundImage';

type SectionVariant = 'default' | 'about-header' | 'skills' | 'work';

export default function Section(props) {
    const { elementId, className, colors = 'bg-light-fg-dark', backgroundImage, styles = {}, children } = props;

    // Determine variant from elementId for backward compatibility
    const variant: SectionVariant =
        elementId === 'about-header' ? 'about-header' :
        elementId === 'skills' ? 'skills' :
        elementId === 'work' ? 'work' : 'default';

    // Check if this is a hero section that needs overflow visible
    const isHeroSection = className?.includes('sb-component-hero-section');

    return (
        <div
            id={elementId}
            className={classNames(
                'sb-component',
                'sb-component-section',
                className,
                colors,
                'relative',
                // Apply variant-specific classes
                variant === 'about-header' && 'section-about-header flex justify-start items-center w-full',
                variant === 'skills' && 'section-skills',
                variant === 'work' && 'section-work',
                // Apply custom styles only if no variant
                variant === 'default' && (styles?.margin ? mapStyles({ margin: styles?.margin }) : undefined),
                variant === 'default' && (styles?.padding ? mapStyles({ padding: styles?.padding }) : 'px-4 py-28')
            )}
            {...getDataAttrs(props)}
        >
            {backgroundImage && <BackgroundImage {...backgroundImage} className="absolute inset-0" />}
            <div
                className={classNames(
                    'w-full',
                    'mx-auto',
                    'relative',
                    variant !== 'about-header' && 'max-w-7xl',
                    variant === 'about-header' && 'flex justify-start items-center w-fit'
                )}
            >
                {children}
            </div>
        </div>
    );
}
