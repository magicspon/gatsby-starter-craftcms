import React from 'react'
import { string } from 'prop-types'
import Button from '@/components/Button'
import Box from '@/components/Box'
import Link from '@/utils/Link'

function SchoolCard({ name, logo_url }) {
	return (
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

			<div className="py-8">
				<Button as={Link} to="/overview/" theme="secondary" className="w-full">
					Back to campaign overview
				</Button>
			</div>
		</div>
	)
}

SchoolCard.propTypes = {
	name: string.isRequired,
	logo_url: string.isRequired
}

export default SchoolCard
