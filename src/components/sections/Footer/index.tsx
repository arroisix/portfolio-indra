import * as React from 'react';
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

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            className={classNames(
                'sb-component',
                'sb-component-footer',
                colors,
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'px-25 pb-[70px] pt-0'
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className="mx-auto max-w-7xl">
                <div className="border-t-2 border-black/20 pt-[70px] px-[40px]">
                    <div className="grid md:grid-cols-2 gap-[190px]">
                        {(title || text) && (
                            <div className="flex flex-col gap-[60px]">
                                <div className="flex flex-col gap-[40px]">
                                    {title && (
                                        <h2 className="font-epilogue font-semibold text-[32px] leading-[42px] text-[#2d2d2d]" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                                            {title}
                                        </h2>
                                    )}
                                    {text && (
                                        <Markdown
                                            options={{ forceBlock: true, forceWrapper: true }}
                                            className={classNames('sb-markdown', 'font-epilogue font-normal text-[17px] leading-[27px] text-[#2d2d2d]')}
                                            {...(enableAnnotations && { 'data-sb-field-path': 'text' })}
                                        >
                                            {text}
                                        </Markdown>
                                    )}
                                </div>
                                {socialLinks.length > 0 && (
                                    <div className="flex items-center" {...(enableAnnotations && { 'data-sb-field-path': 'socialLinks' })}>
                                        {socialLinks.map((link, index) => (
                                            <div key={index} className="w-9 h-9">
                                                <Social {...link} {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex flex-col gap-[40px]">
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        required
                                        className="w-full px-[30px] py-[21px] font-epilogue font-normal text-[17px] leading-[27px] text-[#2d2d2d] bg-[#f3f3f3] border-0 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        required
                                        className="w-full px-[30px] py-[21px] font-epilogue font-normal text-[17px] leading-[27px] text-[#2d2d2d] bg-[#f3f3f3] border-0 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Type your message here"
                                        required
                                        rows={7}
                                        className="w-full px-[30px] py-[21px] font-epilogue font-normal text-[17px] leading-[27px] text-[#2d2d2d] bg-[#f3f3f3] border-0 focus:outline-none resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#2d2d2d] text-white font-epilogue font-semibold text-[20px] leading-[30px] px-[82px] py-[25px] w-fit"
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
