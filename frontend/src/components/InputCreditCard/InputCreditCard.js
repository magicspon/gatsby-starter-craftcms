import React from 'react'
import classNames from 'classnames'
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement
} from 'react-stripe-elements'
import Input from '@/utils/Input'

function InputCreditCard() {
	const hasErrors = false

	return (
		<Input
			as="div"
			className={classNames(
				'inline-flex items-center px-2 focus-within:outline-none w-full',
				{
					'focus-within:border-blue-500': !hasErrors,
					'border-red-600 focus-within:border-red-500': hasErrors
				}
			)}
		>
			<div className="flex-grow">
				<CardNumberElement style={{ base: { fontSize: '1.125rem' } }} />
			</div>
			<div style={{ width: '4rem' }}>
				<CardExpiryElement style={{ base: { fontSize: '1.125rem' } }} />
			</div>
			<div className="ml-4" style={{ width: '2rem' }}>
				<CardCvcElement style={{ base: { fontSize: '1.125rem' } }} />
			</div>
		</Input>
	)
}

InputCreditCard.propTypes = {}

export default InputCreditCard
