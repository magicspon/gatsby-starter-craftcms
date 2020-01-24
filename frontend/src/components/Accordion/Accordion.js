import React, { createContext, useState, useContext } from 'react'
import { node, func, oneOfType, string, number } from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'

export const AccordionContext = createContext()

export function AccordionProvider({ children, initialIndex }) {
	const [currentIndex, setIndex] = useState(initialIndex)
	return (
		<AccordionContext.Provider value={{ currentIndex, setIndex }}>
			{children}
		</AccordionContext.Provider>
	)
}

AccordionProvider.propTypes = {
	children: node.isRequired,
	initialIndex: number
}

export function AccordionItem({ children, index, className }) {
	const { currentIndex, setIndex } = useContext(AccordionContext)
	return (
		<div className={classNames('overflow-hidden', className)}>
			<AnimatePresence initial={false}>
				{currentIndex === index && (
					<motion.div
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 }
						}}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						{typeof children === 'function'
							? children({ currentIndex, setIndex })
							: children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

AccordionItem.propTypes = {
	className: string,
	children: oneOfType([node, func]).isRequired,
	index: number.isRequired
}

export function AccordionButton({
	index,
	className,
	children,
	activeClassName
}) {
	const { setIndex, currentIndex } = useContext(AccordionContext)
	return (
		<button
			type="button"
			onClick={() => {
				const next = currentIndex === index ? false : index
				setIndex(next)
			}}
			className={classNames(className, {
				[activeClassName]: currentIndex === index
			})}
		>
			{typeof children === 'function' ? children({ currentIndex }) : children}
		</button>
	)
}

AccordionButton.propTypes = {
	className: string,
	activeClassName: string,
	children: oneOfType([node, func]).isRequired,
	index: number.isRequired
}
