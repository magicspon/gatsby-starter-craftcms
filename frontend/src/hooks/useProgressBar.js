import { useState, useEffect } from 'react'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: true })

function useProgressBar(state = false) {
	const [isLoading, setLoading] = useState(state)

	useEffect(() => {
		if (isLoading) {
			NProgress.start()
		} else {
			NProgress.done()
		}

		return () => {
			NProgress.done()
			NProgress.remove()
		}
	}, [isLoading])

	return { isLoading, setLoading }
}

export default useProgressBar
