import { graphql } from 'gatsby'

export const optimisedHero = graphql`
	fragment optimisedHero on Craft_images_Asset {
		id
		title
		width
		height
		optimisedHero {
			src
			srcset
			srcWebp
			srcsetWebp
			maxSrcsetWidth
		}
	}
`

export const seoQuery = graphql`
	fragment seoQuery on Craft_SeomaticType {
		metaTitleContainer
		metaTagContainer
		metaLinkContainer
		metaJsonLdContainer
	}
`
