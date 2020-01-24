import React, { useContext, useEffect } from 'react'
import { string } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { Elements } from 'react-stripe-elements'
import { ThemeContext } from '@/container/ThemeProvider'
import PaymentProvider from '@/container/PaymentProvider'
import FormPayment from '@/components/FormPayment'
import withAuth from '@/utils/withAuth'

function Checkout({ access_token, email, first_name, last_name }) {
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('white')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Checkout | GoodGive</title>
			</Helmet>
			<PaymentProvider>
				<Elements>
					<div className="wrapper">
						<FormPayment
							access_token={access_token}
							readOnly={false}
							title="Your Details"
							intro="Enter your personal details below"
							email={email}
							first_name={first_name}
							last_name={last_name}
						/>
					</div>
				</Elements>
			</PaymentProvider>
		</>
	)
}

Checkout.propTypes = {
	access_token: string.isRequired,
	email: string.isRequired,
	first_name: string.isRequired,
	last_name: string.isRequired
}

export default withAuth(Checkout, roles => !roles.includes('admin'))
