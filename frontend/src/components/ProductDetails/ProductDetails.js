import React, {
	useReducer,
	useEffect,
	useCallback,
	useState,
	useContext
} from 'react'
import { string, arrayOf, shape, number } from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import Link from '@/utils/Link'
import InputNumber from '@/components/InputNumber'
import { CartContext } from '@/container/CartProvider'
import Select from '@/components/Select'
import Button from '@/components/Button'
import IconWrapper from '@/utils/IconWrapper'
import CartIcon from '@/icons/cart.svg'
import TickIcon from '@/icons/tick.svg'
import RichText from '@/utils/RichText'
import usePrevous from '@/hooks/usePrevious'
import useProgressBar from '@/hooks/useProgressBar'
import { format } from '@/utils'
import AccessModal from '@/components/AccessModal'
import Switch from '@/utils/Switch'
import Spinner from '@/utils/Spinner'
import { fade } from '@/utils/transitions'
import { addToCartErros } from '@/utils/errors'
import { ProductContext } from '@/container/ProductProvider'

const MotionSpinner = motion.custom(Spinner)
const MotionIconWrapper = motion.custom(IconWrapper)

const toNum = num => parseInt(num, 10)

function reducer(state, { type, payload }) {
	switch (type) {
		case 'SET_VARIANT': {
			const variant = state.variants.find(item => item.id === toNum(payload))

			return { ...state, selection: variant }
		}

		case 'SET_VARIANT_QUANTITY': {
			const { id, value } = payload
			const variant = state.variants.find(item => item.id === toNum(id))

			return { ...state, selection: { ...variant, quantity: value } }
		}

		default:
			throw new Error()
	}
}

