import React, { useEffect } from 'react'
import { bool, number, func, node, string, shape } from 'prop-types'
import classNames from 'classnames'
import ReactModal from 'react-modal'

function Modal({
	isModalOpen,
	aria,
	setModalOpen,
	children,
	contentLabel,
	overlayClassName = 'fixez inset-0 flex items-center justify-center bg-white-75',
	className,
	closeTimeoutMS = 500
}) {
	const onRequestClose = () => {
		setModalOpen(false)
	}

	useEffect(() => {
		if (window) {
			ReactModal.setAppElement(document.body)
		}
	}, [])

	return (
		<ReactModal
			isOpen={isModalOpen}
			onRequestClose={onRequestClose}
			closeTimeoutMS={closeTimeoutMS}
			aria={aria}
			contentLabel={contentLabel}
			style={{ overlay: { zIndex: 1000 } }}
			overlayClassName={overlayClassName}
			className={classNames('focus:outline-none', className)}
		>
			{children}
		</ReactModal>
	)
}

Modal.propTypes = {
	isModalOpen: bool.isRequired,
	setModalOpen: func.isRequired,
	children: node.isRequired,
	aria: shape({
		labelledby: string.isRequired,
		describedby: string.isRequired
	}).isRequired,
	overlayClassName: string,
	contentLabel: string.isRequired,
	className: string,
	closeTimeoutMS: number
}

export default Modal
