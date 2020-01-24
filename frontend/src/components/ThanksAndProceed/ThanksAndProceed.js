import React from 'react'
import { string } from 'prop-types'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import Button from '@/components/Button'

function ThanksAndProceed({ className }) {
	return (
		<motion.div className={classNames(className)}>
			<div className="mb-8">
				<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
					Payment Details
				</h1>
				<p className="text-pale">
					Select the school that you would like your contribution to go towards.
					Your products will be delivered to your donee’s classroom and they’ll
					bring your sunscreen to you upon receipt.
				</p>
			</div>
			<Button as="a" href="#0" className="w-full mb-8">
				Create account
			</Button>
		</motion.div>
	)
}

ThanksAndProceed.propTypes = {
	className: string
}

export default ThanksAndProceed
