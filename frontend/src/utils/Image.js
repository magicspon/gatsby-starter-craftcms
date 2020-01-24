import React, { forwardRef } from 'react'
import GatsbyImage from 'gatsby-image'
import * as T from '@/types'

const Image = forwardRef(
	(
		{
			width,
			height,
			title,
			optimizedimages: {
				src,
				srcset: srcSet,
				srcWebp,
				srcsetWebp: srcSetWebp,
				maxSrcsetWidth
			},
			...rest
		},
		ref
	) => {
		return (
			<GatsbyImage
				title={title}
				fluid={{
					width,
					height,
					src,
					srcSet,
					srcWebp,
					srcSetWebp,
					sizes: `(max-width: ${maxSrcsetWidth}px) 100vw, ${maxSrcsetWidth}px`,
					aspectRatio: width / height
				}}
				ref={ref}
				{...rest}
			/>
		)
	}
)

Image.propTypes = T.craftImage

export default Image
