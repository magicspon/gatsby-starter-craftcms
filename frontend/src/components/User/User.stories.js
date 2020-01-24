import React from 'react'
import User from './User'

export default {
	title: 'ui|User',

	parameters: {
		component: User
	}
}

export const basic = () => (
	<User
		image="/images/face.jpg"
		name="Principal Sam Williams"
		school="Auckland Grammar"
	/>
)
