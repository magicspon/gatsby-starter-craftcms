import React from 'react'
import ImageTextPanel from './ImageTextPanel'

export default {
	title: 'content|ImageTextPanel',

	parameters: {
		component: ImageTextPanel
	}
}

export const basic = () => (
	<ImageTextPanel
		image={{
			src: '/images/cancer-society.png',
			alt: 'Product image',
			width: 214,
			height: 195
		}}
		title="About Cancer Society Sunscreen"
		content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, egestas amet blandit cras tincidunt. Tempus posuere vel in scelerisque sagittis, ut metus, consectetur quis. Laoreet nisi, lorem auctor ipsum molestie orci amet eget diam. Quis sapien interdum feugiat leo  orci amet eget diam."
	/>
)
