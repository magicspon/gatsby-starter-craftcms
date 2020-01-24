import React, { forwardRef } from 'react'
import { string, node, oneOf } from 'prop-types'
import classNames from 'classnames'
import Node from './Node'

const propTypes = {
	children: node.isRequired,
	as: string.isRequired,
	className: string
}

export const Heading = forwardRef(
	({ children, as, className, scale = 'h1' }, ref) => {
		return (
			<Node
				className={classNames(className, 'font-sans-semi tracking-tightest', {
					'text-2xl leading-none md:text-3xl lg:text-4xl': scale === 'h1',
					'text-xl leading-tightest md:text-2xl lg:text-3xl': scale === 'h2',
					'text-lg leading-tightest md:text-xl lg:text-2xl': scale === 'h3'
				})}
				as={as}
				ref={ref}
			>
				{children}
			</Node>
		)
	}
)

Heading.propTypes = { ...propTypes, scale: oneOf(['h1', 'h2', 'h3']) }

export const SubHeading = forwardRef(({ children, as, className }, ref) => {
	return (
		<Node
			className={classNames(
				className,
				'font-sans-semi text-md leading-tightest'
			)}
			as={as}
			ref={ref}
		>
			{children}
		</Node>
	)
})

SubHeading.propTypes = propTypes

export const Text = forwardRef(
	({ children, as = 'p', className, ...rest }, ref) => {
		return (
			<Node
				className={classNames(
					className,
					'font-sans text-base text-black leading-snug tracking-tight md:text-md'
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

Text.propTypes = {
	children: node,
	as: string,
	className: string
}
