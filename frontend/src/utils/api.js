/* eslint-disable compat/compat */
async function handleErrors(response) {
	if (response.ok) {
		return response
	}
	try {
		const errorMessages = await response.json()
		const error = new Error(
			JSON.stringify({ status: response.status, messages: errorMessages })
		)
		return Promise.reject(error)
	} catch (err) {
		const error = new Error(JSON.stringify(response.status))
		return Promise.reject(error)
	}
}

async function api(endpoint, options = {}) {
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options
	})
		.then(handleErrors)
		.catch(error => {
			return error
		})

	return response
}

export default api
