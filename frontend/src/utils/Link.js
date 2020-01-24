import React, { forwardRef } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { node, string, bool } from 'prop-types'
// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = forwardRef(({ children, to, activeClassName, ...other }, ref) => {
	// Tailor the following test to your environment.
	// This example assumes that any internal link (intended for Gatsby)
	// will start with exactly one slash, and that anything else is external.
	const internal = /^\/(?!\/)/.test(to)
	// Use Gatsby Link for internal links, and <a> for others
	if (internal) {
		return (
			<GatsbyLink
				to={to}
				activeClassName={activeClassName}
				{...other}
				ref={ref}
			>
				{children}
			</GatsbyLink>
		)
	}
	return (
		<a href={to} target="_blank" rel="noopener noreferrer" ref={ref} {...other}>
			{children}
		</a>
	)
})

Link.propTypes = {
	children: node.isRequired,
	to: string.isRequired,
	activeClassName: string,
	partiallyActive: bool
}

export default Link
