import React, { forwardRef } from 'react'
import { string, node, oneOf, oneOfType, func, object } from 'prop-types'
import classNames from 'classnames'
import Node from '@/utils/Node'

const Button = forwardRef(
	({ className, as = 'button', theme = 'primary', children, ...rest }, ref) => {
		return (
			<Node
				as={as}
				className={classNames(
					className,
					'relative text-center inline-flex min-h-action lg:text-md leading-tight items-center border-2 border-transparent justify-center py-3 px-6 rounded-lg font-sans-semi tracking-tight transition-all overflow-hidden group focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
					{
						'bg-blue-600 text-white hocus:bg-white hocus:border-blue-600 hocus:text-blue-600':
							theme === 'primary',

						'bg-white text-blue-600 text-primary hocus:bg-blue-600 hocus:border-white hocus:text-white':
							theme === 'white',

						'text-blue-600 border-2 border-blue-600 hocus:border-black hocus:text-black':
							theme === 'secondary',

						'text-white bg-blue-600 border-2 border-white hocus:bg-white hocus:text-blue-600':
							theme === 'box',

						'text-red-600 border-2 border-red-600 hocus:border-black hocus:text-black':
							theme === 'error'
					}
				)}
				ref={ref}
				{...rest}
			>
				{children}
			</Node>
		)
	}
)

Button.propTypes = {
	className: string,
	as: oneOfType([string, node, object, func]),
	children: node.isRequired,
	theme: oneOf(['primary', 'secondary', 'error', 'white', 'box'])
}

export default Button
