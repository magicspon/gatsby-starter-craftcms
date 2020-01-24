import { Children, createElement } from 'react'
import { node, oneOfType, string, number, bool } from 'prop-types'

export default function Switch({ children, test }) {
	return Children.map(children, child => {
		const { case: type, ...rest } = child.props
		const isFn = typeof type === 'function'
		const result = isFn ? type(test) : test === type

		const render = result ? createElement(child.type, rest) : null
		return render
	})
}

Switch.propTypes = {
	children: node.isRequired,
	test: oneOfType([string, number, bool]).isRequired // eslint-disable-line react/forbid-prop-types
}
