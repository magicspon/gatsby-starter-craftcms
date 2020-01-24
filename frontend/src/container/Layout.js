import React, { useContext } from 'react'
import { node, string, shape } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import classNames from 'classnames'
import { CookiesProvider } from 'react-cookie'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeContext } from '@/container/ThemeProvider'
import { fade } from '@/utils/transitions'
import '@/style/main.css'

function Layout({ children, location: { pathname } }) {
	const { theme } = useContext(ThemeContext)

	return (
		<CookiesProvider>
			<Helmet>
				<title>Goodgive</title>
			</Helmet>
			<div
				className={classNames('flex flex-col w-full min-h-full', {
					'bg-white': theme === 'white',
					'bg-light': theme === 'light'
				})}
			>
				<Header path={pathname} />
				<div className="flex flex-col w-full min-h-screen lg:min-h-2xl">
					<main className={classNames('w-full flex flex-col flex-grow')}>
						<AnimatePresence exitBeforeEnter initial={false}>
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
				<Footer />
			</div>
		</CookiesProvider>
	)
}

Layout.propTypes = {
	children: node.isRequired,
	location: shape({
		pathname: string.isRequired
	}).isRequired
}

export default Layout
