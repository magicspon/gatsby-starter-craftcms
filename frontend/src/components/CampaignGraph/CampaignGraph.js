import React, { useEffect } from 'react'
import classNames from 'classnames'
import { arrayOf, shape, number, string } from 'prop-types'
import { AreaChart, Area, CartesianGrid, ResponsiveContainer } from 'recharts'
// import { useStopwatch } from 'react-timer-hook'
// import { useDispatch } from 'react-redux'

function CampaignGraph({ data, className }) {
	// const { minutes } = useStopwatch({
	// 	autoStart: true
	// })
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	if (minutes > 0) dispatch({ type: 'user/REQUEST_UPDATE_CAMPAIGN' })
	// }, [dispatch, minutes])

	return (
		<div
			className={classNames(className)}
			style={{ width: '100%', height: 250 }}
		>
			<ResponsiveContainer>
				<AreaChart
					data={data}
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0
					}}
				>
					<CartesianGrid stroke="#DFE4EA" vertical={false} />
					<Area
						type="monotone"
						dataKey="value"
						stroke="#345DEE"
						strokeWidth={2}
						fill="#eef2f6"
						fillOpacity={0.7}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

CampaignGraph.propTypes = {
	data: arrayOf(shape({ value: number.isRequired })),
	className: string
}

export default CampaignGraph
