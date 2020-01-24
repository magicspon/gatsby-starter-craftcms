import React, { useContext, useEffect } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { ThemeContext } from '@/container/ThemeProvider'
import OptionOverlay from '@/components/OptionOverlay'
import ProductItem from '@/components/ProductItem'
import ImageTextPanel from '@/components/ImageTextPanel'
import { stripSlashes } from '@/utils'
import * as T from '@/types'

function Shop({ path, pageContext: { products, organisations } }) {
	const { setTheme } = useContext(ThemeContext)
	const currentSchool = organisations.find(
		org => stripSlashes(path) === stripSlashes(org.uri)
	)
	const placeholder = currentSchool ? currentSchool.name : organisations[0].name

	useEffect(() => {
		setTheme('white')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Shop | GoodGive</title>
			</Helmet>
			<div className="wrapper">
				<div className="py-8 md:pt-12 md:pb-24 lg:mb-24">
					<div className="mb-12 md:mb-20">
						<OptionOverlay placeholder={placeholder} schools={organisations} />
					</div>
					<div className="max-w-5xl mx-auto mb-12 sm:flex sm:flex-wrap">
						{products.map(product => (
							<div
								className="flex flex-col px-4 mb-12 sm:w-1/2 md:w-1/3 md:mb-20 md:px-8"
								key={product.uuid}
							>
								<ProductItem {...product} />
							</div>
						))}
					</div>
					<ImageTextPanel
						image={{
							src: '/images/cancer-society.png',
							alt: 'Product image',
							width: 428,
							height: 430
						}}
						title="About Cancer Society Sunscreen"
						content="The Cancer Society of New Zealand is the leading organisation dedicated to reducing the incidence of cancer and ensuring the best cancer care for everyone in New Zealand. By purchasing Cancer Society sunscreen, you are also helping support Kiwis affected by cancer. Thank you."
					/>
				</div>
			</div>
		</>
	)
}

Shop.propTypes = {
	path: string,
	pageContext: shape({
		organisations: T.organisations,
		products: arrayOf(shape(T.product))
	})
}

export default Shop
