import React, { forwardRef } from 'react'
import { string, node, element, func, object, oneOfType } from 'prop-types'

const Node = forwardRef(({ as: Tag = 'div', children, ...props }, ref) => {
	return (
		<Tag ref={ref} {...props}>
			{children}
		</Tag>
	)
})

Node.propTypes = {
	as: oneOfType([string, func, node, object, element]),
	children: node
}

export default Node
