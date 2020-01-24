import { useRef } from 'react'
import { equals } from 'ramda'
import usePrevious from './usePrevious'

function useCache(fn, deps = []) {
	const ref = useRef()
	const previous = usePrevious(deps)

	if (!equals(previous, deps)) {
		ref.current = { v: fn() }
	}

	return ref.current.v
}

export default useCache
