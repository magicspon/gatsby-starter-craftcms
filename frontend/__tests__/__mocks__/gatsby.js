const React = require('react')
const gatsby = jest.requireActual('gatsby')

module.exports = {
	...gatsby,
	navigate: jest.fn(),
	graphql: jest.fn(),
	Link: jest.fn().mockImplementation(
		// these props are invalid for an `a` tag
		({
			activeClassName,
			activeStyle,
			getProps,
			innerRef,
			partiallyActive,
			replace,
			ref,
			to,
			...rest
		}) => {
			const Node = React.createElement('a', {
				...rest,
				href: to
			})

			return Node
		}
	),
	StaticQuery: jest.fn(),
	useStaticQuery: jest.fn()
}
