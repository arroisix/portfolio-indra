const plugin = require('tailwindcss/plugin');
const themeStyle = require('./content/data/style.json');

module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx}', 
        './content/**/*.{md,json}',
        '!./content/**/*.png',
        '!./.sourcebit-nextjs-cache.json',
        '!./**/.next/**',
        '!./**/node_modules/**'
    ],
    safelist: [
        'text-neutral',
        'text-light',
        {
            pattern: /(m|p)(t|b|l|r)-(0|px|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)/
        },
    ],
    theme: {
        extend: {
            colors: {
                light: themeStyle.light,
                dark: themeStyle.dark,
                neutral: themeStyle.neutral,
                neutralAlt: themeStyle.neutralAlt,
                primary: themeStyle.primary,
                inputBg: '#f3f3f3',
                // Dark mode colors
                darkBg: '#121212',
                darkSurface: '#1e1e1e',
                darkSurfaceAlt: '#2d2d2d',
                darkText: '#e0e0e0',
                darkTextMuted: '#a0a0a0'
            },
            fontFamily: {
                epilogue: ['Epilogue', 'sans-serif']
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700'
            },
            fontSize: {
                'body': ['17px', { lineHeight: '27px' }],
                'card-title': ['20px', { lineHeight: '30px' }],
                'featured-title': ['27px', { lineHeight: '42px' }],
                'section-title': ['32px', { lineHeight: '42px' }],
                'hero-subtitle': ['48px', { lineHeight: '1' }],
                'hero-title': ['64px', { lineHeight: '1.2' }],
                'hero-title-mobile': ['48px', { lineHeight: '1.2' }]
            },
            spacing: {
                'input-x': '30px',
                'input-y': '21px',
                'footer-top': '210px',
                'footer-gap': '190px',
                'work-gap-x': '150px',
                'work-gap-y': '135px',
                'card-gap': '25px'
            },
            maxWidth: {
                sectionBody: '846px'
            },
            screens: {
                xs: '480px'
            }
        }
    },
    plugins: [
        plugin(function ({ addBase, addComponents, theme }) {
            addBase({
                body: {
                    fontFamily: theme(`fontFamily.${themeStyle.fontBody}`)
                },
                'h1,h2,h3,h4,h5,h6,blockquote': {
                    fontFamily: theme(`fontFamily.${themeStyle.fontHeadlines}`)
                },
                'h1,.h1': {
                    fontSize: theme(`fontSize.${themeStyle.h1.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h1.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h1.letterSpacing}`)
                },
                'h2,.h2': {
                    fontSize: theme(`fontSize.${themeStyle.h2.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h2.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h2.letterSpacing}`)
                },
                'h3,.h3': {
                    fontSize: theme(`fontSize.${themeStyle.h3.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h3.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h3.letterSpacing}`)
                },
                'h4,.h4': {
                    fontSize: theme(`fontSize.${themeStyle.h4.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h4.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h4.letterSpacing}`)
                },
                h5: {
                    fontSize: theme(`fontSize.${themeStyle.h5.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h5.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h5.letterSpacing}`)
                },
                h6: {
                    fontSize: theme(`fontSize.${themeStyle.h6.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h6.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h6.letterSpacing}`)
                }
            });
            addComponents({
                '.sb-component-button-primary': {
                    borderRadius: theme(`borderRadius.${themeStyle.buttonPrimary.borderRadius}`),
                    fontWeight: themeStyle.buttonPrimary.weight,
                    padding: `${themeStyle.buttonPrimary.verticalPadding}px ${themeStyle.buttonPrimary.horizontalPadding}px`
                },
                '.sb-component-button-secondary': {
                    borderRadius: theme(`borderRadius.${themeStyle.buttonSecondary.borderRadius}`),
                    fontWeight: themeStyle.buttonSecondary.weight,
                    padding: `${themeStyle.buttonSecondary.verticalPadding}px ${themeStyle.buttonSecondary.horizontalPadding}px`
                },
                '.sb-component-link-primary': {
                    fontWeight: themeStyle.linkPrimary.weight
                },
                '.sb-component-link-secondary': {
                    fontWeight: themeStyle.linkSecondary.weight
                }
            });
        })
    ]
};
