import React from 'react'
import wrapWithProvider from './src/store/provider'

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link
			key="gatsby-plugin-craft-sitemap"
			rel="sitemap"
			type="application/xml"
			href="/sitemap.xml"
		/>
	])
}

export const wrapRootElement = wrapWithProvider


