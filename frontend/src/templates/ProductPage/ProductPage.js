import React, { useContext, useEffect } from 'react'
import { arrayOf, shape, string, number } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import ProductHero from '@/components/ProductHero'
import ProductDetails from '@/components/ProductDetails'
import { ThemeContext } from '@/container/ThemeProvider'
import { ProductProvider } from '@/container/ProductProvider'

function ProductPage({
	pageContext: {
		default_image,
		default_image_width,
		default_image_height,
		default_image_alt,
		name,
		contribution_amount,
		description,
		variants,
		campaign_id,
		organisation
	}
}) {
	const { setTheme } = useContext(ThemeContext)

	const image = {
		src: default_image,
		width: default_image_width,
		height: default_image_height,
		alt: default_image_alt
	}

	useEffect(() => {
		setTheme('product')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>{name} | Shop | GoodGive</title>
			</Helmet>
			<div className="w-full overflow-hidden">
				<div className="wrapper">
					<ProductProvider>
						<div className="relative break-out lg:flex lg:-items-center min-h-5xl">
							<div className="lg:w-1/2">
								<ProductHero
									campaign_id={campaign_id}
									value={contribution_amount}
									text={`of your purchase will be donated to ${organisation}`}
									image={image}
								/>
							</div>
							<div className="mx-auto lg:w-1/2 max-w-half lg:flex lg:items-center lg:justify-center">
								<ProductDetails
									title={name}
									description={description}
									variants={variants}
									campaign_id={campaign_id}
									image={image}
									organisation={organisation}
								/>
							</div>
						</div>
					</ProductProvider>
				</div>
			</div>
		</>
	)
}

ProductPage.propTypes = {
	pageContext: shape({
		id: number.isRequired,
		default_image: string.isRequired,
		default_image_width: number.isRequired,
		default_image_height: number.isRequired,
		default_image_alt: string.isRequired,
		name: string.isRequired,
		slug: string.isRequired,
		campaign_id: number.isRequired,
		description: string.isRequired,
		contribution_amount: number.isRequired,
		variants: arrayOf(
			shape({
				id: number.isRequired,
				sku: string.isRequired,
				price: number.isRequired,
				size: string
			})
		),
		organisation: string.isRequired
	})
}

export default ProductPage
