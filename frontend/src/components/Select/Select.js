import React, { forwardRef } from 'react'
import { string, shape, number, oneOfType, arrayOf, oneOf } from 'prop-types'
import classNames from 'classnames'

const Select = forwardRef(
	({ className, options = [], size = 'large', error, ...inputProps }, ref) => {
		return (
			<div className={classNames('relative', className)}>
				<select
					ref={ref}
					className={classNames(
						'h-full block appearance-none w-full bg-white border-2 border-gray-300 text-black py-3 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500',
						{
							'pl-6': size === 'large',
							'pl-3': size === 'small',
							'border-gray-300': !error,
							'border-red-600': !!error
						}
					)}
					{...inputProps}
				>
					<option value="select" disabled>
						Select
					</option>
					{options.map(({ id, value }) => (
						<option value={id} key={id}>
							{value}
						</option>
					))}
				</select>
				<div className="absolute inset-y-0 right-0 flex items-center px-4 text-black pointer-events-none">
					<svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>
		)
	}
)

Select.propTypes = {
	className: string,
	options: arrayOf(
		shape({
			id: oneOfType([string, number]).isRequired,
			value: string.isRequired
		})
	),
	size: oneOf(['small', 'large']),
	error: shape({
		message: string
	})
}

export default Select
