import React, { useEffect, forwardRef, useContext } from 'react'
import { string, bool, func, node } from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import useDimensions from 'react-use-dimensions'
import useCache from '@/hooks/useCache'
import { NavContext } from '@/container/NavProvider'
import CartLink from '@/components/CartLink'
import useMediaQuery from '@/hooks/useMediaQuery'
import Link from '@/utils/Link'
import useLogout from '@/hooks/useLogout'
import { stripSlashes } from '@/utils'

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 750, velocity: 500 }
		}
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 }
		}
	},
	initial: {
		opacity: 1,
		y: 0
	}
}

const listVariants = {
	open: {
		opacity: 1,
		visibility: 'visible',
		transition: { staggerChildren: 0.07, delayChildren: 0.2 }
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
		opacity: 0
	},
	initial: {
		opacity: 1
	}
}

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 20
		}
	}),
	closed: {
		clipPath: 'circle(30px at 100% 0)',
		opacity: 0,
		transition: {
			delay: 0.1,
			type: 'spring',
			stiffness: 400,
			damping: 40
		}
	}
}

const MenuItem = forwardRef(
	(
		{
			className,
			children,
			onClick,
			last = false,
			slug,
			shouldAnimate = false,
			linkClassName = 'lg:text-gray-700'
		},
		ref
	) => {
		return (
			<motion.li
				variants={variants}
				whileHover={{ scale: shouldAnimate ? 1.1 : 1 }}
				whileTap={{ scale: shouldAnimate ? 0.95 : 1 }}
				className={classNames(
					className,
					'text-xl lg:text-md text-center lg:ml-6 xl:ml-8',
					{
						'py-4 lg:py-0': !last
					}
				)}
			>
				<Link
					onClick={onClick}
					to={slug}
					ref={ref}
					className={classNames(
						'relative block tracking-tight text-white lg:text-black lg:py-2 font-sans-medium focus:outline-none hocus:underline',
						linkClassName
					)}
					activeClassName="underline"
				>
					{children}
				</Link>
			</motion.li>
		)
	}
)

MenuItem.propTypes = {
	className: string,
	children: node.isRequired,
	last: bool,
	onClick: func.isRequired,
	slug: string.isRequired,
	shouldAnimate: bool,
	linkClassName: string
}

const baseLinks = [
	{ text: 'Shop Now', slug: '/shop/' },
	// { text: 'For Schools', slug: '/for-schools/' },
	{ text: 'For Supporters', slug: '/for-supporters/' }
]

const adminLinks = [
	{
		text: 'Overview',
		slug: '/overview/'
	},
	{ text: 'Onboarding', slug: '/onboarding/' },
	{ text: 'Resource Centre', slug: '/resource-centre/' }
]

const parentLinks = [
	{
		text: 'Shop',
		slug: '/shop/'
	}
]

function Nav({ path, showCartLink, isHome, ...rest }) {
	const { isLoggedIn, isAdmin, isParent } = useSelector(({ user }) => user)
	const logout = useLogout()
	const cleanPath = stripSlashes(path)
	const showAccountLink = isAdmin || isParent

	const { isOpen, setOpen } = useContext(NavContext)
	const shouldNotAnimate = useMediaQuery('(min-width: 64em)')
	const [navRef, navSize] = useDimensions()
	const menu = useCache(() => {
		if (baseLinks.some(link => link.slug.includes(cleanPath))) {
			return baseLinks
		}

		if (isParent) {
			return parentLinks
		}

		if (isAdmin) {
			return adminLinks
		}

		return baseLinks
	}, [path, isLoggedIn])

	useEffect(() => {
		if (isOpen && shouldNotAnimate) {
			setOpen(false)
		}
	}, [shouldNotAnimate, isOpen, setOpen])

	const onClick = () => {
		if (isOpen) setOpen(false)
	}

	const { height } = navSize

	return (
		<motion.nav
			ref={navRef}
			initial={false}
			animate={isOpen ? 'open' : !shouldNotAnimate ? 'closed' : 'initial'}
			custom={height}
			aria-hidden={isOpen}
			className="absolute inset-0 w-full lg:relative"
			role={!shouldNotAnimate ? 'dialog' : undefined}
			{...rest}
		>
			<motion.div
				className="absolute top-0 right-0 w-full h-screen bg-blue-600 opacity-0 pointer-events-none h-window lg:hidden"
				variants={sidebar}
				initial="closed"
				aria-hidden
			/>
			<div
				className={classNames(
					'h-screen h-window absolute inset-0 flex flex-col items-center justify-center',
					'lg:h-auto lg:static lg:flex-row lg:justify-end lg:pointer-events-auto',
					{ 'pointer-events-none ': !isOpen }
				)}
			>
				<motion.ul
					variants={listVariants}
					className="invisible lg:flex lg:visible"
				>
					{menu.map(item => (
						<MenuItem
							key={item.text}
							onClick={onClick}
							slug={item.slug}
							shouldAnimate={!shouldNotAnimate}
							linkClassName={isHome ? 'lg:text-white' : undefined}
						>
							{item.text}
						</MenuItem>
					))}
					{showAccountLink && (
						<MenuItem
							onClick={onClick}
							slug={isAdmin ? '/overview/' : '/students/'}
							shouldAnimate={!shouldNotAnimate}
							linkClassName={isHome ? 'lg:text-white' : undefined}
						>
							My account
						</MenuItem>
					)}
					<MenuItem
						onClick={isLoggedIn ? logout : onClick}
						slug={isLoggedIn ? '/logout/' : '/login/'}
						shouldAnimate={!shouldNotAnimate}
						linkClassName={isHome ? 'lg:text-white' : undefined}
					>
						{isLoggedIn ? 'Logout' : 'Login'}
					</MenuItem>

					{showCartLink && !isAdmin && isLoggedIn && (
						<li
							className={classNames(
								'hidden text-xl text-center lg:block lg:text-md lg:ml-8'
							)}
						>
							<CartLink isHome={isHome} />
						</li>
					)}
				</motion.ul>
			</div>
		</motion.nav>
	)
}

Nav.propTypes = {
	path: string.isRequired,
	showCartLink: bool,
	isHome: bool
}

export default Nav
