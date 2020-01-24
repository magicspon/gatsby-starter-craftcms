import React from 'react'
import Button from './Button'
import IconWrapper from '@/utils/IconWrapper'
import ArrowIcon from '@/icons/arrow.svg'
import CartIcon from '@/icons/cart.svg'

export default {
	title: 'ui|Button',

	parameters: {
		component: Button
	}
}

export const basic = () => <Button>Subscribe</Button>

export const fullWidth = () => <Button className="w-full">Subscribe</Button>

export const withIconLeft = () => (
	<Button type="button" as="button">
		<IconWrapper icon={CartIcon} className="w-4 mr-4" />
		Checkout
	</Button>
)

export const withIconRight = () => (
	<Button as="a" href="#0">
		Tell a friend
		<IconWrapper icon={ArrowIcon} className="w-4 ml-4" />
	</Button>
)

export const secondary = () => (
	<Button as="a" href="#0" theme="secondary">
		Back to campaign overview
	</Button>
)
