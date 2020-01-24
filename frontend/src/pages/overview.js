/* eslint-disable react/no-danger */
import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { shape, string } from 'prop-types'
// import { useStopwatch } from 'react-timer-hook'
// import { useDispatch } from 'react-redux'
import { ThemeContext } from '@/container/ThemeProvider'
import Button from '@/components/Button'
import Box from '@/components/Box'
import CampaignGraph from '@/components/CampaignGraph'
import List from '@/components/List'
import CampaignHistory from '@/components/CampaignHistory'
import withAuth from '@/utils/withAuth'
import useConstant from '@/hooks/useConstant'
import * as T from '@/types'
import { format, isBrowser } from '@/utils'
import Link from '@/utils/Link'

function Overview({
	organisation: { name, logo_url },
	campaign: {
		chart_data,
		start_date,
		end_date,
		days_remaining,
		total_amount,
		orders_count,
		description,
		campaign_url,
		fulfillment_info,
		campaign_report
	},
	history: { campaigns, download }
}) {
	const { setTheme } = useContext(ThemeContext)
	const data = useConstant(() =>
		chart_data.map(({ date, amount }) => ({ value: amount / 100, date }))
	)

	// const { minutes } = useStopwatch({
	// 	autoStart: true
	// })
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	if (minutes > 0) dispatch({ type: 'user/REQUEST_UPDATE_CAMPAIGN' })
	// }, [dispatch, minutes])

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Reports | GoodGive</title>
			</Helmet>
			<div className="wrapper">
				<div className="py-8 mb-8 md:flex md:justify-between md:-ml-4">
					<div className="flex flex-col md:w-1/3 md:pl-4">
						<Box className="mb-8">
							<img
								src={logo_url}
								className="mx-auto mb-8"
								alt="logo"
								width="116"
								loading="lazy"
							/>
							<h3 className="text-xl leading-tight text-center font-sans-semi md:text-2xl">
								{name}
							</h3>
						</Box>
						<Box className="flex flex-col flex-grow">
							<div className="w-full mb-12">
								<h4 className="mb-6 text-xl leading-tight font-sans-semi">
									Campaign Info
								</h4>
								<div
									className="mb-8 text-gray-700"
									dangerouslySetInnerHTML={{ __html: description }}
								/>
								<h4 className="mb-6 text-xl leading-tight font-sans-semi">
									Campaign Link
								</h4>
								{campaign_url && (
									<Link to={campaign_url} className="text-gray-700">
										{campaign_url.split('://')[1]}
									</Link>
								)}
							</div>
							<div className="mt-auto">
								{fulfillment_info && (
									<Button
										as="a"
										download
										href={fulfillment_info}
										className="w-full mb-2"
									>
										Downloard fulfillment info
									</Button>
								)}
								{campaign_report && (
									<Button
										download
										as="a"
										href={campaign_report}
										theme="secondary"
										className="w-full"
									>
										Downloard campaign report
									</Button>
								)}
							</div>
						</Box>
					</div>
					<div className="md:w-2/3 md:pl-4">
						<Box className="h-full lg:px-16 lg:py-12">
							<h4 className="mb-6 text-xl leading-tight font-sans-semi">
								Current Campaign: {start_date} - {end_date}
							</h4>
							{isBrowser && <CampaignGraph className="mb-16" data={data} />}

							<List
								totalFunds={format(total_amount)}
								totalOrders={orders_count}
								remaining={`${days_remaining} days to go`}
							/>
						</Box>
					</div>
				</div>
				{campaigns && (
					<Box className="mb-32">
						<CampaignHistory className="mb-8" data={campaigns} />
						{download && (
							<Button as="a" download href={download} theme="secondary">
								Downloard campaign report
							</Button>
						)}
					</Box>
				)}
			</div>
		</>
	)
}

Overview.propTypes = {
	history: shape({
		campaigns: T.campaigns,
		download: string
	}),
	campaign: T.campaign,
	organisation: T.organisation
}

export default withAuth(Overview, 'admin')
