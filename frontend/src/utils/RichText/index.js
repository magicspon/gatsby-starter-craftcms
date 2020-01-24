/* eslint-disable react/no-danger */
import React, { forwardRef } from 'react'
import { string, node } from 'prop-types'
import classNames from 'classnames'
import marked from 'marked'
import styles from './RichText.module.css'
import useConstant from '@/hooks/useConstant'

const RichText = forwardRef(
	({ className, markdown, children, ...props }, ref) => {
		const content = useConstant(() => (markdown ? marked(markdown) : false))
		return (
			<div
				className={classNames(className, styles.content)}
				dangerouslySetInnerHTML={content ? { __html: content } : undefined}
				{...props}
				ref={ref}
			>
				{children}
			</div>
		)
	}
)

RichText.propTypes = {
	children: node,
	className: string,
	markdown: string
}

export default RichText
