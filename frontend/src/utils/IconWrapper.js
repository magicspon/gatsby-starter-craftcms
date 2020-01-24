import React, { memo, forwardRef } from 'react'
import { func, oneOfType, string, node, element, object } from 'prop-types'
import classNames from 'classnames'
import Node from '@/utils/Node'
import useConstant from '@/hooks/useConstant'
const toNum = num => parseFloat(num, 10)

const IconWrapper = forwardRef(
	({ icon, className, svgClassName, as = 'span', label, ...props }, ref) => {
		const svg = React.createElement(icon, {
			className: classNames(svgClassName, 'absolute inset-0 h-full m-auto', {
				'fill-current w-full': !svgClassName
			}),
			'aria-hidden': true
		})
		const { width, height, viewBox } = svg.props

		const ratio = useConstant(() => {
			const size = viewBox ? viewBox.split(' ').slice(2) : [width, height]
			return size
				.map(val => toNum(val))
				.reduceRight((y, x) => `${(y / x) * 100}%`)
		})

		return (
			<Node
				ref={ref}
				as={as}
				{...props}
				className={classNames(className, 'block')}
			>
				<span
					className="relative block w-full h-0"
					style={{ paddingTop: ratio }}
				>
					{svg}
					{label && <span className="sr-only">{label}</span>}
				</span>
			</Node>
		)
	}
)

IconWrapper.propTypes = {
	className: string,
	svgClassName: string,
	as: oneOfType([func, node, element, string, object]),
	label: string,
	icon: oneOfType([func, node, element]).isRequired
}

export default memo(IconWrapper)
