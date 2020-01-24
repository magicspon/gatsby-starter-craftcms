import React, { useContext } from 'react'
import { string, shape, number } from 'prop-types'
import classNames from 'classnames'
import { format } from '@/utils'
import { ProductContext } from '@/container/ProductProvider'

function ProductHero({ className, image, value, text }) {
	const { product } = useContext(ProductContext)
	const quantity = product.value ? parseInt(product.value, 10) : 1
	return (
		<div
			className={classNames(
				className,
				'bg-gray-100 py-20 h-full p-8 flex items-center'
			)}
		>
			<div className="flex flex-col items-center max-w-sm mx-auto">
				<div className="mb-8">
					<img
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						loading="lazy"
						className="object-contain max-h-6/10vh"
					/>
				</div>
				<div className="flex items-center mx-auto">
					<div className="flex items-center justify-center flex-shrink-0 w-24 h-24 mr-4 text-white bg-blue-600 rounded-full">
						<span className="text-xl leading-none font-sans-semi">
							{format(value * quantity)}
						</span>
					</div>
					<span className="leading-tight text-md">{text}</span>
				</div>
			</div>
		</div>
	)
}

ProductHero.propTypes = {
	className: string,
	image: shape({
		src: string,
		alt: string,
		width: number,
		height: number
	}),
	value: number,
	text: string
}

export default ProductHero
