module.exports = {
	plugins: [
		require('precss'),
		require('tailwindcss')('./src/styles/tailwind.js'),
		require('autoprefixer')()
	]
}
