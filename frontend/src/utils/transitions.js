const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }

export const fade = {
	initial: { opacity: 0 },
	enter: { opacity: 1, transition },
	exit: {
		opacity: 0,
		transition: { duration: 1.5, ...transition }
	}
}

export const containerVariants = {
	show: {
		transition: {
			type: 'spring',
			damping: 100,
			stiffness: 50,
			staggerChildren: 0.3,
			delayChildren: 0.2
		}
	},
	hide: {
		transition: {
			delay: 0.23,
			duration: 0.3
		}
	}
}

export const textVariants = {
	show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	hide: { opacity: 0, y: 50 }
}

export const buttonVariants = {
	show: { opacity: 1, transition: { duration: 0.3 } },
	hide: { opacity: 0 }
}

export const imageVariants = {
	show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
	hide: { opacity: 0, scale: 0.98 }
}

export const bannerVariants = {
	show: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0 } },
	hide: { opacity: 0, scale: 1.2 }
}
