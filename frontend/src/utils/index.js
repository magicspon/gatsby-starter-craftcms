import { formatMoney } from 'accounting-js'
import { compose, toPairs, reduce, prop, props } from 'ramda'
/**
 * Remove slashes from the start and end of a string
 * @param {string} str
 * @return {string}
 */
export function stripSlashes(str = '') {
	return str.replace(/(^\/+|\/+$)/g, '')
}

export function format(
	value,
	options = {
		precision: 2,
		thousand: ',',
		decimal: '.'
	}
) {
	const money = typeof value === 'string' ? parseInt(value, 10) : value

	return formatMoney(money / 100, {
		symbol: '$',
		...options
	})
}

export const removeNullValues = obj =>
	compose(
		reduce((acc, [key, value]) => {
			if (value) {
				return {
					...acc,
					[key]: value
				}
			}
			return acc
		}, {}),
		toPairs
	)(obj)

export const cleanData = data => {
	const [[entry], seomatic] = compose(
		props(['entries', 'seomatic']),
		prop('craft')
	)(data)

	return {
		...entry,
		seo: compose(
			reduce((acc, [key, value]) => ({ ...acc, [key]: JSON.parse(value) }), {}),
			toPairs
		)(seomatic)
	}
}

export const isBrowser = typeof window !== 'undefined'
