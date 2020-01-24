import React from 'react'
import InputUpload from './InputUpload'

export default {
	title: 'fields|InputUpload',

	parameters: {
		component: InputUpload
	}
}

export const basic = () => (
	<InputUpload name="upload" id="upload" className="w-full">
		Choose file
	</InputUpload>
)
