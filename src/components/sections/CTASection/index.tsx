'use client';

import { useState } from 'react';
import Image from 'next/image';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Link } from '../../atoms';

interface CTASectionProps {
    elementId?: string;
    colors?: string;
    styles?: any;
    enableAnnotations?: boolean;
}

export default function CTASection(props: CTASectionProps) {
    const {
        elementId,
        colors,
        styles = {},
    } = props;

    const [isHovered, setIsHovered] = useState(false);

    // Generate email link with prefilled subject and body
    const emailSubject = encodeURIComponent("I'd like to get a password for a case study!");
    const emailBody = encodeURIComponent(`Hi Indra,

I came across your portfolio and I'm interested in viewing your case studies.

Could you please share the password?

Thank you!`);
    const emailUrl = `mailto:arroisi99@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    return (
        <Section
            elementId={elementId}
            className="sb-component-cta-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="flex flex-col items-center text-center">
                    {/* Overlapping Images with Folder Animation */}
                    <div
                        className="relative w-64 h-48 mb-10 cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Image 1 - Back Left */}
                        <div
                            className={`absolute w-40 h-28 rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out ${
                                isHovered
                                    ? '-translate-x-16 -rotate-12 scale-100'
                                    : 'translate-x-4 -rotate-6 scale-95'
                            }`}
                            style={{
                                top: '20%',
                                left: '10%',
                                zIndex: 1
                            }}
                        >
                            <Image
                                src="/images/gradient.webp"
                                alt="Case Study Preview 1"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Image 2 - Middle Center */}
                        <div
                            className={`absolute w-40 h-28 rounded-xl overflow-hidden shadow-xl transition-all duration-500 ease-out ${
                                isHovered
                                    ? 'translate-y-2 rotate-0 scale-105'
                                    : 'rotate-0 scale-100'
                            }`}
                            style={{
                                top: '15%',
                                left: '50%',
                                transform: isHovered ? 'translateX(-50%) translateY(8px) scale(1.05)' : 'translateX(-50%) scale(1)',
                                zIndex: 2
                            }}
                        >
                            <Image
                                src="/images/bukalapak.webp"
                                alt="Case Study Preview 2"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Image 3 - Back Right */}
                        <div
                            className={`absolute w-40 h-28 rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out ${
                                isHovered
                                    ? 'translate-x-16 rotate-12 scale-100'
                                    : '-translate-x-4 rotate-6 scale-95'
                            }`}
                            style={{
                                top: '20%',
                                right: '10%',
                                zIndex: 1
                            }}
                        >
                            <Image
                                src="/images/dailyfriend.webp"
                                alt="Case Study Preview 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-lg">
                        For case studies and CV,{' '}
                        <Link
                            href={emailUrl}
                            className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
                        >
                            email me
                        </Link>
                    </p>
                </div>
            </div>
        </Section>
    );
}
