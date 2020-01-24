import React, { forwardRef } from 'react'
import { string, shape, node, func } from 'prop-types'
import classNames from 'classnames'
import Input from '@/utils/Input'
import IconWrapper from '@/utils/IconWrapper'
import Minus from '@/icons/minus.svg'
import Plus from '@/icons/plus.svg'

function Button({ children, className, onClick, size = 'normal' }) {
	return (
		<button
			onClick={onClick}
			type="button"
			className={classNames(
				'absolute inset-y-0 my-auto flex items-center justify-center z-10',
				className,
				{ 'h-10 w-10': size === 'normal' },
				{ 'h-5 w-5': size === 'small' }
			)}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: node.isRequired,
	className: string,
	onClick: func,
	size: string
}

const InputNumber = forwardRef(
	(
		{
			className,
			setValue,
			getValues,
			error,
			size = 'normal',
			name,
			...inputProps
		},
		ref
	) => {
		return (
			<div
				style={{ width: size === 'small' ? 80 : null }}
				className={classNames(
					className,
					'w-full border-2 border-gray-100 max-w-sm relative rounded-lg',
					{
						'border-red-600 focus-within:border-red-400': !!error,
						'focus-within:border-blue-500': !error
					}
				)}
			>
				<Button
					size={size}
					className="left-0 block focus:outline-none focus:text-blue-500"
					onClick={() => {
						const { quantity = 1 } = getValues()
						if (quantity > 1) setValue('quantity', parseInt(quantity, 10) - 1)
					}}
				>
					<IconWrapper
						icon={Minus}
						className={classNames({
							'w-3': size === 'normal',
							'w-2': size === 'small'
						})}
					/>
				</Button>
				<Input
					size={size}
					as="input"
					className={classNames(
						'text-center w-full appearance-none focus:outline-none bg-transparent py-1'
					)}
					placeholder="2"
					pattern="\d*"
					type="number"
					min="0"
					round={false}
					max="1000"
					ref={ref}
					name={name}
					bg={false}
					defaultValue="1"
					{...inputProps}
				/>
				<Button
					size={size}
					onClick={() => {
						const { quantity = 1 } = getValues()
						setValue('quantity', parseInt(quantity, 10) + 1)
					}}
					className="right-0 focus:outline-none focus:text-blue-500"
				>
					<IconWrapper
						icon={Plus}
						className={classNames({
							'w-3': size === 'normal',
							'w-2': size === 'small'
						})}
					/>
				</Button>
			</div>
		)
	}
)

InputNumber.propTypes = {
	className: string,
	name: string,
	setValue: func,
	getValues: func,
	error: shape({
		message: string
	}),
	size: string
}

export default InputNumber
