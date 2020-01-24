import React, { useContext } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import useHeadroom from '@/hooks/useHeadroom'
import MenuButton from '@/components/MenuButton'
import Nav from '@/components/Nav'
import { ThemeContext } from '@/container/ThemeProvider'
import IconWrapper from '@/utils/IconWrapper'
import Link from '@/utils/Link'
import LogoIcon from '@/icons/logo.svg'
import CartLink from '@/components/CartLink'
import styles from './Header.module.css'
function Header({ path }) {
	const { innerStyle, wrapper, state, node } = useHeadroom()
	const { isAdmin, isLoggged } = useSelector(({ user }) => user)
	const { total, current_campaign } = useSelector(({ cart }) => cart)
	const { theme } = useContext(ThemeContext)
	const showCartLink =
		!!(total && current_campaign) && !path.includes('/checkout')
	const isHome = path === '/'
	const bgWhite =
		!isHome &&
		(theme === 'white' || (state === 'pinned' && theme === 'product'))
	const bgLight = !isHome && theme === 'light'

	return (
		<header
			id="top"
			ref={node}
			className={classNames('w-full', styles.header)}
			style={{
				...wrapper,
				position: theme === 'product' || isHome ? 'absolute' : 'relative',
				zIndex: '90'
			}}
		>
			<div
				className={classNames({
					'bg-white': bgWhite,
					'bg-light': bgLight,
					'shadow-lg': state === 'pinned' && !isHome
				})}
				style={innerStyle}
			>
				<div className="flex items-center justify-between py-4 wrapper md:py-6">
					<IconWrapper
						label="Good Give"
						as={Link}
						to="/"
						icon={LogoIcon}
						className={classNames(
							'relative z-50 w-32 lg:w-48 focus:outline-none focus:text-blue-600',
							{ 'text-white': isHome }
						)}
					/>
					{showCartLink && !isAdmin && isLoggged && (
						<CartLink
							isHome={isHome}
							className="relative z-10 ml-auto mr-4 text-md lg:hidden"
						/>
					)}
					<MenuButton aria-controls="site-nav" className="z-50 lg:hidden" />
					<Nav
						isHome={isHome}
						showCartLink={showCartLink}
						path={path}
						id="site-nav"
					/>
				</div>
			</div>
		</header>
	)
}

Header.propTypes = {
	path: string.isRequired
}

export default Header
