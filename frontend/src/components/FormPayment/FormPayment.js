import React from 'react'
import { string, shape, func } from 'prop-types'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'
import { navigate } from 'gatsby'
import InputField from '@/components/InputField'
import Label from '@/components/Label'
import InputCreditCard from '@/components/InputCreditCard'
import Checkbox from '@/components/Checkbox'
import Cart from '@/components/Cart'
import Box from '@/components/Box'
import IconWrapper from '@/utils/IconWrapper'
import CartIcon from '@/icons/cart.svg'
import useProgressBar from '@/hooks/useProgressBar'
import api from '@/utils/api'
import { CHECKOUT } from '@/utils/endpoints'
import SubmitButton from '@/components/SubmitButton'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'
function FormPayment({
	title,
	intro,
	stripe,
	access_token,
	email,
	first_name,
	last_name
}) {
	const { register, handleSubmit, errors } = useForm()
	const { isLoading, setLoading } = useProgressBar()
	const { current_campaign, basket } = useSelector(({ cart }) => cart)
	const dispatch = useDispatch()
	const { errorRef, formError, setFormError } = useFormErrors()
	const { organisation, donee_code } = basket[current_campaign]

	const onSubmit = async data => {
		setLoading(true)
		const stripeResponse = await stripe.createToken({
			type: 'card',
			name: data.ccname
		})

		if (stripeResponse.error) {
			setLoading(false)
			const { message } = stripeResponse.error
			setFormError(message)
			return
		}
		if (stripeResponse.token) {
			const paymennt = {
				...data,
				donee_code: parseInt(data.donee_code, 10),
				payment_token: stripeResponse.token.id
			}

			const response = await api(CHECKOUT(current_campaign), {
				method: 'POST',
				body: JSON.stringify(paymennt),
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/json'
				}
			})

			setLoading(false)
			if (response.status >= 200 && response.status < 300) {
				const feedback = await response.json()
				dispatch({
					type: 'cart/FINISH_CAMPAIGN',
					payload: { ...feedback, campaign_id: current_campaign }
				})
				navigate(`/thank-you/${feedback.hash}/`)

				return
			}
			const { messages } = JSON.parse(response.message)
			setFormError(messages)
		} else {
			setLoading(false)
			setFormError(
				'Oh dear. It looks like something has gone wrong, please try again later'
			)
		}
	}

	return (
		<form
			method="POST"
			onSubmit={handleSubmit(onSubmit)}
			className="relative top-0 py-8 md:flex md:justify-between md:pt-12 md:pb-24 lg:mb-24"
		>
			<div className="md:flex-1 md:w-3/5 md:pr-8 lg:pr-16">
				<div className="mb-8">
					<h1 className="mb-4 text-xl leading-tight md:text-2xl font-sans-semi">
						{title}
					</h1>
					<p className="md:text-md">{intro}</p>
				</div>
				<FormError ref={errorRef} error={formError} />
				<div className="mb-12 lg:mb-20">
					<fieldset>
						<div className="lg:flex lg:flex-wrap lg:-ml-4">
							<Label
								htmlFor="first_name"
								text="First Name *"
								className="w-full mb-6 lg:pl-4 lg:w-1/2"
							>
								<InputField
									className="w-full"
									id="first_name"
									name="first_name"
									type="text"
									defaultValue={first_name}
									ref={register({ required: 'This field is required' })}
									error={errors.first_name}
								/>
							</Label>
							<Label
								htmlFor="email"
								text="Email *"
								className="w-full mb-6 lg:pl-4 lg:w-1/2"
							>
								<InputField
									className="w-full"
									id="email"
									name="email"
									type="email"
									defaultValue={email}
									ref={register({ required: 'This field is required' })}
									error={errors.email}
								/>
							</Label>
							<Label
								htmlFor="last_name"
								text="Last Name *"
								className="w-full mb-6 lg:pl-4 lg:w-1/2"
							>
								<InputField
									className="w-full"
									id="last_name"
									name="last_name"
									type="text"
									defaultValue={last_name}
									ref={register({ required: 'This field is required' })}
									error={errors.last_name}
								/>
							</Label>
							<Label
								htmlFor="phone"
								text="Phone Number *"
								className="w-full mb-6 lg:pl-4 lg:w-1/2"
							>
								<InputField
									className="w-full"
									id="phone"
									name="phone"
									type="tel"
									placeholder="(270) 555-0117"
									ref={register({ required: 'This field is required' })}
									error={errors.phone}
								/>
							</Label>
						</div>
						<hr className="my-8 border-t-2" />
						<div className="mb-4 lg:flex lg:flex-wrap lg:-ml-4">
							<Label
								htmlFor="address"
								text="Address *"
								className="w-full mb-6 lg:pl-4"
							>
								<InputField
									className="w-full"
									id="address"
									name="address"
									type="text"
									placeholder="42 Jupiter Street, Remuera"
									ref={register({ required: 'This field is required' })}
									error={errors.address}
								/>
							</Label>
							<Label
								htmlFor="city"
								text="City *"
								className="w-full mb-6 lg:pl-4 lg:w-2/3"
							>
								<InputField
									className="w-full"
									id="city"
									name="city"
									type="text"
									placeholder="Auckland"
									ref={register({ required: 'This field is required' })}
									error={errors.city}
								/>
							</Label>
							<Label
								htmlFor="postcode"
								text="Post Code *"
								className="w-full mb-6 lg:pl-4 lg:w-1/3"
							>
								<InputField
									className="w-full"
									id="postcode"
									name="postcode"
									type="text"
									placeholder="1071"
									ref={register({ required: 'This field is required' })}
									error={errors.postcode}
								/>
							</Label>
						</div>

						<Checkbox
							name="receive_future_communications"
							id="receive_future_communications"
							ref={register}
							error={errors.receive_future_communications}
						>
							I agree to receive future communication about GoodGive Fundraising
						</Checkbox>
					</fieldset>
				</div>

				<div className="mb-8">
					<h1 className="mb-4 text-xl leading-tight md:text-2xl font-sans-semi">
						Supporting {organisation}
					</h1>
					<p className="md:text-md">
						Confirm below that you would like your contribution to continue
						towards this school or change your selection. Your products will be
						delivered to your student's classroom and they’ll bring your
						sunscreen to you upon receipt.
					</p>
				</div>
				<div className="mb-12 lg:mb-20">
					<fieldset>
						<div className="mb-4 lg:flex lg:flex-wrap lg:-ml-4">
							<Label
								htmlFor="donee_code"
								text="4-digit student code *"
								className="w-full mb-6 lg:pl-4 lg:w-1/3"
							>
								<InputField
									className="w-full"
									id="donee_code"
									name="donee_code"
									type="text"
									defaultValue={donee_code}
									ref={register({ required: 'This field is required' })}
									error={errors.donee_code}
								/>
							</Label>
						</div>
					</fieldset>
				</div>

				<div className="mb-8">
					<h1 className="mb-4 text-xl leading-tight md:text-2xl font-sans-semi">
						Payment Details
					</h1>
					<p className="md:text-md">Enter your credit card details below.</p>
				</div>
				<div>
					<fieldset>
						<div className="mb-4 lg:flex lg:-ml-4 lg:mb-0">
							<Label
								htmlFor="ccname"
								text="Name *"
								className="w-full mb-6 lg:pl-4 lg:flex-grow-1 lg:mb-0"
							>
								<InputField
									className="w-full"
									id="ccname"
									name="ccname"
									type="text"
									placeholder="John Smith"
									ref={register({ required: 'This field is required' })}
									error={errors.ccname && 'This field is required'}
								/>
							</Label>
							<Label
								as="div"
								text="Credit Card *"
								className="w-full mb-6 lg:pl-4 lg:flex-shrink-0 lg:w-2/3 lg:mb-0"
							>
								<InputCreditCard />
							</Label>
						</div>

						<div className="mt-8 if-no-sticky">
							<SubmitButton
								isLoading={isLoading}
								type="submit"
								as="button"
								className="w-full max-w-xs"
							>
								<IconWrapper icon={CartIcon} className="w-4 mr-4" />
								Confirm payment
							</SubmitButton>
						</div>
					</fieldset>
				</div>
			</div>
			<div className="h-full top-32 md:sticky md:flex-shrink-0">
				<Box className="max-w-xs bg-white border border-gray-300 rounded-lg">
					<Cart
						current_campaign={current_campaign}
						basket={basket[current_campaign]}
						active
					/>
					<SubmitButton
						isLoading={isLoading}
						type="submit"
						as="button"
						className="w-full"
					>
						<IconWrapper icon={CartIcon} className="w-4 mr-4" />
						Confirm payment
					</SubmitButton>
				</Box>
			</div>
		</form>
	)
}

FormPayment.propTypes = {
	title: string.isRequired,
	intro: string.isRequired,
	access_token: string,
	stripe: shape({
		createToken: func.isRequired
	}),
	email: string.isRequired,
	first_name: string.isRequired,
	last_name: string.isRequired
}

export default injectStripe(FormPayment)
