import React from 'react'
import { string, node } from 'prop-types'
import classNames from 'classnames'
import Node from '@/utils/Node'

function Label({ className, htmlFor, text, children, as = 'label' }) {
	return (
		<Node as={as} htmlFor={htmlFor} className={classNames('block', className)}>
			<span className="block mb-2 md:text-md">{text}</span>
			{children}
		</Node>
	)
}

Label.propTypes = {
	className: string,
	htmlFor: string,
	children: node.isRequired,
	text: string.isRequired,
	as: string
}

export default Label
