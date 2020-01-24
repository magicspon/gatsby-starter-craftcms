import { useEffect, useState, useRef } from 'react'
import load from 'little-loader'
import qs from 'query-string'
import { isBrowser } from '@/utils'
const GOOGLE_MAP_PLACES_API = 'https://maps.googleapis.com/maps/api/js'
const NOT_LOADED = 0
const LOADED = 2
const GOOGLE_ERROR = 'SDK Authentication Error'
const NETWORK_ERROR = 'SDK Authentication Error'

function useGoogleMaps(
	ref,
	params,
	options = {
		center: { lat: -34.397, lng: 150.644 },
		zoom: 8
	}
) {
	const [state, setState] = useState(NOT_LOADED)
	const [map, setMap] = useState(null)
	const mapInstance = useRef()

	useEffect(() => {
		if (isBrowser && !map) {
			window.gm_authFailure = () => {
				setState(GOOGLE_ERROR)
			}

			if (window.google) {
				setState(LOADED)
				setMap(window.google ? window.google.maps : null)
				mapInstance.current = new window.google.maps.Map(ref.current, options)
				return
			}

			if (state === NOT_LOADED) {
				if (!window.google) {
					window.google = undefined
				}
				load(`${GOOGLE_MAP_PLACES_API}?${qs.stringify(params)}`, err => {
					setState(err ? NETWORK_ERROR : LOADED)
					setMap(window.google ? window.google.maps : null)
					if (window.google) {
						mapInstance.current = new window.google.maps.Map(
							ref.current,
							options
						)
					}
				})
			}
		}
	}, [map, options, params, ref, state])

	return { map: mapInstance.current }
}

export default useGoogleMaps
