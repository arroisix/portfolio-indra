import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Link } from '../../atoms';

export default function Header(props) {
    const { primaryLinks = [], enableAnnotations } = props;
    return (
        <header
            className={classNames(
                'sb-component',
                'sb-component-header',
                'fixed',
                'top-6',
                'right-8',
                'bg-white/80',
                'backdrop-blur-md',
                'rounded-full',
                'px-6',
                'py-3',
                'border',
                'border-gray-200',
                'z-50',
                'shadow-sm'
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <nav className="flex items-center gap-8">
                <Link href="/" className="font-jakarta font-semibold text-lg text-gray-900">
                    Indra
                </Link>
                {primaryLinks.length > 0 && (
                    <div className="hidden md:flex items-center gap-6">
                        {primaryLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                link={link}
                                enableAnnotations={enableAnnotations}
                                index={index}
                            />
                        ))}
                    </div>
                )}
                {primaryLinks.length > 0 && <MobileMenu {...props} />}
            </nav>
        </header>
    );
}

function NavLink({ link, enableAnnotations, index }) {
    const isHashLink = link.url?.startsWith('#');

    const handleClick = (e: React.MouseEvent) => {
        if (isHashLink) {
            e.preventDefault();
            const element = document.querySelector(link.url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <Link
            href={link.url}
            onClick={isHashLink ? handleClick : undefined}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            {...(enableAnnotations && { 'data-sb-field-path': `.primaryLinks.${index}` })}
        >
            {link.label}
        </Link>
    );
}

function MobileMenu(props) {
    const { primaryLinks = [] } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
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
            if (href.startsWith('#')) {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
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
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                opacity: isClosing ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
            }}
        >
            <button
                onClick={toggleMenu}
                aria-label="Close Menu"
                style={{
                    position: 'absolute',
                    top: '24px',
                    right: '32px',
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
                    <span
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            height: '2px',
                            backgroundColor: '#1a1a1a',
                            top: '11px',
                            transform: 'rotate(45deg)',
                            transformOrigin: 'center',
                        }}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            height: '2px',
                            backgroundColor: '#1a1a1a',
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

                    if (isHashLink) {
                        return (
                            <button
                                key={index}
                                onClick={() => handleLinkClick(link.url)}
                                style={{
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                    fontSize: '32px',
                                    fontWeight: 600,
                                    color: '#1a1a1a',
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
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                                fontSize: '32px',
                                fontWeight: 600,
                                color: '#1a1a1a',
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
        <div className="md:hidden flex items-center">
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
                        width: '20px',
                        height: '14px',
                    }}
                >
                    <span style={{ position: 'absolute', left: 0, top: '0px', width: '100%', height: '2px', backgroundColor: '#1a1a1a' }} />
                    <span style={{ position: 'absolute', left: 0, top: '6px', width: '100%', height: '2px', backgroundColor: '#1a1a1a' }} />
                    <span style={{ position: 'absolute', left: 0, top: '12px', width: '100%', height: '2px', backgroundColor: '#1a1a1a' }} />
                </div>
            </button>
            {menuOverlay}
        </div>
    );
}
