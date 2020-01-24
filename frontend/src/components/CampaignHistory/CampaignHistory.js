import React from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import { format } from '@/utils'

import * as T from '@/types'

function CampaignHistory({ data, className }) {
	return (
		<div className={classNames(className)}>
			<h3 className="mb-4 text-xl font-sans-semi">Campaign History</h3>
			<table className="w-full border-t border-collapse">
				<tbody>
					{data.map(item => (
						<tr
							className="flex flex-wrap py-2 mb-4 border-b md:table-row"
							key={item.id}
						>
							<td className="block w-full text-xl md:w-auto md:text-base font-sans-semi md:font-sans md:table-cell md:border-b md:py-2">
								{item.title}
							</td>
							<td className="block md:border-b md:py-2 md:table-cell">
								<span className="text-sm font-sans-medium md:font-sans">
									{item.start_date}
								</span>
							</td>
							<td className="block md:border-b md:py-2 md:table-cell">
								<span className="md:hidden">-</span>
								<span className="text-sm font-sans-medium md:font-sans">
									{item.end_date}
								</span>
							</td>
							<td className="block w-full md:border-b md:py-2 md:w-auto text-md font-sans-medium md:font-sans md:table-cell md:text-base md:max-w-3xs">
								{item.products.join(',')}
							</td>
							<td className="flex items-baseline justify-between block w-full md:border-b md:py-2 md:w-auto md:table-cell md:pl-8">
								<span className="mr-4 md:hidden">Total</span>
								<span className="text-xl md:text-base">
									{format(item.amount_in_cents)}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

CampaignHistory.propTypes = {
	data: T.campaigns,
	className: string
}

export default CampaignHistory
