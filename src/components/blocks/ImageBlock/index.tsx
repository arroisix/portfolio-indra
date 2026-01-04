import * as React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function ImageBlock(props) {
    const { elementId, className, imageClassName, url, altText = '', styles = {} } = props;
    const [isLoading, setIsLoading] = React.useState(true);

    if (!url) {
        return null;
    }
    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath
        ? { 'data-sb-field-path': [fieldPath, `${fieldPath}.url#@src`, `${fieldPath}.altText#@alt`, `${fieldPath}.elementId#@id`].join(' ').trim() }
        : {};

    const imageClasses = classNames(
        imageClassName,
        styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
        styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
            ? mapStyles({
                  borderWidth: styles?.self?.borderWidth,
                  borderStyle: styles?.self?.borderStyle,
                  borderColor: styles?.self?.borderColor ?? 'border-primary'
              })
            : undefined,
        styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined
    );

    const width = styles?.self?.width ? parseInt(styles?.self?.width) || 400 : 400;
    const height = styles?.self?.height ? parseInt(styles?.self?.height) || 400 : 400;

    return (
        <div
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-image-block',
                className,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined
            )}
            {...annotations}
        >
            <div className="relative" style={{ width: imageClassName?.includes('w-full') ? '100%' : styles?.self?.width, height: styles?.self?.height }}>
                {isLoading && (
                    <div className="absolute inset-0 skeleton-loading" style={{ borderRadius: styles?.self?.borderRadius === 'full' ? '9999px' : undefined }} />
                )}
                <Image
                    id={elementId}
                    className={classNames(imageClasses, 'transition-opacity duration-300', isLoading ? 'opacity-0' : 'opacity-100')}
                    style={{
                        width: imageClassName?.includes('w-full') ? '100%' : styles?.self?.width,
                        height: styles?.self?.height,
                        objectFit: 'cover'
                    }}
                    src={url}
                    alt={altText}
                    width={width}
                    height={height}
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
        </div>
    );
}
