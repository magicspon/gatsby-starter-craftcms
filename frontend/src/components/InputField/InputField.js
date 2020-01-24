import React, { forwardRef } from 'react'
import { string, oneOf, shape } from 'prop-types'
import classNames from 'classnames'
import IconWrapper from '@/utils/IconWrapper'
import EmailIcon from '@/icons/email.svg'
import PasswordIcon from '@/icons/password.svg'
import Input from '@/utils/Input'

const InputField = forwardRef(
	(
		{
			className,
			inputClassName,
			placeholder,
			type = 'text',
			icon,
			error,
			...rest
		},
		ref
	) => {
		const Icon =
			icon === 'email' ? EmailIcon : icon === 'password' ? PasswordIcon : null
		const iconWidth = icon === 'email' ? 'w-5' : 'w-4'

		return (
			<div className={classNames('relative', className)}>
				{Icon && (
					<IconWrapper
						icon={Icon}
						className="absolute inset-y-0 flex items-center justify-center w-5 left-5"
						svgClassName={iconWidth}
					/>
				)}
				<Input
					as="input"
					type={type}
					placeholder={placeholder}
					className={classNames(inputClassName, 'w-full focus:outline-none', {
						'px-6': !icon,
						'pr-6 pl-12': icon,
						'border-red-600 focus:border-red-400': !!error,
						'focus:border-blue-500': !error
					})}
					ref={ref}
					{...rest}
				/>
			</div>
		)
	}
)

InputField.propTypes = {
	as: string,
	className: string,
	inputClassName: string,
	placeholder: string,
	type: oneOf(['text', 'email', 'tel', 'password']),
	icon: oneOf(['email', 'password']),
	error: shape({
		message: string
	})
}

export default InputField
