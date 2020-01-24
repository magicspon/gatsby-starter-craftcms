import { useRef } from 'react'

function useConstant(fn) {
	const ref = useRef()

	if (!ref.current) {
		ref.current = { v: fn() }
	}

	return ref.current.v
}

export default useConstant
