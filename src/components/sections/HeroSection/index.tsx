import Image from 'next/image';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';
interface HeroSectionProps {
    elementId?: string;
    colors?: string;
    title?: string;
    subtitle?: string;
    avatarImage?: string;
    styles?: any;
    enableAnnotations?: boolean;
}

export default function HeroSection(props: HeroSectionProps) {
    const {
        elementId,
        colors,
        title = "Visual and Product Designer",
        subtitle = "Hi, I'm <b>Indra</b>. I design products by reducing noise, aligning teams, and turning messy problems into clear, shippable interfaces.",
        avatarImage = "/images/avatar.webp",
        styles = {},
    } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-hero-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
                {/* Aurora Background - fades out after 3 seconds, extends below hero */}
                <div className="aurora-bg absolute inset-x-0 -top-20 -bottom-40 pointer-events-none" />

                {/* Content - shifted down, more on mobile to avoid header collision */}
                <div className="relative z-10 text-center max-w-4xl mt-[15vh] md:mt-[10vh]">
                    {/* Avatar */}
                    {avatarImage && (
                        <div className="mb-6 flex justify-center">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <Image
                                    src={avatarImage}
                                    alt="Indra"
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    <h1 className="font-inter text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed [&>b]:text-gray-900 [&>b]:font-semibold"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}
                </div>
            </div>
        </Section>
    );
}
