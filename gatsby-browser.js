import wrapWithProvider from '~/store/provider'

export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
	/*

	Lazyload custom fonts

	const style = {
		style: 'normal',
		unicodeRange: 'U+000-5FF',
		weight: '400'
	}
	const light = new FontFace(
		'GT-Walsheim-Light',
		'url(/fonts/GT-Walsheim-Light.woff2)',
		style
	)

	const bold = new FontFace(
		'GT-Walsheim-Medium',
		'url(/fonts/GT-Walsheim-Medium.woff2)',
		style
	)

	// don't wait for the render tree, initiate an immediate fetch!
	Promise.all([light.load(), bold.load()]).then(fonts => {
		// apply the font (which may re-render text and cause a page reflow)
		// after the font has finished downloading
		fonts.forEach(font => document.fonts.add(font))
	})
	*/
}

export const shouldUpdateScroll = () => true
