import React, { useState, createContext } from 'react'
import { node } from 'prop-types'

export const ProductContext = createContext()

export function ProductProvider({ children }) {
	const [product, setProduct] = useState({})

	return (
		<ProductContext.Provider value={{ product, setProduct }}>
			{children}
		</ProductContext.Provider>
	)
}

ProductProvider.propTypes = {
	children: node.isRequired
}
