import { graphql } from 'gatsby'

export const imageQuery = graphql`
	fragment imageQuery on Craft_assets_Asset {
		id
		title
		width
		height
		optimizedimages {
			src
			srcset
			srcWebp
			srcsetWebp
			maxSrcsetWidth
		}
	}
`

export const faqQuery = graphql`
	fragment faqQuery on Craft_faq_BlockType {
		id
		answer
		question
	}
`

export const quoteQuery = graphql`
	fragment quoteQuery on Craft_testimonials_BlockType {
		id
		association
		by
		text
		image {
			...imageQuery
		}
	}
`

export const quoteQuery2 = graphql`
	fragment quoteQuery2 on Craft_testimonials2_BlockType {
		id
		association
		by
		text
	}
`

export const imageHeadingQuery = graphql`
	fragment imageHeadingQuery on Craft_imageHeadingText_BlockType {
		id
		text
		enabled
		heading
	}
`

export const headingTextQuery = graphql`
	fragment headingTextQuery on Craft_headingText_BlockType {
		id
		heading
		text
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
