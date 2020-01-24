import React, { forwardRef } from 'react'
import { oneOfType, string, bool } from 'prop-types'

const FormError = forwardRef(({ error }, ref) => {
	return (
		<div ref={ref}>
			{error && (
				<div className="p-4 mb-4 text-sm text-white bg-red-400 rounded-lg">
					{error}
				</div>
			)}
		</div>
	)
})

FormError.propTypes = {
	error: oneOfType([bool, string])
}

export default FormError