function ProductDetails({
	className,
	variants,
	title,
	description,
	campaign_id,
	organisation
}) {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		errors,
		watch
	} = useForm()
	const { setProduct } = useContext(ProductContext)
	const { isAdmin, isLoggedIn } = useSelector(state => state.user)
	const { cart } = useSelector(state => state.cart)
	const fields = watch(['variant', 'quantity'])
	const previous = usePrevous(fields)
	const { isLoading, setLoading } = useProgressBar()
	const [isOpen, setOpen] = useState(false)
	const [view, setView] = useState(false)
	const dispatch = useDispatch()
	const [formError, setFormError] = useState()
	const { setCartOpen } = useContext(CartContext)

	const [state, variantController] = useReducer(reducer, {
		selection: variants[0],
		variants,
		store: {}
	})

	const isInBasket = false // variants.some(v => cart[v.id])

	const item = state.selection

	const onSubmit = useCallback(
		async data => {
			if (isLoading) return
			setView('loading')
			setLoading(true)
			const { quantity } = data

			const response = await dispatch({
				type: 'cart/REQUEST_ADD_TO_CART',
				payload: {
					variant: item,
					quantity: toNum(quantity),
					campaign_id,
					organisation
				}
			})

			setTimeout(() => {
				setLoading(false)
				if (response === true) {
					setView('complete')
					setCartOpen(true)
					return
				}
				setFormError(addToCartErros(response.message))
			}, 1000)
		},
		[
			campaign_id,
			dispatch,
			isLoading,
			item,
			organisation,
			setCartOpen,
			setLoading
		]
	)

	useEffect(() => {
		if (previous && previous.quantity !== fields.quantity && item) {
			const { id } = item
			setProduct({ id, value: fields.quantity, campaign_id })
			variantController({
				type: 'SET_VARIANT_QUANTITY',
				payload: { id, value: fields.quantity }
			})
		}
	}, [previous, fields.quantity, item, setProduct, campaign_id])

	useEffect(() => {
		if (previous && previous.variant !== fields.variant) {
			variantController({ type: 'SET_VARIANT', payload: fields.variant })
			setValue('quantity', 1)
		}
	}, [previous, fields.variant, setValue, variants, cart])

	// useEffect(() => {
	// 	if (isLoggedIn && isOpen) {
	// 		setOpen(false)
	// 	}
	// }, [isLoggedIn, isOpen])

	return (
		<div className={classNames(className, 'bg-white px-4 py-8')}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md mx-auto mb-12 lg:mx-0 lg:mb-0"
			>
				{formError && (
					<div className="p-4 mb-4 text-sm text-white bg-red-400 rounded-lg">
						{formError}
					</div>
				)}
				<header className="mb-4">
					<h1 className="text-xl leading-tight font-sans-semi md:text-2xl">
						{title}
					</h1>
				</header>
				<RichText
					className="mb-8 text-sm lg:mb-12"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				{!isAdmin && (
					<>
						<div className="flex mb-8 -ml-4 sm:min-w-sm">
							<div className="w-1/2 pl-4">
								<div className="mb-2 font-sans text-md">Quantity</div>
								<InputNumber
									setValue={setValue}
									getValues={getValues}
									name="quantity"
									ref={register({ required: 'This field is required' })}
									error={errors.quantity}
								/>
							</div>
							<div className="flex flex-col w-1/2 pl-4">
								<div className="w-full mb-2 font-sans text-md">Size</div>
								<Select
									name="variant"
									ref={register({ required: 'This field is required' })}
									className="w-full h-full"
									size="small"
									options={variants.map(({ id, size }) => ({
										id,
										value: size
									}))}
									error={errors.volume}
								/>
							</div>
						</div>
						<div className="flex items-center -ml-4">
							<div className="pl-4 flex-no-shrink">
								<span className="block text-xl leading-none text-black font-sans-semi">
									{format(item.price * (item.quantity || 1))}
								</span>
								{item.rrp && (
									<span className="block text-xs line-through opacity-50">
										RRP: {format(item.rrp)}
									</span>
								)}
							</div>
							<div className="relative flex-1 pl-4">
								{isLoggedIn ? (
									<Button
										disabled={isLoading}
										className="w-full"
										type="submit"
										as={isInBasket ? Link : 'button'}
										to={isInBasket ? '/checkout/' : undefined}
									>
										<IconWrapper icon={CartIcon} className="w-4 mr-4" />
										{isInBasket ? 'Checkout' : 'Add to basket'}
									</Button>
								) : (
									<Button
										className="w-full"
										as="button"
										type="button"
										id="login-button"
										onClick={() => setOpen(true)}
									>
										Login to purchase
									</Button>
								)}
								<AnimatePresence exitBeforeEnter>
									<Switch test={view}>
										<MotionSpinner
											case="loading"
											variants={fade}
											initial="initial"
											animate="enter"
											exit="exit"
											className="absolute inset-y-0 w-4 h-4 my-auto ml-4 text-white border-t-2 border-l-2 lg:w-6 lg:h-6 lg:text-blue-600 right-4 lg:right-auto lg:left-full"
										/>
										<MotionIconWrapper
											case="complete"
											variants={fade}
											initial="initial"
											animate="enter"
											exit="exit"
											icon={TickIcon}
											className="absolute inset-y-0 w-4 h-4 my-auto ml-4 text-white lg:text-blue-600 right-4 lg:right-0 lg:left-full"
										/>
									</Switch>
								</AnimatePresence>
							</div>
						</div>
					</>
				)}
			</form>
			<AccessModal
				campaign_id={campaign_id}
				fields={fields}
				isOpen={isOpen}
				setOpen={setOpen}
				organisation={organisation}
			/>
		</div>
	)
}

ProductDetails.propTypes = {
	className: string,
	title: string.isRequired,
	description: string.isRequired,
	campaign_id: number.isRequired,
	variants: arrayOf(
		shape({
			id: number.isRequired,
			sku: string.isRequired,
			price: number.isRequired,
			size: string
		})
	),
	organisation: string
}

export default ProductDetails
