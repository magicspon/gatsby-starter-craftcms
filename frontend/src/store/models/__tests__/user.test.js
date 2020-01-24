import { init } from '@rematch/core'
import user from '../user'

describe('user tests', () => {
	beforeEach(() => {
		fetch.resetMocks()
	})

	it('should call the login api with the correct values', async () => {
		fetch.mockResponse(JSON.stringify({ status: 200, access_token: 'hello' }))

		const store = init({
			models: { user }
		})

		await store.dispatch({
			type: 'user/REQUEST_LOGIN',
			payload: { email: 'hello@spon.io', password: 'password' }
		})

		expect(fetch.mock.calls.length).toEqual(2)
		expect(fetch.mock.calls[0]).toEqual([
			'https://good-give.contora.co.nz/api/login',
			{
				method: 'POST',
				body: JSON.stringify({ email: 'hello@spon.io', password: 'password' })
			}
		])

		expect(fetch.mock.calls[1]).toEqual([
			'https://good-give.contora.co.nz/api/current-user',
			{
				headers: {
					Authorization: `Bearer hello`
				}
			}
		])

		const state = store.getState() // ?
		expect(state.user.isLoggedIn).toBe(true)
		expect(state.user.access_token).toBe('hello')
	})
})
