import React from 'react'
import { string } from 'prop-types'

function User({ image, name, school }) {
	return (
		<div className="flex items-center">
			{image && (
				<div className="flex-shrink-0 w-12 h-12 mr-6 overflow-hidden rounded-full shadow">
					<img
						src={image}
						alt="face"
						width="100"
						height="100"
						className="object-cover w-full h-full"
					/>
				</div>
			)}
			<div>
				<h4 className="leading-snug font-sans-semi text-md">{name}</h4>
				<span className="leading-snug text-gray-700 text-md">{school}</span>
			</div>
		</div>
	)
}

User.propTypes = {
	name: string.isRequired,
	image: string.isRequired,
	school: string.isRequired
}

export default User
