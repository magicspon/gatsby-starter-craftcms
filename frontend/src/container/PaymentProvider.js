import React, { useEffect, useState } from 'react'
import { node } from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
import { isBrowser } from '@/utils'

function PaymentProvider({ children }) {
	const [key, setKey] = useState(null)

	useEffect(() => {
		if (isBrowser && window.Stripe && !key) {
			setKey(window.Stripe(STRIPE_API_KEY))
		}
	}, [key])

	return <StripeProvider stripe={key}>{children}</StripeProvider>
}

PaymentProvider.propTypes = {
	children: node.isRequired
}

export default PaymentProvider
