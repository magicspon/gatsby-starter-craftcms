import React from 'react'
import { node } from 'prop-types'

function VisuallyHidden({ children }) {
	return <span className="sr-only">{children}</span>
}

VisuallyHidden.propTypes = {
	children: node.isRequired
}

export default VisuallyHidden
