import { useDispatch } from 'react-redux'
import { navigate } from 'gatsby'
import useProgressBar from '@/hooks/useProgressBar'

function useLogout() {
	const dispatch = useDispatch()
	const { setLoading } = useProgressBar()
	// change to async function
	return async e => {
		// prevent the default, or the page will be redirected before having a chance to logout
		if (e) {
			e.preventDefault()
		}

		setLoading(true)
		// wait for the response
		await dispatch({
			type: 'user/REQUEST_LOGOUT'
		})

		if (window && window.location.pathname === '/') {
			setLoading(false)
		} else {
			navigate('/')
		}
	}
}

export default useLogout
