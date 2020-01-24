import React, { useState, createContext } from 'react'
import { node } from 'prop-types'

export const NavContext = createContext()

export function NavProvider({ children }) {
	const [isOpen, setOpen] = useState(false)
	return (
		<NavContext.Provider value={{ isOpen, setOpen }}>
			{children}
		</NavContext.Provider>
	)
}

NavProvider.propTypes = {
	children: node.isRequired
}
