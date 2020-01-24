module.exports = {
	plugins: [
		require('precss'),
		require('postcss-nested'),
		require('tailwindcss')('./src/style/tailwind.config.js'),
		require('postcss-preset-env')({
			stage: 1,
			features: {
				'focus-within-pseudo-class': false
			}
		}),
		require('postcss-object-fit-images')
	]
}
