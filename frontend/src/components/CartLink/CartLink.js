import React, { useContext } from 'react'
import { string, bool } from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { CartContext } from '@/container/CartProvider'
import { NavContext } from '@/container/NavProvider'
import Link from '@/utils/Link'

function CartLink({ className, isHome }) {
	const { current_campaign, basket } = useSelector(({ cart }) => cart)
	const { setCartOpen } = useContext(CartContext)
	const { isOpen, setOpen } = useContext(NavContext)

	if (!current_campaign) return null

	const { length } = basket[current_campaign].line_items

	return (
		<Link
			onClick={e => {
				e.preventDefault()
				setCartOpen(true)
				if (isOpen) setOpen(false)
			}}
			to="#0"
			className={classNames(
				'relative block tracking-tight text-accent lg:py-2 font-sans-medium focus:outline-none hocus:underline',
				className,
				{ 'lg:text-gray-700': !isHome, 'text-white': isHome }
			)}
			activeClassName="underline"
		>
			Cart ({length})
		</Link>
	)
}

CartLink.propTypes = {
	className: string,
	isHome: bool
}

export default CartLink
