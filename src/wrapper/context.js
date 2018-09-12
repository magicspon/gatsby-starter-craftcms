import React, { Component, createContext } from 'react'
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout
const defaultContextValue = {
	data: {
		// set your initial data shape here
		showMenu: false
	},
	set: () => {}
}

const { Provider, Consumer } = createContext(defaultContextValue)

class ContextProviderComponent extends Component {
	constructor() {
		super()

		this.state = {
			...defaultContextValue,
			set: this.setData
		}
	}

	setData = newData => {
		this.setState(state => ({
			data: {
				...state.data,
				...newData
			}
		}))
	}

	render() {
		const { children } = this.props
		return <Provider value={this.state}>{children}</Provider>
	}
}

export { Consumer as default, ContextProviderComponent }
