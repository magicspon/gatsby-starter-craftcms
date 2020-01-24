import React, { forwardRef } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'

const Spinner = forwardRef(
	({ className = 'w-10 h-10 my-auto text-blue-600', ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={classNames(
					'spinner-icon border-t-2 border-l-2 border-current',
					className
				)}
				{...props}
			/>
		)
	}
)

Spinner.propTypes = {
	className: string
}

export default Spinner
