import {
	shape,
	arrayOf,
	number,
	string,
	oneOfType,
	objectOf,
	any
} from 'prop-types'

export const craftImage = {
	id: string.isRequired,
	title: string.isRequired,
	width: number.isRequired,
	height: number.isRequired,
	optimizedimages: shape({
		src: string.isRequired,
		srcset: string.isRequired,
		srcWebp: string.isRequired,
		srcsetWebp: string.isRequired,
		maxSrcsetWidth: number.isRequired
	})
}

const socialMetaProps = shape({
	content: string,
	property: string
})

export const craftSEOMatic = {
	metaTitleContainer: shape({
		title: shape({
			title: string
		})
	}),
	metaTagContainer: shape({
		description: shape({ content: string }),
		keywords: arrayOf(string),
		robots: shape({
			content: string,
			name: string
		}),
		'og:site_name': socialMetaProps,
		'og:type': socialMetaProps,
		'og:url': socialMetaProps,
		'og:image': socialMetaProps,
		'og:image:width': socialMetaProps,
		'og:image:height': socialMetaProps
	}),
	metaLinkContainer: shape({
		canonical: shape({
			href: string,
			rel: string
		}),
		home: shape({
			href: string,
			rel: string
		}),
		author: shape({
			href: string,
			rel: string,
			type: string
		}),
		alternate: shape({
			href: string,
			hreflang: string,
			rel: string
		})
	}),
	metaJsonLdContainer: shape({
		// eslint-disable-next-line no-undef
		mainEntityOfPage: objectOf(any)
	})
}
