import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Social, Action } from '../../atoms';

export default function Footer(props) {
    const {
        colors = 'bg-light-fg-dark',
        title,
        text,
        socialLinks = [],
        legalLinks = [],
        copyrightText,
        styles = {},
        enableAnnotations
    } = props;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [shakeFields, setShakeFields] = useState<Record<string, boolean>>({});
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isRevealed) {
                        setIsRevealed(true);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, [isRevealed]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, boolean> = {};
        const newShakeFields: Record<string, boolean> = {};
        let hasErrors = false;

        // Validate required fields
        if (!formData.name.trim()) {
            newErrors.name = true;
            newShakeFields.name = true;
            hasErrors = true;
        }
        if (!formData.email.trim()) {
            newErrors.email = true;
            newShakeFields.email = true;
            hasErrors = true;
        }
        if (!formData.message.trim()) {
            newErrors.message = true;
            newShakeFields.message = true;
            hasErrors = true;
        }

        setErrors(newErrors);
        setShakeFields(newShakeFields);

        if (hasErrors) {
            setTimeout(() => {
                setShakeFields({});
            }, 500);
            return;
        }

        setIsSubmitting(true);
        // Contact form submission logic here
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            alert('Thank you for your message!');
        }, 1000);
    };

    return (
        <footer
            id="contact"
            ref={footerRef}
            className={classNames(
                'sb-component',
                'sb-component-footer',
                'scroll-reveal',
                isRevealed && 'revealed',
                colors,
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'px-25 pb-[70px] pt-0'
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className="mx-auto max-w-7xl">
                <div className="pt-16 md:pt-footer-top px-6 md:px-10">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-footer-gap">
                        {(title || text) && (
                            <div className="flex flex-col items-center md:items-start gap-8 md:gap-16">
                                <div className="flex flex-col items-center md:items-start gap-6 md:gap-10 text-center md:text-left">
                                    {title && (
                                        <h2 className="font-epilogue text-section-title text-dark" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                                            {title}
                                        </h2>
                                    )}
                                    {text && (
                                        <Markdown
                                            options={{ forceBlock: true, forceWrapper: true }}
                                            className={classNames('sb-markdown', 'font-epilogue text-body text-dark')}
                                            {...(enableAnnotations && { 'data-sb-field-path': 'text' })}
                                        >
                                            {text}
                                        </Markdown>
                                    )}
                                </div>
                                {socialLinks.length > 0 && (
                                    <div className="flex items-center justify-center md:justify-start" {...(enableAnnotations && { 'data-sb-field-path': 'socialLinks' })}>
                                        {socialLinks.map((link, index) => (
                                            <div key={index} className="w-9 h-9">
                                                <Social {...link} {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex flex-col gap-10">
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5" noValidate>
                                <div className={shakeFields.name ? 'form-field-error' : ''}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        className={classNames('sb-form-input', errors.name && 'border-2 border-red-400')}
                                    />
                                    {errors.name && <p className="error-message">This field is required</p>}
                                </div>
                                <div className={shakeFields.email ? 'form-field-error' : ''}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className={classNames('sb-form-input', errors.email && 'border-2 border-red-400')}
                                    />
                                    {errors.email && <p className="error-message">This field is required</p>}
                                </div>
                                <div className={shakeFields.message ? 'form-field-error' : ''}>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Type your message here"
                                        rows={7}
                                        className={classNames('sb-form-input resize-none', errors.message && 'border-2 border-red-400')}
                                    />
                                    {errors.message && <p className="error-message">This field is required</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="glow-on-hover mx-auto md:mx-0"
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {(copyrightText || legalLinks.length > 0) && (
                    <div className="sb-footer-bottom border-t pt-8 mt-16 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between">
                        {legalLinks.length > 0 && (
                            <ul className="flex flex-wrap mb-3" {...(enableAnnotations && { 'data-sb-field-path': 'legalLinks' })}>
                                {legalLinks.map((link, index) => (
                                    <li key={index} className="mb-1 mr-6 last:mr-0">
                                        <Action {...link} className="text-sm" {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })} />
                                    </li>
                                ))}
                            </ul>
                        )}
                        {copyrightText && (
                            <Markdown
                                options={{ forceInline: true, forceWrapper: true, wrapper: 'p' }}
                                className={classNames('sb-markdown', 'text-sm', 'mb-4', { 'sm:order-first sm:mr-12': legalLinks.length > 0 })}
                                {...(enableAnnotations && { 'data-sb-field-path': 'copyrightText' })}
                            >
                                {copyrightText}
                            </Markdown>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
}
