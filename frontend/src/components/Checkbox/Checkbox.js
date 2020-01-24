import React, { forwardRef } from 'react'
import { string, node, shape, oneOf } from 'prop-types'
import classNames from 'classnames'
import IconWrapper from '@/utils/IconWrapper'
import TickIcon from '@/icons/tick.svg'

const Checkbox = forwardRef(
	(
		{ className, id, name, children, error, type = 'checkbox', ...inputProps },
		ref
	) => {
		return (
			<label
				htmlFor={id}
				className={classNames(className, 'flex items-baseline')}
			>
				<div
					className={classNames(
						'w-5 h-5 rounded border-2 flex items-center mr-2 flex-shrink-0',
						{
							'border-red-600 focus-within:border-red-400': !!error,
							'border-blue-600 focus-within:border-blue-500': !error
						}
					)}
				>
					<input
						type={type}
						id={id}
						name={name}
						className="absolute opacity-0 checked:opacity-100 check-focus:text-blue-500"
						ref={ref}
						{...inputProps}
					/>
					<IconWrapper
						className={classNames(
							'w-3 h-3 flex items-center m-auto opacity-0',
							{ 'text-blue-600': !error, 'text-red-600': !!error }
						)}
						icon={TickIcon}
					/>
				</div>
				<span className="tracking-tight">{children}</span>
			</label>
		)
	}
)

Checkbox.propTypes = {
	className: string,
	id: string.isRequired,
	name: string.isRequired,
	children: node,
	error: shape({
		message: string
	}),
	type: oneOf(['checkbox', 'radio'])
}

export default Checkbox
