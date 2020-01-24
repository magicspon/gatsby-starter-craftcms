import React, { useContext, useEffect } from 'react'
import { shape, arrayOf, number, string } from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ThemeContext } from '@/container/ThemeProvider'
import Button from '@/components/Button'
import Box from '@/components/Box'
import SchoolCard from '@/components/SchoolCard'
import { fade } from '@/utils/transitions'
import withAuth from '@/utils/withAuth'
import * as T from '@/types'

function Resources({ resources, organisation: { name, logo_url } }) {
	const { setTheme } = useContext(ThemeContext)

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Resources | GoodGive</title>
			</Helmet>
			<div className="wrapper">
				<div className="py-8 mb-8 md:flex md:justify-between md:-ml-4">
					<SchoolCard name={name} logo_url={logo_url} />
					<div className="md:w-2/3 md:pl-4">
						<Box className="h-full lg:px-16 lg:py-12">
							<h4 className="mb-12 text-xl leading-tight font-sans-semi">
								Resource centre
							</h4>

							<ul className="text-black border-t font-sans-semi sm:text-xl">
								{resources.map(({ id, title, file_url }) => (
									<li
										key={id}
										className="flex items-center justify-between py-6 border-b"
									>
										<div>{title}</div>
										<div>
											<Button as="a" href={file_url} download>
												Downloard
											</Button>
										</div>
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

Resources.propTypes = {
	resources: arrayOf(
		shape({
			id: number.isRequired,
			title: string.isRequired,
			file_url: string.isRequired
		})
	),
	organisation: T.organisation
}

export default withAuth(Resources, 'admin')
