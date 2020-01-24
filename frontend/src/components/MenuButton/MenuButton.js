import React, { useContext } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import styles from './MenuButton.module.css'
import VisuallyHidden from '@/utils/VisuallyHidden'
import { NavContext } from '@/container/NavProvider'

function MenuButton({ className, ...rest }) {
	const { isOpen, setOpen } = useContext(NavContext)

	return (
		<button
			onClick={e => {
				e.preventDefault()
				setOpen(!isOpen)
			}}
			type="button"
			className={classNames(
				styles.container,
				'relative flex flex-col items-center justify-center',
				{
					'text-blue-500 focus:text-blue-800 hover:text-blue-600': !isOpen,
					'text-white focus:text-white hover:text-white': isOpen
				},
				className
			)}
			aria-expanded={isOpen}
			{...rest}
		>
			<span
				className={classNames(
					styles.line,
					{
						[styles.topClosed]: !isOpen,
						[styles.topOpen]: isOpen
					},
					'absolute top-0 bottom-0 my-auto bg-current'
				)}
			/>
			<span
				className={classNames(
					styles.line,
					{
						[styles.middleClosed]: !isOpen,
						[styles.middleOpen]: isOpen
					},
					'absolute top-0 bottom-0 my-auto bg-current'
				)}
			/>
			<span
				className={classNames(
					styles.line,
					{
						[styles.bottomClosed]: !isOpen,
						[styles.bottomOpen]: isOpen
					},
					'absolute top-0 bottom-0 my-auto bg-current'
				)}
			/>
			<VisuallyHidden>Menu</VisuallyHidden>
		</button>
	)
}

MenuButton.propTypes = {
	className: string
}

export default MenuButton
