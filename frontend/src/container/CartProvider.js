import React, { useState, createContext } from 'react'
import { node } from 'prop-types'
import FullCart from '@/components/FullCart'

export const CartContext = createContext()

export function CartProvider({ children }) {
	const [isCartOpen, setCartOpen] = useState(false)

	return (
		<CartContext.Provider value={{ isCartOpen, setCartOpen }}>
			{children}
			<FullCart isCartOpen={isCartOpen} setCartOpen={setCartOpen} />
		</CartContext.Provider>
	)
}

CartProvider.propTypes = {
	children: node.isRequired
}
