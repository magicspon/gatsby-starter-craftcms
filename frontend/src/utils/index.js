import { compose, toPairs, reduce, prop, props } from 'ramda'
/**
 * Remove slashes from the start and end of a string
 * @param {string} str
 * @return {string}
 */
export function stripSlashes(str = '') {
	return str.replace(/(^\/+|\/+$)/g, '')
}

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
