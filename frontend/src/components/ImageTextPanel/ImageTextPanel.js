/* eslint-disable react/no-danger */
import React from 'react'
import { string, number, shape } from 'prop-types'

function ProductItem({ image, title, content }) {
	return (
		<div className="max-w-5xl p-8 mx-auto bg-gray-100 md:p-12 lg:p-16 xl:p-20 md:flex">
			<div className="hidden md:block md:mr-16">
				<img
					src={image.src}
					width={image.width}
					height={image.height}
					alt={image.alt}
					loading="lazy"
					className="lg:max-w-2xs"
				/>
			</div>
			<div className="md:w-2/3 md:ml-auto">
				<h3 className="mb-4 text-2xl leading-tight font-sans-semi">{title}</h3>
				<div
					className="text-md"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</div>
		</div>
	)
}

ProductItem.propTypes = {
	image: shape({
		width: number.isRequired,
		height: number.isRequired,
		src: string.isRequired,
		alt: string.isRequired
	}).isRequired,
	title: string.isRequired,
	content: string.isRequired
}

export default ProductItem
