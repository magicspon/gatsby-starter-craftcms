import React from 'react'
import TextPanel from './TextPanel'

export default {
	title: 'content|TextPanel',

	parameters: {
		component: TextPanel
	}
}

export const basic = () => (
	<TextPanel
		heading="School Registration"
		body={`<p>To register your organisation with <a href="#0">GoodGive</a>, please complete the steps below: </p><p>1. Complete and submit the online registration form below</p><p>2. In some cases, we may need to contact your organisation to complete 	the registration. </p>`}
	/>
)
