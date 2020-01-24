import React from 'react'
import { string, node } from 'prop-types'
import IconWrapper from '@/utils/IconWrapper'
import GoogleIcon from '@/icons/google.svg'
import LinkedInIcon from '@/icons/linkedin.svg'
import TwitterIcon from '@/icons/twitter.svg'

function SocialIcon({ children, href }) {
	return (
		<li className="mr-4 last:mr-0">
			<a
				href={href}
				rel="noopener noreferrer"
				target="_blank"
				className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full outline-none hocus:bg-gray-800 hocus:text-white transition-bg-color"
			>
				{children}
			</a>
		</li>
	)
}

SocialIcon.propTypes = {
	children: node.isRequired,
	href: string.isRequired
}

function Social({ google, twitter, linkedin }) {
	return (
		<ul className="flex items-center">
			<SocialIcon href={google}>
				<IconWrapper label="Google" icon={GoogleIcon} className="w-4" />
			</SocialIcon>
			<SocialIcon href={twitter}>
				<IconWrapper label="Twitter" icon={TwitterIcon} className="w-4" />
			</SocialIcon>
			<SocialIcon href={linkedin}>
				<IconWrapper label="LinkedIn" icon={LinkedInIcon} className="w-4" />
			</SocialIcon>
		</ul>
	)
}

Social.propTypes = {
	google: string.isRequired,
	twitter: string.isRequired,
	linkedin: string.isRequired
}

export default Social
