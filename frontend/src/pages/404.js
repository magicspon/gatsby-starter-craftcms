import React from 'react'
import { Helmet } from 'react-helmet-async'

function PageNotFound() {
	return (
		<>
			<Helmet>
				<title>Nope!</title>
			</Helmet>

			<h1 className="text-xl font-sans-semi">404</h1>
		</>
	)
}

export default PageNotFound
