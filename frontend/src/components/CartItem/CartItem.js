import React, { useEffect, useRef, useState } from 'react'
import { string, number, shape, bool, oneOfType } from 'prop-types'
import { useAsyncAbortable } from 'react-async-hook'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import IconWrapper from '@/utils/IconWrapper'
import DeleteIcon from '@/icons/delete.svg'
import InputNumber from '@/components/InputNumber'
import useProgressBar from '@/hooks/useProgressBar'
import Switch from '@/utils/Switch'
import Spinner from '@/utils/Spinner'
import { fade } from '@/utils/transitions'
import usePrevious from '@/hooks/usePrevious'
const MotionSpinner = motion.custom(Spinner)

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }

export const showHide = {
	initial: { opacity: 1 },
	show: { opacity: 1, transition },
	hide: {
		opacity: 0,
		transition: { ...transition }
	}
}

function CartItem({
	theme = 'light',
	image,
	title,
	price,
	quantity,
	id,
	campaign_id,
	active = true
}) {
	const [quant, setQuant] = useState(quantity)
	const prevQuant = usePrevious(quant)
	const dispatch = useDispatch()
	const input = useRef()
	const { isLoading, setLoading } = useProgressBar(false)
	const [view, setView] = useState(false)

	useEffect(() => {
		if (input.current) input.current.value = quant
	}, [quant])

	useAsyncAbortable(
		async (abortSignal, value) => {
			const shouldUpdate = active && prevQuant && prevQuant !== quant

			if (shouldUpdate) {
				setView('update')
				await dispatch({
					type: 'cart/REQUEST_UPDATE_ITEM',
					payload: { id, campaign_id, quantity: value, abortSignal }
				})

				setView(false)
			}
		},
		[quant]
	)

	return (
		<div className="relative flex items-center w-full">
			<div className="w-16 px-2 mr-4">
				<img
					src={image.src}
					width={image.width}
					height={image.height}
					alt={image.alt}
					loading="lazy"
				/>
			</div>
			<div className="w-full">
				<div className="w-2/3">
					<h3 className="mb-2 text-base leading-tight font-sans-semi">
						{title}
					</h3>
				</div>
				{active ? (
					<div className="flex items-center justify-between">
						<div className="relative py-2">
							<InputNumber
								ref={input}
								className={classNames('text-sm', {
									'bg-white': theme === 'white',
									'bg-gray-100': theme === 'light'
								})}
								setValue={(_, value) => {
									setQuant(value)
									return {}
								}}
								getValues={() => ({ quantity: quant })}
								defaultValue={quant}
								size="small"
							/>
						</div>
						<span className="text-sm">{price}</span>
					</div>
				) : (
					<div className="flex text-gray-700">
						<span className="mr-4 text-sm">QTY: {quantity}</span>
						<span className="text-sm">{price}</span>
					</div>
				)}
			</div>
			{active && (
				<button
					disabled={isLoading}
					type="button"
					className="absolute top-0 right-0 w-5 h-5 focus:outline-none"
				>
					<AnimatePresence exitBeforeEnter initial={false}>
						<Switch test={view}>
							<IconWrapper
								case={v => v !== 'deleting'}
								label="remove from cart"
								icon={DeleteIcon}
								className="w-2"
								variants={fade}
								initial="initial"
								animate="enter"
								exit="exit"
								onClick={async () => {
									setLoading(true)
									await dispatch({
										type: 'cart/REQUEST_DELETE',
										payload: { id, campaign_id }
									})
								}}
							/>
							<MotionSpinner
								case="deleting"
								variants={fade}
								initial="initial"
								animate="enter"
								exit="exit"
								className="w-5 h-5 text-blue-600"
							/>
						</Switch>
					</AnimatePresence>
				</button>
			)}
		</div>
	)
}

CartItem.propTypes = {
	campaign_id: number,
	active: bool,
	image: shape({
		width: number.isRequired,
		height: number.isRequired,
		src: string.isRequired,
		alt: string.isRequired
	}).isRequired,
	title: string.isRequired,
	price: string.isRequired,
	quantity: number.isRequired,
	theme: string,
	id: oneOfType([number, string]).isRequired
}

export default CartItem
