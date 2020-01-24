import React, { useEffect } from 'react'
import {
	node,
	number,
	string,
	bool,
	shape,
	object,
	func,
	oneOfType
} from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import usePrevious from '@/hooks/usePrevious'
import { containerVariants } from './transitions'

function AnimateEntrance({
	name, // for debugging purposes only
	children,
	threshold = 0.1,
	rootMargin = '100px 0px',
	triggerOnce = true,
	variants = containerVariants,
	as = 'div',
	onEnter,
	...props
}) {
	const [ref, inView] = useInView({ threshold, rootMargin, triggerOnce })
	const Tag = motion[as]
	const prevInview = usePrevious(inView)

	useEffect(() => {
		if (prevInview !== inView) {
			if (inView && typeof onEnter === 'function') {
				onEnter()
			}
		}
	}, [inView, name, onEnter, prevInview])

	return (
		<Tag
			initial="hide"
			ref={ref}
			variants={variants}
			animate={inView ? 'show' : 'hide'}
			{...props}
		>
			{children}
		</Tag>
	)
}

AnimateEntrance.propTypes = {
	children: node.isRequired,
	threshold: number,
	rootMargin: string,
	triggerOnce: bool,
	variants: shape({
		show: oneOfType([func, object]).isRequired,
		hide: oneOfType([func, object]).isRequired
	}),
	name: string,
	as: string,
	onEnter: func
}

export default AnimateEntrance
