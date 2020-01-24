import { graphql } from 'gatsby'

// export const imageQuery = graphql`
// 	fragment imageQuery on Craft_assets_Asset {
// 		id
// 		title
// 		width
// 		height
// 		optimizedimages {
// 			src
// 			srcset
// 			srcWebp
// 			srcsetWebp
// 			maxSrcsetWidth
// 		}
// 	}
// `

export const seoQuery = graphql`
	fragment seoQuery on Craft_SeomaticType {
		metaTitleContainer
		metaTagContainer
		metaLinkContainer
		metaJsonLdContainer
	}
`
