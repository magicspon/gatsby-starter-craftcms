import React from 'react'
import { node, bool } from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'
import Switch from '@/utils/Switch'
import Spinner from '@/utils/Spinner'
import { fade } from '@/utils/transitions'
const MotionSpinner = motion.custom(Spinner)

function SubmitButton({ isLoading, children, ...props }) {
	return (
		<Button disabled={isLoading} {...props}>
			{children}

			<AnimatePresence>
				<Switch test={isLoading}>
					<MotionSpinner
						case={() => isLoading}
						variants={fade}
						initial="initial"
						animate="enter"
						exit="exit"
						className="absolute inset-y-0 w-4 h-4 my-auto ml-4 right-4"
					/>
				</Switch>
			</AnimatePresence>
		</Button>
	)
}

SubmitButton.propTypes = {
	isLoading: bool,
	children: node.isRequired
}

export default SubmitButton
