// @ts-check

const PX_BASE = 16

/**
 * Convert pixels to rems, or ems.
 *
 * @function px2
 * @param {string} value
 * @param {string} unit - default to rem
 * @return {string}
 */
const px2 = (value, unit = 'rem') => `${parseFloat(value) / PX_BASE}${unit}`

module.exports = {
	px2
}
