import React from 'react'
import { func, bool } from 'prop-types'
// import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Link from '@/utils/Link'
import Modal from '@/components/Modal'
import Cart from '@/components/Cart'
import IconWrapper from '@/utils/IconWrapper'
import DeleteIcon from '@/icons/delete.svg'
import CartIcon from '@/icons/cart.svg'
import Button from '@/components/Button'
import { format } from '@/utils'

function FullCart({ isCartOpen, setCartOpen }) {
	const { total, current_campaign, basket } = useSelector(state => state.cart)
	const cart = basket[current_campaign]

	return (
		<Modal
			overlayClassName="fixez inset-0 w-full"
			aria={{
				labelledby: 'select-school-heading',
				describedby: 'select-school-options'
			}}
			isModalOpen={isCartOpen}
			setModalOpen={setCartOpen}
			contentLabel="Select School modal"
			className="flex flex-col items-center h-full max-w-md ml-auto"
		>
			<div className="w-full h-full px-4 py-8 bg-blue-100 md:py-12 md:px-12">
				<IconWrapper
					icon={DeleteIcon}
					className="absolute w-3 h-3 top-4 right-4"
					as="button"
					type="button"
					onClick={() => setCartOpen(false)}
				/>
				<div className="flex flex-col w-full h-full">
					<Cart
						theme="white"
						current_campaign={current_campaign}
						basket={cart}
						className="flex-grow mb-16 overflow-auto"
						backgroundColor="bg-blue-100"
						stickyHead
					/>
					<div className="mt-auto">
						{!!total && (
							<Button
								to="/checkout/"
								as={Link}
								onClick={() => setCartOpen(false)}
								className="w-full mb-6"
							>
								<IconWrapper icon={CartIcon} className="w-4 mr-4" />
								Checkout
							</Button>
						)}
						{cart && (
							<p className="max-w-xs mx-auto text-sm text-center text-gray-700">
								Thanks to you, {format(cart.contribution_amount)} from your
								purchase is being donated to {cart.organisation}!
							</p>
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}

FullCart.propTypes = {
	setCartOpen: func.isRequired,
	isCartOpen: bool.isRequired
}

export default FullCart
