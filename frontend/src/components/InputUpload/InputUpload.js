import React, { forwardRef } from 'react'
import { string, node, shape, object, func } from 'prop-types'
import classNames from 'classnames'
import Button from '@/components/Button'
import IconWrapper from '@/utils/IconWrapper'
import TickIcon from '@/icons/tick.svg'
import DeleteIcon from '@/icons/delete.svg'

const InputUpload = forwardRef(
	(
		{ children, name, id, error, className, files, setValue, ...props },
		ref
	) => {
		const file = files && files[0]
		return (
			<>
				<Button
					type="button"
					className={classNames('relative', className, {
						'border-red-600': !!error
					})}
					theme={error ? 'error' : 'primary'}
				>
					{children}
					{file && (
						<IconWrapper
							icon={TickIcon}
							className="absolute inset-y-0 flex items-center w-4 right-4"
						/>
					)}
					<input
						name={name}
						id={id}
						type="file"
						className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
						ref={ref}
						{...props}
					/>
				</Button>
				{file && (
					<div className="flex items-center justify-between max-w-sm mt-2">
						<p className="text-sm text-pale">{file.name}</p>
						<IconWrapper
							as="button"
							type="button"
							icon={DeleteIcon}
							className="w-3 text-pale"
							onClick={() => {
								setValue(name, null)
							}}
						/>
					</div>
				)}
			</>
		)
	}
)

InputUpload.propTypes = {
	children: node.isRequired,
	name: string.isRequired,
	id: string.isRequired,
	className: string,
	error: shape({
		message: string
	}),
	// eslint-disable-next-line react/forbid-prop-types
	files: object,
	setValue: func
}

export default InputUpload
