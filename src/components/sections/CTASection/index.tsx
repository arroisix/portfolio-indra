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
    const emailSubject = encodeURIComponent("I'd like to request access to case studies!");
    const emailBody = encodeURIComponent(`Hi Indra,

I came across your portfolio and I'm interested in viewing your case studies and CV.

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
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16">
                {/* Container with border and gradient */}
                <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/50 p-6 md:p-16 overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-50/30 via-transparent to-blue-50/30 pointer-events-none" />

                    <div className="relative flex flex-col items-center text-center">
                        {/* Overlapping Images with Bouncy Folder Animation - Portrait orientation */}
                        <div
                            className="cta-image-group relative w-[450px] h-[340px] mb-6 md:mb-8 cursor-pointer"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Emoji Effects - 4 emojis spread around */}
                            {/* Emoji 1 - Top Left ✨ */}
                            <span
                                className="absolute z-20 text-lg pointer-events-none transition-all duration-500"
                                style={{
                                    top: isHovered ? '-8%' : '5%',
                                    left: isHovered ? '-5%' : '5%',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'scale(1)' : 'scale(0.3)',
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                ✨
                            </span>

                            {/* Emoji 2 - Top Right 🌙 */}
                            <span
                                className="absolute z-20 text-2xl pointer-events-none transition-all duration-500 delay-75"
                                style={{
                                    top: isHovered ? '-10%' : '0%',
                                    right: isHovered ? '-8%' : '3%',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'scale(1)' : 'scale(0.3)',
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                🌙
                            </span>

                            {/* Emoji 3 - Bottom Left 🍉 */}
                            <span
                                className="absolute z-20 text-xl pointer-events-none transition-all duration-500 delay-100"
                                style={{
                                    bottom: isHovered ? '-5%' : '10%',
                                    left: isHovered ? '-8%' : '2%',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'scale(1)' : 'scale(0.3)',
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                🍉
                            </span>

                            {/* Emoji 4 - Bottom Right 🎨 */}
                            <span
                                className="absolute z-20 text-base pointer-events-none transition-all duration-500 delay-150"
                                style={{
                                    bottom: isHovered ? '0%' : '15%',
                                    right: isHovered ? '-5%' : '5%',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'scale(1)' : 'scale(0.3)',
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                🎨
                            </span>

                            {/* Image 1 - Back Left - Gradient */}
                            <div
                                className="absolute rounded-2xl overflow-hidden shadow-lg transition-all duration-500"
                                style={{
                                    width: '144px',
                                    height: '240px',
                                    top: '10%',
                                    left: '8%',
                                    zIndex: 1,
                                    transform: isHovered
                                        ? 'translateX(-35px) rotate(-12deg) scale(1.15)'
                                        : 'translateX(20px) rotate(-6deg) scale(0.95)',
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                <Image
                                    src="/images/gradient.webp"
                                    alt="Gradient UTBK Landing Page"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Image 2 - Middle Center (front) - Bukalapak */}
                            <div
                                className="absolute rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
                                style={{
                                    width: '156px',
                                    height: '264px',
                                    top: '5%',
                                    left: '50%',
                                    zIndex: 2,
                                    transform: isHovered
                                        ? 'translateX(-50%) translateY(-10px) scale(1.2)'
                                        : 'translateX(-50%) scale(1)',
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                <Image
                                    src="/images/bukalapak.webp"
                                    alt="Bukalapak Sebar Promosi Redesign"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Image 3 - Back Right - DailyFriend */}
                            <div
                                className="absolute rounded-2xl overflow-hidden shadow-lg transition-all duration-500"
                                style={{
                                    width: '144px',
                                    height: '240px',
                                    top: '10%',
                                    right: '8%',
                                    zIndex: 1,
                                    transform: isHovered
                                        ? 'translateX(35px) rotate(12deg) scale(1.15)'
                                        : 'translateX(-20px) rotate(6deg) scale(0.95)',
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                <Image
                                    src="/images/dailyfriend.webp"
                                    alt="DailyFriend.AI Story Mode"
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
                                className="group inline-flex items-center text-gray-900 underline underline-offset-4 hover:text-blue-500 transition-colors"
                            >
                                <svg
                                    className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-300 ease-out"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                email me
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
