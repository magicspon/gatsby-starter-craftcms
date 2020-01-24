import React from 'react'
import classNames from 'classnames'
import { string, number, oneOfType } from 'prop-types'

function List({ totalFunds, totalOrders, bonuses, remaining, className }) {
	return (
		<dl
			className={classNames(
				'text-black border-t font-sans-semi sm:text-xl',
				className
			)}
		>
			<div className="flex justify-between py-6 border-b">
				<dt>Funds raised to date</dt>
				<dd>{totalFunds}</dd>
			</div>
			<div className="flex justify-between py-6 border-b">
				<dt>Total number of orders</dt>
				<dd>{totalOrders}</dd>
			</div>
			{bonuses && (
				<div className="flex justify-between py-6 border-b">
					<dt>Bonuses earned</dt>
					<dd>{bonuses}</dd>
				</div>
			)}
			<div className="flex justify-between py-6 border-b">
				<dt>Days remaining</dt>
				<dd>{remaining}</dd>
			</div>
		</dl>
	)
}

List.propTypes = {
	totalFunds: string.isRequired,
	totalOrders: oneOfType([number, string]).isRequired,
	bonuses: string,
	remaining: string.isRequired,
	className: string
}

export default List
