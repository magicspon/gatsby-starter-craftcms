import React, { forwardRef } from 'react'
import { string, node, bool } from 'prop-types'
import classNames from 'classnames'
import Node from './Node'

const Input = forwardRef(
	(
		{
			as = 'input',
			className,
			bg = true,
			round = true,
			size = 'normal',
			children,
			...rest
		},
		ref
	) => {
		return (
			<Node
				className={classNames(
					className,
					{
						'rounded-lg': round,
						'bg-gray-100': bg,
						'h-action py-3 lg:text-md': size === 'normal'
					},
					'border-2 leading-none border-transparent tracking-tight placeholder-opacity-100 placeholder-text-gray-700 transition-all'
				)}
				as={as}
				ref={ref}
				{...rest}
			>
				{children}
			</Node>
		)
	}
)

Input.propTypes = {
	className: string,
	as: string,
	round: bool,
	bg: bool,
	children: node,
	size: string
}

export default Input
