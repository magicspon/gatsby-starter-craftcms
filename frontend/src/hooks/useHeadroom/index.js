import { useEffect, useRef, useState, useReducer } from 'react'
import throttle from 'raf-throttle'
import shouldUpdate from './shouldUpdate'

function getDocumentHeight() {
	const { body, documentElement } = document

	return Math.max(
		body.scrollHeight,
		documentElement.scrollHeight,
		body.offsetHeight,
		documentElement.offsetHeight,
		body.clientHeight,
		documentElement.clientHeight
	)
}

function isOutOfBound(currentScrollY) {
	const pastTop = currentScrollY < 0

	const scrollerPhysicalHeight = window.innerHeight
	const scrollerHeight = getDocumentHeight()

	const pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight

	return pastTop || pastBottom
}

function reducer(state, { type }) {
	switch (type) {
		case 'pin': {
			return {
				...state,
				translateY: 0,
				className: 'headroom headroom--pinned',
				animation: true,
				state: 'pinned'
			}
		}
		case 'unpin': {
			return {
				...state,
				translateY: '-100%',
				className: 'headroom headroom--unpinned',
				animation: true,
				state: 'unpinned'
			}
		}
		case 'unpin-snap': {
			return {
				...state,
				translateY: '-100%',
				className: 'headroom headroom--unpinned headroom-disable-animation',
				animation: false,
				state: 'unpinned'
			}
		}
		case 'unfix': {
			return {
				...state,
				translateY: 0,
				className: 'headroom headroom--unfixed headroom-disable-animation',
				animation: false,
				state: 'unfixed'
			}
		}
		case 'none': {
			return state
		}

		default: {
			throw new Error('action type missing')
		}
	}
}

function useHeight(ref, calcHeightOnResize = true) {
	const [height, setHeight] = useState(0)
	useEffect(() => {
		const handle = throttle(() => {
			setHeight(ref.current.offsetHeight)
		})

		setHeight(ref.current.offsetHeight)

		if (calcHeightOnResize) window.addEventListener('resize', handle)

		return () => {
			if (calcHeightOnResize) window.removeEventListener('resize', handle)
		}
	}, [height, ref, calcHeightOnResize])

	return height
}

function useHeadroom(props = {}) {
	const {
		disable = false,
		upTolerance = 5,
		downTolerance = 0,
		pinStart = 0,
		calcHeightOnResize = true
	} = props

	const ref = useRef()
	const currentScrollY = useRef(0)
	const lastKnownScrollY = useRef(0)
	const height = useHeight(ref, calcHeightOnResize)
	const [state, dispatch] = useReducer(reducer, {
		state: 'unfixed',
		translateY: 0,
		className: 'headroom headroom--unfixed'
	})

	useEffect(() => {
		const handle = throttle(() => {
			currentScrollY.current = window.pageYOffset

			if (!isOutOfBound(currentScrollY.current)) {
				const { action } = shouldUpdate(
					lastKnownScrollY.current,
					currentScrollY.current,
					{
						disable,
						upTolerance,
						downTolerance,
						pinStart
					},
					{
						...state,
						height
					}
				)

				dispatch({ type: action })
			}

			lastKnownScrollY.current = currentScrollY.current
		})

		window.addEventListener('scroll', handle)

		return () => {
			window.removeEventListener('scroll', handle)
		}
	}, [ref, state, height, disable, upTolerance, downTolerance, pinStart])

	let innerStyle = {
		position: state.state === 'unfixed' ? 'relative' : 'fixed',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		transform: `translate3D(0, ${state.translateY}, 0)`
	}

	if (state.animation) {
		innerStyle = {
			...innerStyle,
			transition: 'all .2s ease-in-out'
		}
	}

	return {
		wrapper: {
			height: height || null
		},
		innerStyle,
		className: state.className,
		state: state.state,
		node: ref
	}
}

export default useHeadroom
