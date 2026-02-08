import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function Footer(props) {
    const {
        copyrightText,
        styles = {},
        enableAnnotations
    } = props;

    const currentYear = new Date().getFullYear();
    const defaultCopyright = `© ${currentYear} Satrio Indrajit Arroisi`;

    return (
        <footer
            className={classNames(
                'sb-component',
                'sb-component-footer',
                'py-8',
                'bg-white',
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className="container mx-auto px-6 text-center">
                {/* Copyright only - no border, no social icons */}
                <p className="text-gray-400 text-sm">
                    {copyrightText || defaultCopyright}
                </p>
            </div>
        </footer>
    );
}
