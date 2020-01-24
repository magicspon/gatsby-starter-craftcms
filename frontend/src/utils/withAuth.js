import React, { useEffect, useContext } from 'react'
import { navigate } from 'gatsby'
import { string, shape } from 'prop-types'
import { useSelector } from 'react-redux'
import Box from '@/components/Box'
import Button from '@/components/Button'
import { ThemeContext } from '@/container/ThemeProvider'
import Link from '@/utils/Link'

function AccessDenied() {
	return (
		<Box className="max-w-xl mx-auto mt-12 mb-24">
			<h1 className="mb-4 text-2xl leading-tight font-sans-semi">
				Access denied
			</h1>
			<p className="mb-12">
				You do not have the permissions to visit this page
			</p>
			<Button as={Link} to="/">
				Go shopping
			</Button>
		</Box>
	)
}

export default function withAuth(Component, role, Fallback = AccessDenied) {
	const AuthWrapper = props => {
		// eslint-disable-next-line react/prop-types
		const {
			location: { pathname }
		} = props

		const testFn = typeof role === 'function'
		const { isLoggedIn, roles, ...user } = useSelector(state => state.user)
		const cart = useSelector(state => state.cart)
		const access =
			(role &&
				roles &&
				(testFn ? role(roles, { pathname, cart }) : roles.includes(role))) ||
			typeof role === 'undefined'
		const { setTheme } = useContext(ThemeContext)

		useEffect(() => {
			if (!isLoggedIn) {
				navigate('/')
				return
			}

			if (!access) {
				setTheme('light')
			}
		}, [isLoggedIn, access, setTheme])

		if (!isLoggedIn) return null

		if (!access) return <Fallback />

		return <Component isLoggedIn={isLoggedIn} {...user} {...props} />
	}

	AuthWrapper.propTypes = {
		location: shape({
			pathname: string.isRequired
		}).isRequired
	}

	return AuthWrapper
}
