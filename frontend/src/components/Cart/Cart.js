import React from 'react'
import { string, bool, number, shape, arrayOf } from 'prop-types'
import { values } from 'ramda'
import classNames from 'classnames'
import CartItem from '@/components/CartItem'
import { format } from '@/utils'
import * as T from '@/types'

function Cart({
	theme,
	className,
	active = true,
	backgroundColor = 'bg-white',
	current_campaign,
	basket,
	stickyHead
}) {
	const { line_items, subtotal, total } = basket
	const items = values(line_items).map(
		({ sale_item_price, quantity, ...rest }) => ({
			...rest,
			quantity,
			price: format(sale_item_price * quantity)
		})
	)

	return (
		<div className={className}>
			<h3
				className={classNames(
					'mb-6 text-xl font-sans-semi z-30 py-2',
					{ 'sticky top-0': stickyHead },
					backgroundColor
				)}
			>
				Shopping Cart
			</h3>
			<ul className="mb-3" tabIndex="-1">
				{items.map(item => (
					<li
						className="pb-3 mb-3 border-b border-gray-300 last:border-0 last:mb-0"
						key={item.id}
					>
						<CartItem
							theme={theme}
							active={active}
							campaign_id={current_campaign}
							image={{
								width: item.image_width,
								height: item.image_height,
								src: item.image,
								alt: item.image_alt
							}}
							title={item.name}
							price={item.price}
							quantity={item.quantity}
							id={item.id}
						/>
					</li>
				))}
			</ul>
			<div className={classNames('sticky bottom-0 z-30', backgroundColor)}>
				<div className="flex items-baseline justify-between py-3 mb-4 border-b border-gray-300">
					<span className="text-base text-black font-sans-semi">Subtotal</span>
					<span className="text-sm text-gray-700">{format(subtotal)}</span>
				</div>

				<div className="flex items-baseline justify-between py-3">
					<span className="text-gray-700 text-md ">Total</span>
					<span className="text-base text-black font-sans-semi">
						{format(total)}
					</span>
				</div>
			</div>
		</div>
	)
}

Cart.propTypes = {
	active: bool,
	className: string,
	theme: string,
	backgroundColor: string,
	current_campaign: number,
	basket: shape({
		total: number.isRequired,
		subtotal: number.isRequired,
		contribution_amount: number.isRequired,
		line_items: arrayOf(T.cartItem)
	}),
	stickyHead: bool
}

export default Cart
