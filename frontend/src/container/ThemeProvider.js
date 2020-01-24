import React, { useState, createContext } from 'react'
import { node } from 'prop-types'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('white')

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

ThemeProvider.propTypes = {
	children: node.isRequired
}
