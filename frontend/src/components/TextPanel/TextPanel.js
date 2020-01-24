import React from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import RichText from '@/utils/RichText'
import Box from '@/components/Box'

function TextPanel({ className, heading, body }) {
	return (
		<Box className={classNames(className)}>
			<h3 className="mb-6 text-xl font-sans-semi md:text-2xl leading-tight">
				{heading}
			</h3>
			<RichText dangerouslySetInnerHTML={{ __html: body }} />
		</Box>
	)
}

TextPanel.propTypes = {
	className: string,
	heading: string.isRequired,
	body: string.isRequired
}

export default TextPanel
