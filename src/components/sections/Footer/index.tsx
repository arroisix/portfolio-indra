import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Social } from '../../atoms';

export default function Footer(props) {
    const {
        colors = 'bg-light-fg-dark',
        socialLinks = [],
        copyrightText,
        styles = {},
        enableAnnotations
    } = props;

    const currentYear = new Date().getFullYear();
    const defaultCopyright = `© ${currentYear} Indra. All rights reserved.`;

    return (
        <footer
            className={classNames(
                'sb-component',
                'sb-component-footer',
                'py-12',
                'border-t',
                'border-gray-200',
                'bg-white',
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className="container mx-auto px-6 text-center">
                {/* Social Links */}
                {socialLinks.length > 0 && (
                    <div
                        className="flex justify-center gap-4 mb-6"
                        {...(enableAnnotations && { 'data-sb-field-path': 'socialLinks' })}
                    >
                        {socialLinks.map((link, index) => (
                            <Social
                                key={index}
                                {...link}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors"
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            />
                        ))}
                    </div>
                )}

                {/* Copyright */}
                <p className="text-gray-500 text-sm">
                    {copyrightText || defaultCopyright}
                </p>
            </div>
        </footer>
    );
}
