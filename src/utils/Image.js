// this is a fork of https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image
// I've just updated a few variable names to match the data returned from craft image-optimiser
// https://github.com/nystudio107/craft-imageoptimize

import React from 'react'
import PropTypes from 'prop-types'

// Cache if we've seen an image before so we don't both with
// lazy-loading & fading in on subsequent mounts.
const imageCache = {}
const inImageCache = props => {
	// Find src
	const src = props.fluid

	if (imageCache[src]) {
		return true
	}
	imageCache[src] = true
	return false
}

let io
const listeners = []

function getIO() {
	if (
		typeof io === 'undefined' &&
		typeof window !== 'undefined' &&
		window.IntersectionObserver
	) {
		io = new window.IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					listeners.forEach(l => {
						if (l[0] === entry.target) {
							// Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
							if (entry.isIntersecting || entry.intersectionRatio > 0) {
								io.unobserve(l[0])
								l[1]()
							}
						}
					})
				})
			},
			{ rootMargin: '200px' }
		)
	}

	return io
}

const listenToIntersections = (el, cb) => {
	getIO().observe(el)
	listeners.push([el, cb])
}

let isWebpSupportedCache = null
const isWebpSupported = () => {
	if (isWebpSupportedCache !== null) {
		return isWebpSupportedCache
	}

	const elem =
		typeof window !== 'undefined' ? window.document.createElement('canvas') : {}
	if (elem.getContext && elem.getContext('2d')) {
		isWebpSupportedCache =
			elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
	} else {
		isWebpSupportedCache = false
	}

	return isWebpSupportedCache
}

const noscriptImg = props => {
	// Check if prop exists before adding each attribute to the string output below to prevent
	// HTML validation issues caused by empty values like width="" and height=""
	const src = props.src ? `src="${props.src}" ` : 'src="" ' // required attribute
	const srcSet = props.srcSet ? `srcset="${props.srcSet}" ` : ''
	const sizes = props.sizes ? `sizes="${props.sizes}" ` : ''
	const title = props.title ? `title="${props.title}" ` : ''
	const alt = props.alt ? `alt="${props.alt}" ` : 'alt="" ' // required attribute
	const width = props.width ? `width="${props.width}" ` : ''
	const height = props.height ? `height="${props.height}" ` : ''
	const opacity = props.opacity ? props.opacity : '1'
	const transitionDelay = props.transitionDelay ? props.transitionDelay : '0.5s'

	return `<img ${width}${height}${src}${srcSet}${alt}${title}${sizes}style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:${transitionDelay};opacity:${opacity};width:100%;height:100%;object-fit:cover;object-position:center"/>`
}

const defaultImageStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	transition: 'opacity 0.5s',
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	objectPosition: 'center'
}

const Img = props => {
	const { style, onLoad, onError, ...otherProps } = props
	return (
		<img
			{...otherProps}
			onLoad={onLoad}
			onError={onError}
			alt=""
			style={{
				...style
			}}
		/>
	)
}

/* eslint-disable */
Img.propTypes = {
	style: PropTypes.object,
	onError: PropTypes.func,
	onLoad: PropTypes.func
}
/* eslint-enable */

class Image extends React.Component {
	constructor(props) {
		super(props)

		// If this browser doesn't support the IntersectionObserver API
		// we default to start downloading the image right away.
		let isVisible = true
		let imgLoaded = true
		let IOSupported = false

		// If this image has already been loaded before then we can assume it's
		// already in the browser cache so it's cheap to just show directly.
		const seenBefore = inImageCache(props)

		if (
			!seenBefore &&
			typeof window !== 'undefined' &&
			window.IntersectionObserver
		) {
			isVisible = false
			imgLoaded = false
			IOSupported = true
		}

		// Always don't render image while server rendering
		if (typeof window === 'undefined') {
			isVisible = false
			imgLoaded = false
		}

		this.state = {
			isVisible,
			imgLoaded,
			IOSupported
		}

		this.handleRef = this.handleRef.bind(this)
	}

	handleRef(ref) {
		const { IOSupported } = this.state
		if (IOSupported && ref) {
			listenToIntersections(ref, () => {
				this.setState({ isVisible: true, imgLoaded: false })
			})
		}
	}

	render() {
		const {
			title,
			alt,
			className,
			outerWrapperClassName,
			style = {},
			imgStyle = {},
			fluid,
			// picture,
			backgroundColor,
			fadeIn,
			onLoad,
			onError,
			useAspect = true,
			imgClassName = ''
		} = this.props

		const { imgLoaded, isVisible, IOSupported } = this.state

		let bgColor
		if (typeof backgroundColor === 'boolean') {
			bgColor = 'lightgray'
		} else {
			bgColor = backgroundColor
		}

		const imageStyle = {
			opacity: imgLoaded || fadeIn === false ? 1 : 0,
			...imgStyle
		}

		if (fluid) {
			const image = fluid
			const { placeholderWidth: width, placeholderHeight: height } = image
			const { colorPalette } = image
			const aspectRatio = (height / width) * 100

			// Use webp by default if browser supports it
			if (image.srcWebp && image.srcsetWebp && isWebpSupported()) {
				image.src = image.srcWebp
				image.srcset = image.srcsetWebp
			}

			bgColor = colorPalette[0]

			return (
				<div className={`${outerWrapperClassName || ''}  relative`}>
					<div
						className={`${className || ''} relative overflow-hidden`}
						style={style}
						ref={this.handleRef}
					>
						{useAspect && (
							<div
								style={{
									width: '100%',
									paddingBottom: `${aspectRatio}%`
								}}
							/>
						)}

						{bgColor && (
							<div
								title={title}
								style={{
									backgroundColor: bgColor,
									position: 'absolute',
									top: 0,
									bottom: 0,
									opacity: !imgLoaded ? 1 : 0,
									transitionDelay: '0.35s',
									right: 0,
									left: 0
								}}
							/>
						)}

						{isVisible && (
							<Img
								alt={alt}
								title={title}
								srcSet={image.srcset}
								src={image.src}
								// sizes={image.sizes}
								style={imageStyle}
								onLoad={() => {
									IOSupported && this.setState({ imgLoaded: true }) // eslint-disable-line no-unused-expressions
									onLoad && onLoad() // eslint-disable-line no-unused-expressions
								}}
								onError={onError}
								className={`w-full h-full pin absolute object-cover trans trans-opacity ${imgClassName}`}
							/>
						)}

						<noscript
							dangerouslySetInnerHTML={{
								__html: noscriptImg({ alt, title, ...image })
							}}
						/>
					</div>
				</div>
			)
		}

		return null
	}
}

Image.defaultProps = {
	fadeIn: true,
	alt: ''
}

const optimisedImageObject = PropTypes.shape({
	src: PropTypes.string.isRequired,
	srcset: PropTypes.string.isRequired,
	srcWebp: PropTypes.string.isRequired,
	srcsetWebp: PropTypes.string,
	placeholderImage: PropTypes.string,
	placeholderSvg: PropTypes.string,
	placeholderWidth: PropTypes.number.isRequired,
	placeholderHeight: PropTypes.number.isRequired
})

/* eslint-disable */
Image.propTypes = {
	fluid: optimisedImageObject,
	fadeIn: PropTypes.bool,
	title: PropTypes.string,
	alt: PropTypes.string,
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Support Glamor's css prop.
	outerWrapperClassName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	style: PropTypes.object,
	imgStyle: PropTypes.object,
	position: PropTypes.string,
	backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	onLoad: PropTypes.func,
	onError: PropTypes.func
}
/* eslint-enable */

export default Image
