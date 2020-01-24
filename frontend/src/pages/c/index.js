import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { string, number, shape, arrayOf } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { useAsync } from 'react-async-hook'
import { compose, last, split } from 'ramda'
import { useDispatch } from 'react-redux'
import { ThemeContext } from '@/container/ThemeProvider'
import { stripSlashes } from '@/utils'
import api from '@/utils/api'
import { UNIQUE_CAMPAIGN } from '@/utils/endpoints'
import { fade } from '@/utils/transitions'
import Spinner from '@/utils/Spinner'
import * as T from '@/types'
import Box from '@/components/Box'
import Button from '@/components/Button'
import ProductItem from '@/components/ProductItem'
import Switch from '@/utils/Switch'
import ImageTextPanel from '@/components/ImageTextPanel'
import OptionOverlay from '@/components/OptionOverlay'

const MotionBox = motion.custom(Box)

const verifyUser = async token =>
	api(`${UNIQUE_CAMPAIGN(token)}`, { method: 'POST' }).then(resp => resp.json())

function VerifyPage({
	pageContext: { schools, organisations },
	location: { pathname }
}) {
	const { setTheme } = useContext(ThemeContext)
	const [token, donee_code] = compose(
		split('/'),
		last,
		split('c/'),
		stripSlashes
	)(pathname)
	const dispatch = useDispatch()
	const [name, setName] = useState()

	const { result, status } = useAsync(verifyUser, [token])
	const [view, setView] = useState('loading')
	const [products, setProducts] = useState()

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	useEffect(() => {
		if (status === 'error') {
			setTimeout(() => {
				setView('error')
			}, 1000)

			return
		}

		if (status === 'success' && result && view !== 'success') {
			setTimeout(() => {
				const campaign_id = result.id
				setName(result.name)

				const page = schools.find(school => school.id === campaign_id)
				if (page) {
					dispatch({
						type: 'cart/SET_DONEE_CODE',
						payload: { donee_code, campaign_id }
					})
					setProducts(page.data)
					setView('success')
					return
				}
				setView('error')
			}, 1000)
		}
	}, [schools, result, status, view, dispatch, donee_code])

	return (
		<>
			<Helmet>
				<title>Campaign | GoodGive</title>
			</Helmet>

			<div className="py-8 md:pt-12 md:pb-24 lg:mb-24 wrapper">
				<AnimatePresence exitBeforeEnter>
					<Switch test={view}>
						<motion.div
							case="success"
							variants={fade}
							initial="initial"
							animate="enter"
							exit="exit"
						>
							{products && (
								<>
									<OptionOverlay
										active={false}
										placeholder={name}
										schools={organisations}
									/>
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
								</>
							)}
						</motion.div>

						<MotionBox
							case="error"
							variants={fade}
							initial="initial"
							animate="enter"
							exit="exit"
							className="w-full max-w-xl p-4 mx-auto md:p-8"
						>
							<div className="mb-8">
								<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
									Uh oh...
								</h1>
								<p className="text-pale">We couldn't find your campaign.</p>
							</div>

							<Button as="a" href="#0" className="w-full">
								Contact support
							</Button>
						</MotionBox>

						<motion.div
							case="loading"
							variants={fade}
							initial="initial"
							animate="enter"
							exit="exit"
							className="flex items-center justify-center"
						>
							<h1 className="mr-8 text-xl font-sans-semi">Loading campaign</h1>
							<Spinner className="w-10 h-10 my-auto text-blue-600" />
						</motion.div>
					</Switch>
				</AnimatePresence>
			</div>
		</>
	)
}

VerifyPage.propTypes = {
	location: shape({
		pathname: string.isRequired
	}).isRequired,

	pageContext: shape({
		organisations: T.organisations,
		schools: arrayOf(
			shape({
				data: arrayOf(shape(T.product)),
				id: number.isRequired
			})
		)
	})
}

export default VerifyPage
