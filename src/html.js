import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable react/destructuring-assignment */

const removeNoJsClass =
	'var html=document.getElementsByTagName("html")[0];html.classList?html.classList.remove("no-js"):html.className=el.className.replace(new RegExp("(^|\\b)"+className.split(" ").join("|")+"(\\b|$)","gi")," ");'

export default class HTML extends React.Component {
	render() {
		return (
			<html className="no-js" lang="en" {...this.props.htmlAttributes}>
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<script dangerouslySetInnerHTML={{ __html: removeNoJsClass }} />
					{this.props.headComponents}
				</head>
				<body {...this.props.bodyAttributes}>
					{this.props.preBodyComponents}
					<div
						key="body"
						className="overflow-x-hidden w-full relative"
						id="___gatsby"
						dangerouslySetInnerHTML={{ __html: this.props.body }}
					/>
					{this.props.postBodyComponents}
				</body>
			</html>
		)
	}
}

/* eslint-disable react/require-default-props */

HTML.propTypes = {
	htmlAttributes: PropTypes.object,
	headComponents: PropTypes.array,
	bodyAttributes: PropTypes.object,
	preBodyComponents: PropTypes.array,
	body: PropTypes.string,
	postBodyComponents: PropTypes.array
}
