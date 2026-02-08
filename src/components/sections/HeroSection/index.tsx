import classNames from 'classnames';
import Section from '../Section';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Link } from '../../atoms';

interface HeroAction {
    label: string;
    url: string;
    style?: 'primary' | 'secondary';
}

interface HeroSectionProps {
    elementId?: string;
    colors?: string;
    title?: string;
    subtitle?: string;
    actions?: HeroAction[];
    styles?: any;
    enableAnnotations?: boolean;
}

export default function HeroSection(props: HeroSectionProps) {
    const {
        elementId,
        colors,
        title = "Senior Product Designer",
        subtitle = "Crafting intuitive digital experiences through user-centered design and thoughtful interaction patterns.",
        actions = [],
        styles = {},
    } = props;

    // Filter out "Get in touch" style buttons, only show secondary actions like "View work"
    const filteredActions = actions.filter(action => action.style === 'secondary');

    return (
        <Section
            elementId={elementId}
            className="sb-component-hero-section"
            colors={colors}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="text-center max-w-4xl">
                    <h1 className="font-jakarta text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                    {filteredActions.length > 0 && (
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            {filteredActions.map((action, index) => (
                                <HeroButton key={index} action={action} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}

function HeroButton({ action }: { action: HeroAction }) {
    return (
        <Link
            href={action.url}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 border border-gray-300 text-gray-900 hover:bg-gray-50"
        >
            {action.label}
        </Link>
    );
}
