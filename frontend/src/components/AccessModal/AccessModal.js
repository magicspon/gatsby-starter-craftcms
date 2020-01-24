import React, { useState, useCallback } from 'react'
import { func, bool, shape, string, number } from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { navigate } from 'gatsby'
import Modal from '@/components/Modal'
import Switch from '@/utils/Switch'
import FormLogin from '@/components/FormLogin'
import FormRegisterSupporter from '@/components/FormRegisterSupporter'
import Box from '@/components/Box'
import { fade } from '@/utils/transitions'

const AnimateBox = motion.custom(Box)

function AccessModal({ isOpen, setOpen, fields, campaign_id, organisation }) {
	const [view, setView] = useState('login')
	const dispatch = useDispatch()

	const onSuccessLogin = useCallback(async () => {
		const basket = await dispatch({
			type: 'cart/REQUEST_ADD_TO_CART',
			payload: {
				variant: { id: fields.variant },
				quantity: parseInt(fields.quantity, 10),
				campaign_id,
				organisation
			}
		})
		if (basket === true) {
			navigate('/checkout/')
		}
	}, [campaign_id, dispatch, fields.quantity, fields.variant, organisation])

	const onSuccessRegister = useCallback(() => {
		onSuccessLogin()
	}, [onSuccessLogin])

	return (
		<Modal
			overlayClassName="fixez inset-0 w-full flex items-center"
			aria={{
				labelledby: 'login-button',
				describedby: 'login-form'
			}}
			isModalOpen={isOpen}
			setModalOpen={setOpen}
			contentLabel="Add student email address"
			className="flex items-center justify-center max-w-md mx-auto"
		>
			<AnimatePresence exitBeforeEnter initial={false}>
				<Switch test={view}>
					<motion.div
						variants={fade}
						initial="initial"
						animate="enter"
						exit="exit"
						case="login"
						id="login-form"
					>
						<FormLogin
							className="shadow"
							legend="Login"
							name="supporter"
							showCreateAccountLink
							createUrl="/register/"
							redirect={false}
							setView={setView}
							onProductLogin={onSuccessLogin}
						/>
					</motion.div>

					<AnimateBox
						variants={fade}
						initial="initial"
						animate="enter"
						exit="exit"
						case="create"
						className="w-full max-w-xl p-4 mx-auto shadow md:p-8"
					>
						<FormRegisterSupporter
							onProductLogin={onSuccessRegister}
							setView={setView}
						/>
					</AnimateBox>
				</Switch>
			</AnimatePresence>
		</Modal>
	)
}

AccessModal.propTypes = {
	isOpen: bool.isRequired,
	setOpen: func.isRequired,
	fields: shape({
		variant: string,
		quantity: string
	}).isRequired,
	campaign_id: number.isRequired,
	organisation: string.isRequired
}

export default AccessModal
