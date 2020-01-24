/* eslint-disable react/no-danger, react/forbid-prop-types */

import React from 'react'
import { object, array, string } from 'prop-types'

export default function HTML({
	htmlAttributes,
	headComponents,
	bodyAttributes,
	preBodyComponents,
	body,
	postBodyComponents
}) {
	return (
		<html lang="en" {...htmlAttributes}>
			<head>
				<link
					rel="preload"
					href="/fonts/Inter-Medium.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/Inter-Regular.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/Inter-SemiBold.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				{/* <link
					rel="preload"
					href="/fonts/Inter-Bold.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/> */}
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				{headComponents}
			</head>
			<body {...bodyAttributes}>
				{preBodyComponents}
				<noscript key="noscript" id="gatsby-noscript">
					This app works best with JavaScript enabled.
				</noscript>
				<div
					key="body"
					id="___gatsby"
					dangerouslySetInnerHTML={{ __html: body }}
				/>
				{postBodyComponents}
			</body>
		</html>
	)
}

HTML.propTypes = {
	htmlAttributes: object,
	headComponents: array,
	bodyAttributes: object,
	preBodyComponents: array,
	body: string,
	postBodyComponents: array
}
