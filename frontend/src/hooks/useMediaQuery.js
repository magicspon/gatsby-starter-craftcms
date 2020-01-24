import { useState, useEffect } from 'react'
import { isBrowser } from '@/utils'

function useMediaQuery(query = '(max-width: 600px)') {
	const [match, setMatch] = useState()

	useEffect(() => {
		const handle = e => {
			setMatch(e.matches)
		}
		let mql
		if (isBrowser) {
			mql = window.matchMedia(query)
			handle(mql)

			mql.addListener(handle)
		}

		return () => {
			if (isBrowser && mql) mql.removeListener(handle)
		}
	}, [query])

	return match
}

export default useMediaQuery
