import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';

interface SocialLink {
    platform: string;
    username: string;
    url: string;
}

interface SocialLinksSectionProps {
    elementId?: string;
    colors?: string;
    styles?: any;
    enableAnnotations?: boolean;
}

const socialLinks: SocialLink[] = [
    {
        platform: 'LinkedIn',
        username: '@arroisi99',
        url: 'https://linkedin.com/in/arroisi99'
    },
    {
        platform: 'GitHub',
        username: '@arroisix',
        url: 'https://github.com/arroisix'
    },
    {
        platform: 'Dribbble',
        username: '@arroisix',
        url: 'https://dribbble.com/arroisix'
    },
    {
        platform: 'Email',
        username: 'arroisi99@gmail.com',
        url: 'mailto:arroisi99@gmail.com'
    }
];

const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
        case 'linkedin':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            );
        case 'github':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            );
        case 'dribbble':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                </svg>
            );
        case 'email':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
            );
        default:
            return null;
    }
};

export default function SocialLinksSection(props: SocialLinksSectionProps) {
    const {
        elementId,
        colors,
        styles = {},
    } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-social-links-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="max-w-2xl mx-auto px-6 py-16">
                <div className="divide-y divide-gray-200">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target={link.platform !== 'Email' ? '_blank' : undefined}
                            rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                            className="flex items-center justify-between py-4 group hover:opacity-70 transition-opacity"
                        >
                            {/* Left: Icon + Platform Name */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-900">
                                    <SocialIcon platform={link.platform} />
                                </span>
                                <span className="text-lg font-medium text-gray-900">
                                    {link.platform}
                                </span>
                            </div>

                            {/* Right: Username */}
                            <span className="text-gray-500">
                                {link.username}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </Section>
    );
}
