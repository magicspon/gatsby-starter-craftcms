import { useEffect, useRef } from 'react'
import { isBrowser } from '@/utils'

const useInterval = (callback, delay) => {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		const handler = (...args) => savedCallback.current(...args)

		if (delay !== null && isBrowser) {
			const id = setInterval(handler, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

export default useInterval
