import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Link, Action } from '../../atoms';
import ImageBlock from '../../blocks/ImageBlock';
import ChevronDownIcon from '../../svgs/chevron-down';
import CloseIcon from '../../svgs/close';
import MenuIcon from '../../svgs/menu';

export default function Header(props) {
    const { colors = 'bg-light-fg-dark', styles = {}, enableAnnotations } = props;
    return (
        <header
            className={classNames(
                'sb-component',
                'sb-component-header',
                colors,
                'fixed',
                'top-0',
                'left-1/2',
                '-translate-x-1/2',
                'backdrop-blur-[22px]',
                'header-glass',
                'rounded-b-2xl',
                'max-w-[1280px]',
                'w-full',
                'h-20',
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                'z-50'
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className={classNames(
                'mx-auto',
                'max-w-7xl',
                'h-full',
                'flex',
                'items-center',
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'pl-[40px] pr-[24px]'
            )}>
                <Link href="#main" className="sr-only">
                    Skip to main content
                </Link>
                <HeaderVariants {...props} />
            </div>
        </header>
    );
}

function HeaderVariants(props) {
    const { variant = 'logo-left-primary-nav-left', ...rest } = props;
    switch (variant) {
        case 'logo-left-primary-nav-centered':
            return <HeaderLogoLeftPrimaryCentered {...rest} />;
        case 'logo-left-primary-nav-right':
            return <HeaderLogoLeftPrimaryRight {...rest} />;
        case 'logo-centered-primary-nav-left':
            return <HeaderLogoCenteredPrimaryLeft {...rest} />;
        case 'logo-centered-primary-nav-centered':
            return <HeaderLogoCenteredPrimaryCentered {...rest} />;
        default:
            return <HeaderLogoLeftPrimaryLeft {...rest} />;
    }
}

function HeaderLogoLeftPrimaryLeft(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations } = props;
    return (
        <div className="relative flex items-center w-full">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden mr-10 gap-x-10 lg:flex lg:items-center" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            <div className="hidden ml-auto lg:flex lg:items-center gap-x-4">
                {secondaryLinks.length > 0 && (
                    <ul className="flex gap-x-2.5 items-center" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                )}
            </div>
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoLeftPrimaryCentered(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations } = props;
    return (
        <div className="relative flex items-center w-full">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul
                    className="absolute hidden w-auto -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center gap-x-10 left-1/2 top-1/2"
                    {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}
                >
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            <div className="hidden ml-auto lg:flex lg:items-center gap-x-4">
                {secondaryLinks.length > 0 && (
                    <ul className="flex items-center gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                )}
            </div>
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoLeftPrimaryRight(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations } = props;
    return (
        <div className="relative flex items-center justify-start w-full">
            {(title || logo?.url) && (
                <div className="absolute left-0">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden ml-auto lg:flex lg:items-center gap-x-10 absolute right-0" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            <div className="absolute right-0 hidden lg:flex lg:items-center gap-x-4">
                {secondaryLinks.length > 0 && (
                    <ul
                        className={classNames('flex', 'items-center', 'gap-x-2.5')}
                        {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}
                    >
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                )}
            </div>
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoCenteredPrimaryLeft(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations } = props;
    return (
        <div className="relative flex items-center w-full">
            {(title || logo?.url) && (
                <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden lg:flex lg:items-center gap-x-10" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            <div className="hidden ml-auto lg:flex lg:items-center gap-x-4">
                {secondaryLinks.length > 0 && (
                    <ul className="flex items-center gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                )}
            </div>
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoCenteredPrimaryCentered(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations } = props;
    return (
        <>
            <div className="relative flex items-center w-full">
                {(title || logo?.url) && (
                    <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
                        <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                    </div>
                )}
                <div className="hidden ml-auto lg:flex lg:items-center gap-x-4">
                    {secondaryLinks.length > 0 && (
                        <ul className="flex items-center gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                            <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                        </ul>
                    )}
                </div>
                {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
            </div>
            {primaryLinks.length > 0 && (
                <ul
                    className="hidden mt-4 lg:flex lg:items-center lg:justify-center gap-x-10"
                    {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}
                >
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
        </>
    );
}

function MobileMenu(props) {
    const { primaryLinks = [], secondaryLinks = [] } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        setIsDark(document.documentElement.classList.contains('dark'));

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
            setIsClosing(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsMenuOpen(false);
                setIsClosing(false);
                document.body.style.overflow = 'unset';
            }, 300);
        } else {
            setIsMenuOpen(true);
            setIsClosing(false);
            document.body.style.overflow = 'hidden';
        }
    };

    const handleLinkClick = (href: string) => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsClosing(false);
            document.body.style.overflow = 'unset';
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    const menuOverlay = (isMenuOpen || isClosing) && mounted ? createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9998,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                opacity: isClosing ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
            }}
        >
            {/* Close button with morph animation */}
            <button
                onClick={toggleMenu}
                aria-label="Close Menu"
                style={{
                    position: 'absolute',
                    top: '18px',
                    right: '40px',
                    padding: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 9999,
                    opacity: isClosing ? 0 : 1,
                    transform: isClosing ? 'scale(0.8) rotate(-90deg)' : 'scale(1) rotate(0deg)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
            >
                <div style={{ width: '24px', height: '24px', position: 'relative' }}>
                    {/* Line 1 - rotates to form X */}
                    <span
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            height: '2px',
                            backgroundColor: isDark ? '#ffffff' : '#1a1a1a',
                            top: '11px',
                            transform: 'rotate(45deg)',
                            transformOrigin: 'center',
                        }}
                    />
                    {/* Line 2 - rotates to form X */}
                    <span
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            height: '2px',
                            backgroundColor: isDark ? '#ffffff' : '#1a1a1a',
                            top: '11px',
                            transform: 'rotate(-45deg)',
                            transformOrigin: 'center',
                        }}
                    />
                </div>
            </button>
            <nav
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '32px',
                    opacity: isClosing ? 0 : 1,
                    transform: isClosing ? 'translateY(-20px)' : 'translateY(0)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
            >
                {primaryLinks.map((link, index) => {
                    const isHashLink = link.url?.startsWith('#');
                    const isMailto = link.url?.startsWith('mailto:');

                    if (isHashLink) {
                        return (
                            <button
                                key={index}
                                onClick={() => handleLinkClick(link.url)}
                                style={{
                                    fontFamily: 'Epilogue, sans-serif',
                                    fontSize: '36px',
                                    fontWeight: 600,
                                    color: isDark ? '#ffffff' : '#1a1a1a',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {link.label}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            style={{
                                fontFamily: 'Epilogue, sans-serif',
                                fontSize: '36px',
                                fontWeight: 600,
                                color: isDark ? '#ffffff' : '#1a1a1a',
                                textDecoration: 'none',
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </div>,
        document.body
    ) : null;

    return (
        <div className="ml-auto lg:hidden flex items-center">
            {/* Hamburger button - only visible when menu is closed */}
            <button
                aria-label="Open Menu"
                className="p-2 focus:outline-none relative w-10 h-10"
                onClick={toggleMenu}
                style={{
                    opacity: isMenuOpen ? 0 : 1,
                    pointerEvents: isMenuOpen ? 'none' : 'auto',
                    transition: 'opacity 0.2s ease',
                }}
            >
                <span className="sr-only">Open Menu</span>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '24px',
                        height: '18px',
                    }}
                >
                    <span style={{ position: 'absolute', left: 0, top: '0px', width: '100%', height: '2px', backgroundColor: 'currentColor' }} />
                    <span style={{ position: 'absolute', left: 0, top: '8px', width: '100%', height: '2px', backgroundColor: 'currentColor' }} />
                    <span style={{ position: 'absolute', left: 0, top: '16px', width: '100%', height: '2px', backgroundColor: 'currentColor' }} />
                </div>
            </button>
            {menuOverlay}
        </div>
    );
}

function SiteLogoLink({ title, logo, enableAnnotations }) {
    return (
        <Link href="/" className="flex items-center">
            {logo && <ImageBlock {...logo} {...(enableAnnotations && { 'data-sb-field-path': 'logo' })} />}
            {title && (
                <span className="h4" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                    {title}
                </span>
            )}
        </Link>
    );
}

function ListOfLinks(props) {
    const { links = [], colors, enableAnnotations, inMobileMenu = false } = props;

    return (
        <>
            {links.map((link, index) => {
                if (link.__metadata.modelName === 'SubNav') {
                    return (
                        <LinkWithSubnav
                            key={index}
                            link={link}
                            inMobileMenu={inMobileMenu}
                            colors={colors}
                            {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                        />
                    );
                } else {
                    return (
                        <li
                            key={index}
                            className={classNames(inMobileMenu ? 'border-t' : 'py-2', {
                                'py-4': inMobileMenu && link.__metadata.modelName === 'Button'
                            })}
                        >
                            <Action
                                {...link}
                                className={classNames('whitespace-nowrap', inMobileMenu ? 'w-full' : 'text-sm', {
                                    'justify-start py-3': inMobileMenu && link.__metadata.modelName === 'Link'
                                })}
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            />
                        </li>
                    );
                }
            })}
        </>
    );
}

function LinkWithSubnav(props) {
    const { link, colors, inMobileMenu = false } = props;
    const [isSubNavOpen, setIsSubNavOpen] = useState(false);
    const router = useRouter();
    const fieldPath = props['data-sb-field-path'];

    useEffect(() => {
        const handleRouteChange = () => {
            setIsSubNavOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <li
            className={classNames('relative', inMobileMenu ? 'border-t py-3' : 'py-2 group')}
            onMouseLeave={
                !process.env.stackbitPreview && !inMobileMenu
                    ? () => {
                          setIsSubNavOpen(false);
                      }
                    : undefined
            }
            data-sb-field-path={fieldPath}
        >
            <button
                aria-expanded={isSubNavOpen ? 'true' : 'false'}
                onMouseOver={
                    !process.env.stackbitPreview && !inMobileMenu
                        ? () => {
                              setIsSubNavOpen(true);
                          }
                        : undefined
                }
                onClick={() => setIsSubNavOpen((prev) => !prev)}
                className={classNames(
                    'sb-component',
                    'sb-component-block',
                    'sb-component-link',
                    link.labelStyle === 'secondary' ? 'sb-component-link-secondary' : 'sb-component-link-primary',
                    'inline-flex',
                    'items-center',
                    inMobileMenu ? 'w-full' : 'text-sm',
                    {
                        'group-hover:no-underline hover:no-underline': !inMobileMenu && (link.labelStyle ?? 'primary') === 'primary',
                        'group-hover:text-primary': !inMobileMenu && link.labelStyle === 'secondary'
                    }
                )}
            >
                <span {...(fieldPath && { 'data-sb-field-path': '.label' })}>{link.label}</span>
                <ChevronDownIcon
                    className={classNames('fill-current', 'shrink-0', 'h-4', 'w-4', isSubNavOpen && 'rotate-180', inMobileMenu ? 'ml-auto' : 'ml-1')}
                />
            </button>
            {(link.links ?? []).length > 0 && (
                <ul
                    className={classNames(
                        colors,
                        inMobileMenu ? 'p-4 space-y-3' : 'absolute top-full left-0 w-44 border-t border-primary shadow-header z-10 px-6 pt-5 pb-6 space-y-4',
                        isSubNavOpen ? 'block' : 'hidden'
                    )}
                    {...(fieldPath && { 'data-sb-field-path': '.links' })}
                >
                    <ListOfSubNavLinks links={link.links} hasAnnotations={!!fieldPath} inMobileMenu={inMobileMenu} />
                </ul>
            )}
        </li>
    );
}

function ListOfSubNavLinks({ links = [], hasAnnotations, inMobileMenu = false }) {
    return (
        <>
            {links.map((link, index) => (
                <li key={index}>
                    <Action
                        {...link}
                        className={classNames(inMobileMenu ? 'w-full justify-start' : 'text-sm')}
                        {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })}
                    />
                </li>
            ))}
        </>
    );
}
