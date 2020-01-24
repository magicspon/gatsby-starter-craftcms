import React from 'react'
import Button from '@/components/Button'
import Link from '@/utils/Link'
import * as T from '@/types'
import { format } from '@/utils'

function ProductItem({
	default_image,
	default_image_width,
	default_image_height,
	default_image_alt,
	uri,
	name,
	variants: [{ price, size }]
}) {
	// const { price, size } = variant
	return (
		<div className="flex flex-col items-center justify-end h-full">
			<Link
				to={uri}
				tabIndex="-1"
				className="block mb-8 md:mb-12 focus:outline-none"
			>
				<img
					src={default_image}
					width={default_image_width}
					height={default_image_height}
					alt={default_image_alt}
					loading="lazy"
				/>
			</Link>
			<div className="w-full mb-8 text-center">
				<h3 className="text-md">{name}</h3>
				<div className="flex flex-wrap justify-center w-full">
					<span className="mx-2 text-md">{size}</span>
					<span className="mx-2 text-md">{format(price)}</span>
				</div>
			</div>
			<Button as={Link} to={uri} className="px-16">
				Learn more
			</Button>
		</div>
	)
}

ProductItem.propTypes = T.product

export default ProductItem
