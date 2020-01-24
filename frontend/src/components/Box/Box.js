import React, { forwardRef } from 'react'
import { string, node, bool } from 'prop-types'
import classNames from 'classnames'
import Node from '@/utils/Node'

const Box = forwardRef(
	({ className, children, as = 'div', custom = false }, ref) => {
		return (
			<Node
				as={as}
				ref={ref}
				className={classNames(className, 'bg-white rounded-lg', {
					'p-8': !custom
				})}
			>
				{children}
			</Node>
		)
	}
)

Box.propTypes = {
	as: string,
	className: string,
	children: node.isRequired,
	custom: bool
}

export default Box
