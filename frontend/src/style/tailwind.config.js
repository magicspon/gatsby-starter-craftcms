const { colors } = require('tailwindcss/defaultTheme')
const { px2 } = require('./utils')

const opacity = {
	'0': '0',
	'25': '.25',
	'30': '.3',
	'40': '.4',
	'50': '.5',
	'75': '.75',
	'85': '.85',
	'100': '1'
}

module.exports = {
	theme: {
		aspectRatio: {
			square: [1, 1],
			'16/9': [16, 9],
			'4/3': [4, 3],
			'21/9': [21, 9]
		},

		inset: theme => ({
			'0': '0',
			auto: 'auto',
			...theme('spacing'),
			'1/10': '10%',
			'2/10': '20%',
			'-1/10': '-10%',
			'-2/10': '-20%',
			full: '100%'
		}),

		extend: {
			boxShadow: {
				secondary: `0 0 6px -1px rgba(52, 93, 238, 0.3), 0 0 4px 0px rgba(52, 93, 238, 0.5)`,
				lg: '1px 4px 44px rgba(0, 0, 0, 0.13)'
			},
			colors: {
				current: 'currentColor',
				black: '#18214D',
				pale: '#979797',
				light: '#f6f6f6',
				gray: {
					...colors.gray,
					'100': '#EFF2F6',
					'300': '#DFE4EA',
					'700': '#3E4462'
				},
				blue: {
					...colors.blue,
					'100': '#eef2f6',
					'600': '#345DEE'
				},
				red: {
					...colors.red,
					'600': '#ee0105'
				}
			},

			screens: {
				sm: px2(490, 'em'),
				md: px2(736, 'em'),
				lg: px2(1024, 'em'),
				xl: px2(1280, 'em')
			},

			fontSize: {
				xs: px2(12),
				sm: px2(14),
				base: px2(16),
				md: px2(18),
				'2md': px2(20),
				lg: px2(23),
				xl: px2(26),
				'2xl': px2(36),
				'3xl': px2(46),
				'4xl': px2(56)
			},

			letterSpacing: {
				tightest: '-0.075em'
			},

			lineHeight: {
				tightest: 1.15
			},

			fontFamily: {
				sans: [
					'inter-regular',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"'
				],
				'sans-medium': [
					'inter-medium',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"'
				],
				'sans-semi': [
					'inter-semi-bold',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"'
				]
				// 'sans-bold': [
				// 	'inter-bold',
				// 	'-apple-system',
				// 	'BlinkMacSystemFont',
				// 	'"Segoe UI"',
				// 	'Roboto',
				// 	'"Helvetica Neue"',
				// 	'Arial',
				// 	'"Noto Sans"',
				// 	'sans-serif',
				// 	'"Apple Color Emoji"',
				// 	'"Segoe UI Emoji"',
				// 	'"Segoe UI Symbol"',
				// 	'"Noto Color Emoji"'
				// ]
			},

			// spacing,
			opacity,
			alpha: opacity,

			width: {
				'half/screen': '50vw'
			},

			maxWidth: {
				'3xs': px2(180),
				'2xs': px2(200),
				'5xl': px2(1079),
				half: px2(650),
				wrapper: px2(1300)
			},

			height: {
				action: px2(50)
			},

			minHeight: theme => ({
				...theme('maxWidth'),
				...theme('spacing'),
				action: px2(50),
				'5xl': px2(800)
			}),

			margin: {
				'1/4': '25%',
				'-1/2': '-50%'
			},

			minWidth: theme => ({
				...theme('maxWidth')
			}),

			maxHeight: theme => ({
				...theme('maxWidth'),
				'6/10vh': '60vh'
			})
		}
	},

	variants: {
		margin: ['responsive', 'last'],
		opacity: [
			'responsive',
			'hover',
			'focus',
			'hocus',
			'checked',
			'disabled',
			'group-hover'
		],
		backgroundColor: ['responsive', 'hover', 'focus', 'hocus', 'focus-within'],
		pointerEvents: ['disabled', 'responsive'],
		borderWidth: [
			'last',
			'responsive',
			'hover',
			'focus',
			'hocus',
			'focus-within',
			'check-focus'
		],
		borderColor: [
			'responsive',
			'hover',
			'focus',
			'hocus',
			'focus-within',
			'check-focus'
		],
		boxShadow: ['responsive', 'hover', 'focus', 'hocus'],
		textColor: [
			'responsive',
			'hover',
			'focus',
			'hocus',
			'focus-within',
			'check-focus'
		],
		textDecoration: ['responsive', 'hover', 'focus', 'hocus']
	},
	plugins: [
		require('tailwindcss-aspect-ratio')(),
		require('tailwindcss-multi-column')(),

		require('./plugins/tailwindcss-alpha')({
			modules: {
				backgroundColor: true,
				textColor: true,
				borderColor: true
			},
			alpha: opacity,
			variants: ['responsive', 'hover', 'focus', 'active', 'group-hover']
		}),
		function({ addVariant, e }) {
			addVariant('checked', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) =>
						`.${e(`checked${separator}${className}`)}:checked + *`
				)
			})
		},
		function({ addVariant, e }) {
			addVariant('check-focus', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) =>
						`.${e(`check-focus${separator}${className}`)}:focus + *`
				)
			})
		},
		require('tailwindcss-interaction-variants')(),

		function({ addUtilities }) {
			addUtilities(
				{
					'.break-out': {
						width: '100vw',
						left: '50%',
						right: '50%',
						marginLeft: '-50vw',
						marginRight: '-50vw'
					},
					'.reset-break-out': {
						width: 'auto',
						left: '0',
						right: '0',
						marginLeft: '0',
						marginRight: '0'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},
		// performant position fixed
		function({ addUtilities }) {
			addUtilities(
				{
					'.fixez': {
						position: 'fixed',
						transform: 'translateZ(0)'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},
		// transforms
		function({ addUtilities }) {
			addUtilities(
				{
					'.x-0': {
						transform: 'translateX(0)'
					},
					'.x-50': {
						transform: 'translateX(50%)'
					},
					'.x-25': {
						transform: 'translateX(25%)'
					},
					'.x-100': {
						transform: 'translateX(100%)'
					},
					'.-x-25': {
						transform: 'translateX(-25%)'
					},
					'.-x-50': {
						transform: 'translateX(-50%)'
					},
					'.-x-100': {
						transform: 'translateX(-100%)'
					},
					'.y-0': {
						transform: 'translateY(0)'
					},
					'.y-50': {
						transform: 'translateY(50%)'
					},
					'.y-100': {
						transform: 'translateY(100%)'
					},
					'.-y-50': {
						transform: 'translateY(-50%)'
					},
					'.-y-100': {
						transform: 'translateX(-100%)'
					},
					'.-xy-50': {
						transform: 'translate3d(-50%, -50%, 0)'
					},
					'.translate-z': {
						transform: 'translateZ(0)'
					},
					'.rotate-90': {
						transform: 'rotate(90deg)'
					},
					'.rotate-180': {
						transform: 'rotate(180deg)'
					}
				},
				{
					variants: ['responsive', 'hover', 'group-hover']
				}
			)
		},

		// transitions
		function({ addUtilities }) {
			addUtilities(
				{
					'.transition-all': {
						transition: 'all 500ms ease'
					},
					'.transition-both': {
						transition: 'opacity 500ms ease, transform 500ms ease'
					},
					'.transition-opacity': {
						transition: 'opacity 500ms ease'
					},
					'.transition-bg-color': {
						transition: 'background-color 500ms ease'
					},
					'.transition-color': {
						transition: 'color 500ms ease'
					},
					'.transition-transform': {
						transition: 'transform 500ms ease'
					},
					'.transition-slow': {
						transitionDuration: '1000ms'
					},
					'.transition-wait': {
						transitionDelay: '1200ms'
					}
				},
				{
					variants: ['responsive']
				}
			)
		}
	]
}
