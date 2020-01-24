import React from 'react'
import { node, string, shape } from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { fade } from '@/utils/transitions'
import '@/style/main.css'

function Layout({ children, location: { pathname } }) {
	return (
		<div className="flex flex-col w-full min-h-screen lg:min-h-2xl">
			<main className="flex flex-col flex-grow w-full">
				<AnimatePresence exitBeforeEnter>
					<motion.div
						key={pathname}
						variants={fade}
						initial="initial"
						animate="enter"
						exit="exit"
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</main>
		</div>
	)
}

Layout.propTypes = {
	children: node.isRequired,
	location: shape({
		pathname: string.isRequired
	}).isRequired
}

export default Layout
