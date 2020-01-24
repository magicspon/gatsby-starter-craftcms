import React, { useContext, useEffect } from 'react'
import { objectOf, string, number, oneOfType } from 'prop-types'
import { Helmet } from 'react-helmet-async'
// import { useDispatch } from 'react-redux'
// import { useStopwatch } from 'react-timer-hook'
import { toPairs } from 'ramda'
import { ThemeContext } from '@/container/ThemeProvider'
import Box from '@/components/Box'
import SchoolCard from '@/components/SchoolCard'
import withAuth from '@/utils/withAuth'
import * as T from '@/types'

function SchoolRoll({ stats, organisation: { name, logo_url } }) {
	const { setTheme } = useContext(ThemeContext)
	// const { minutes } = useStopwatch({
	// 	autoStart: true
	// })
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	if (minutes > 0) dispatch({ type: 'user/REQUEST_UPDATE_STATS' })
	// }, [dispatch, minutes])

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Onboarding | GoodGive</title>
			</Helmet>
			<div className="wrapper">
				<div className="py-8 mb-8 md:items-start md:flex md:justify-between md:-ml-4">
					<SchoolCard name={name} logo_url={logo_url} />
					<div className="md:w-2/3 md:pl-4">
						<Box className="h-full lg:px-16 lg:py-12">
							<h4 className="mb-12 text-xl leading-tight font-sans-semi">
								Onboarding
							</h4>

							<ul className="text-black border-t font-sans-semi sm:text-xl">
								{toPairs(stats).map(([key, value]) => (
									<li
										key={key}
										className="flex items-center justify-between py-6 border-b"
									>
										<div>{key}</div>
										<div>{value}</div>
									</li>
								))}
							</ul>
						</Box>
					</div>
				</div>
			</div>
		</>
	)
}

SchoolRoll.propTypes = {
	organisation: T.organisation,
	stats: objectOf(oneOfType([number, string]))
}

export default withAuth(SchoolRoll, 'admin')
