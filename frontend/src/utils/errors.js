const DEFAULT_MESSAGE =
	'Oh dear. It looks like something has gone wrong, please try again later'

const BUSY = `It looks like we're a bit busy at the moment, please try again later`

const errors = node =>
	({
		'401': `Access denied`,
		'422': 'This email address has already been taken',
		'429': BUSY
	}[node] || DEFAULT_MESSAGE)

export default errors

export const loginErrors = code =>
	({
		'401': `Incorrect email address or password used`,
		'422': 'This email address has already been taken',
		'429': BUSY
	}[code] || DEFAULT_MESSAGE)

export const forgottenPasswordErrors = code =>
	({
		'400': `Incorrect email address`,
		'429': BUSY
	}[code] || DEFAULT_MESSAGE)

export const addToCartErros = code =>
	({
		'401': `Please login to purchase this item`,
		'404': `Sorry, It looks like we've just sold out of this item`,
		'429': BUSY
	}[code] || DEFAULT_MESSAGE)
