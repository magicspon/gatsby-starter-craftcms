import React, { useEffect } from 'react'
import { string, shape } from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Cart from '@/components/Cart'
import Box from '@/components/Box'
import RichText from '@/utils/RichText'
import withAuth from '@/utils/withAuth'
import { stripSlashes } from '@/utils'
import Button from '@/components/Button'
import User from '@/components/User'
import Link from '@/utils/Link'

const getToken = pathname => stripSlashes(pathname).split('thank-you/')[1]

function ThankYouPage({ location: { pathname } }) {
	const { history, current_campaign } = useSelector(({ cart }) => cart)
	const dispatch = useDispatch()
	const token = getToken(pathname)
	const {
		thank_you_message,
		thank_you_image,
		thank_you_name,
		organisation,
		classroom,
		date,
		campaign_id,
		basket
	} = history[token]

	useEffect(() => {
		if (current_campaign === campaign_id) {
			dispatch({
				type: 'cart/DELETE_CAMPAIGN',
				payload: { campaign_id }
			})
		}
	}, [campaign_id, current_campaign, dispatch])

	return (
		<div className="wrapper">
			<div className="relative top-0 py-8 md:flex md:justify-between md:pt-12 md:pb-24 lg:mb-24">
				<div className="md:flex-1 md:pr-8 lg:pr-16">
					<div className="mb-8 md:mb-16 lg:mb-20">
						<div className="p-8 bg-gray-100 lg:p-12 lg:px-16 xl:px-20">
							<h3 className="mb-8 text-xl leading-snug font-sans-semi md:text-2xl">
								You’re amazing! Thank you from everyone at {organisation}!!
							</h3>
							<RichText
								className="mb-12"
								dangerouslySetInnerHTML={{ __html: thank_you_message }}
							/>
							<User
								image={thank_you_image}
								name={thank_you_name}
								school={organisation}
							/>
						</div>
					</div>
					<div className="pl-8 lg:pl-12 lg:pl-16 xl:pl-20">
						<h1 className="mb-8 text-xl md:text-2xl font-sans-semi">
							Order Received
						</h1>
						<RichText className="mb-12 lg:mb-20">
							<p>
								Your order has been placed and will be dispatched to{' '}
								{organisation}
							</p>
							<p>
								Delivery: When the campaign ends your order will be delivered to
								your chosen student, who will liaise with you to arrange for
								delivery or pick-up.
							</p>
							{/* <p>
								Delivered to : {organisation}
								<br />
								Classroom No : {classroom}
								<br />
								Date : {date}
							</p> */}
						</RichText>
					</div>
				</div>
				<div className="h-full top-32 md:sticky md:flex-shrink-0">
					<Box className="max-w-xs bg-white border border-gray-300 rounded-lg">
						<Cart
							current_campaign={current_campaign}
							basket={basket}
							active={false}
						/>
					</Box>
				</div>
			</div>
		</div>
	)
}

ThankYouPage.propTypes = {
	location: shape({
		pathname: string.isRequired
	}).isRequired
}

function AccessDenied() {
	return (
		<Box className="max-w-xl mx-auto mt-12 mb-24 text-center">
			<h1 className="mb-8 text-2xl leading-tight font-sans-semi">
				No order found
			</h1>
			<Button as={Link} to="/">
				Return home
			</Button>
		</Box>
	)
}

export default withAuth(
	ThankYouPage,
	(roles, { cart, pathname }) => {
		return roles.includes('supporter') && !!cart.history[getToken(pathname)]
	},
	AccessDenied
)
