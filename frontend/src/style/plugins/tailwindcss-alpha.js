/* eslint-disable compat/compat */
const Color = require('color')

const PREFIXES = {
	backgroundColor: ['bg'],
	textColor: ['text'],
	borderColor: ['border', 'border-t', 'border-r', 'border-b', 'border-l'],
	fill: ['fill'],
	stroke: ['stroke']
}

const PROPERTIES = {
	backgroundColor: ['backgroundColor'],
	textColor: ['color'],
	borderColor: [
		'borderColor',
		'borderTopColor',
		'borderRightColor',
		'borderBottomColor',
		'borderLeftColor'
	],
	fill: ['fill'],
	stroke: ['stroke']
}

module.exports = function(opts = {}) {
	return function({ e, addUtilities, config }) {
		const {
			alpha = config('theme.alpha'),
			modules = {
				backgroundColor: true,
				textColor: false,
				borderColor: false,
				fill: false,
				stroke: false
			}
		} = opts

		Object.entries(alpha).forEach(([alphaKey, alphaValue]) => {
			const alphaValueFloat = parseFloat(alphaValue)
			if (alphaValueFloat === 0 || alphaValueFloat === 1) return null

			Object.entries(modules).forEach(([configKey, variants]) => {
				if (variants === true) {
					// eslint-disable-next-line no-param-reassign
					variants = config(`variants.${configKey}`, [])
				}
				if (variants === false) return

				const colors = config(`theme.${configKey}`, {})

				addUtilities(
					Object.entries(colors)
						.map(([colorKey, color]) => {
							try {
								const parsed = Color(color)
								if (parsed.valpha === 1) {
									return PREFIXES[configKey].map((prefix, i) => {
										return {
											[`.${e(`${prefix}-${colorKey}-${alphaKey}`)}`]: {
												[`${PROPERTIES[configKey][i]}`]: parsed
													.alpha(alphaValueFloat)
													.string()
											}
										}
									})
								}
							} catch (err) {
								return null
							}
							return null
						})
						.filter(Boolean),
					variants
				)
			})
		})
	}
}
