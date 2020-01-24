/* eslint-disable compat/compat */
import { lensPath, set } from 'ramda'
import api from '@/utils/api'
import * as e from '@/utils/endpoints'
import { removeNullValues } from '@/utils'

export default {
	state: {
		isLoggedIn: false
	}, // initial state
	reducers: {
		SET_USER_SESSION(state, payload) {
			return {
				...state,
				...payload
			}
		},

		SET_STUDENTS(state, payload) {
			return {
				...state,
				students: payload
			}
		},

		SET_SCHOOL_CONTENT(state, { campaign, resources, history, stats }) {
			return {
				...state,
				campaign,
				resources,
				history,
				stats
			}
		},

		SET_SCHOOL_STATS(state, payload) {
			return {
				...state,
				stats: payload
			}
		},

		SET_SCHOOL_CAMPAIGN(state, payload) {
			const lens = lensPath(['campaign', 'chart_data'])
			return set(lens, payload, state)
		},

		SET_USER_DETAILS(state, { email, first_name, last_name }) {
			return {
				...state,
				email,
				first_name,
				last_name
			}
		},

		ADD_STUDENT(state, payload) {
			const { students = [] } = state
			return {
				...state,
				students: [payload, ...students]
			}
		},

		ADD_STUDENT_SETUP(state, payload) {
			const { students = [] } = state
			const { tempId } = payload
			return {
				...state,
				students: [{ id: tempId }, ...students]
			}
		},

		EDIT_STUDENT(state, payload) {
			const { students } = state
			return {
				...state,
				students: students.map(student => {
					if (student.id === payload.oldId) {
						return payload.student
					}
					return student
				})
			}
		},

		SET_STUDENT_EMAIL(state, payload) {
			const { students } = state
			return {
				...state,
				students: students.map(student => {
					if (student.id === payload.id) {
						return { ...student, email: payload.email }
					}
					return student
				})
			}
		},

		REMOVE_STUDENT_SETUP(state, payload) {
			const { students } = state
			const { id } = payload
			return {
				...state,
				students: students.filter(student => student.id !== id)
			}
		},

		EXIT_USER_SESSION() {
			return {
				isLoggedIn: false
			}
		}
	},
	effects: dispatch => ({
		async REQUEST_LOGIN({ email, password, redirect }) {
			const response = await api(e.LOGIN, {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				})
			})
			const { status, message } = response

			if (status >= 200 && status < 300) {
				const { access_token, roles } = await response.json()
				const isParent = roles.includes('parent')
				const isAdmin = roles.includes('admin')
				const userRedirect = isAdmin
					? '/overview/'
					: isParent
					? '/students/'
					: '/shop/'

				const user = await api(e.CURRENT_USER, {
					headers: {
						Authorization: `Bearer ${access_token}`
					}
				})

				let hasStudents = false
				if (isParent) {
					const students = await api(e.VIEW_STUDENTS, {
						headers: {
							Authorization: `Bearer ${access_token}`
						}
					})
					if (students.status >= 200 && students.status <= 400) {
						const data = await students.json()
						hasStudents = !!data.length
						if (hasStudents)
							dispatch({
								type: 'user/SET_STUDENTS',
								payload: data
							})
					}
				}

				if (isAdmin) {
					const [campaign, history, resources, stats] = await Promise.all([
						api(e.CURRENT_CAMPAIGN, {
							headers: {
								Authorization: `Bearer ${access_token}`
							}
						}).then(resp => resp.json()),

						api(e.CAMPAIGN_HISTORY, {
							headers: {
								Authorization: `Bearer ${access_token}`
							}
						}).then(resp => resp.json()),

						api(e.RESOURCE_LIST, {
							headers: {
								Authorization: `Bearer ${access_token}`
							}
						}).then(resp => resp.json()),

						api(e.ORGANISATION_STATS, {
							headers: {
								Authorization: `Bearer ${access_token}`
							}
						}).then(resp => resp.json())
					])

					dispatch({
						type: 'user/SET_SCHOOL_CONTENT',
						payload: { campaign, history, resources, stats }
					})
				}

				if (user.status === 200) {
					const data = await user.json()

					dispatch({
						type: 'user/SET_USER_SESSION',
						payload: {
							isLoggedIn: true,
							access_token,
							roles,
							isAdmin,
							isParent,
							...data
						}
					})

					return {
						success: true,
						redirect:
							redirect === false
								? false
								: isParent && !hasStudents
								? '/students/add/'
								: userRedirect
					}
				}
			}

			return {
				error: message
			}
		},

		async REQUEST_USER({ access_token, role }) {
			const response = await api(e.CURRENT_USER, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})
			if (response.status >= 200 && response.status < 300) {
				const data = await response.json()
				dispatch({
					type: 'user/SET_USER_SESSION',
					payload: {
						isLoggedIn: true,
						access_token,
						roles: [role],
						isAdmin: false,
						isParent: false,
						...data
					}
				})
				return true
			}

			return false
		},

		async REQUEST_UPDATE_STATS(_, { user: { access_token } }) {
			const response = await api(e.ORGANISATION_STATS, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}).then(resp => resp.json())

			dispatch({ type: 'user/SET_SCHOOL_STATS', payload: response })
		},

		async REQUEST_UPDATE_CAMPAIGN(_, { user: { access_token } }) {
			const response = await api(e.CURRENT_CAMPAIGN, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}).then(resp => resp.json())

			dispatch({
				type: 'user/SET_SCHOOL_CAMPAIGN',
				payload: response.chart_data
			})
		},

		async REQUEST_LOGOUT(payload, { user: { access_token } }) {
			const response = await api(e.LOGOUT, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			if (response.status >= 200 && response.status < 300) {
				dispatch({
					type: 'user/EXIT_USER_SESSION'
				})
				return true
			}

			return false
		},

		async REQUEST_ADD_STUDENT({ postData }, { user: { access_token } }) {
			const response = await api(e.CREATE_STUDENT, {
				method: 'POST',
				body: JSON.stringify({ students: postData }),
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'text/plain',
					Accept: '*'
				}
			})

			if (response.status >= 200 && response.status < 300) {
				const students = await response.json()
				students.forEach(student => {
					dispatch({ type: 'user/ADD_STUDENT', payload: student })
				})

				return true
			}

			return response
		},

		async REQUEST_EDIT_STUDENT(payload, { user: { access_token } }) {
			const { id, postData } = payload
			const response = await api(e.EDIT_STUDENT(id), {
				method: 'POST',
				body: JSON.stringify(postData),
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'text/plain',
					Accept: '*'
				}
			})

			if (response.status >= 200 && response.status < 300) {
				const student = await response.json()

				dispatch({ type: 'user/EDIT_STUDENT', payload: { oldId: id, student } })
				return true
			}

			return response
		},

		async REQUEST_REMOVE_STUDENT(payload, { user: { access_token } }) {
			const response = await api(e.EDIT_STUDENT(payload.id), {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			if (response.status >= 200 && response.status < 300) {
				dispatch({
					type: 'user/REMOVE_STUDENT_SETUP',
					payload: { id: payload.id }
				})
				return true
			}

			return response
		},

		async REQUEST_SET_STUDENT_EMAIL({ id, email }, { user: { access_token } }) {
			const response = await api(e.SET_STUDENT_EMAIL(id), {
				method: 'PATCH',
				body: JSON.stringify({ email }),
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			if (response.status >= 200 && response.status < 300) {
				dispatch({
					type: 'user/SET_STUDENT_EMAIL',
					payload: { id, email }
				})
				return true
			}

			return response
		},

		async REQUEST_UPDATE_PARENT(payload, { user: { access_token } }) {
			const response = await api(e.EDIT_PARENT, {
				method: 'PUT',
				body: JSON.stringify(removeNullValues(payload)),
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			if (response.status >= 200 && response.status < 300) {
				const { email, first_name, last_name } = await response.json()
				dispatch({
					type: 'user/SET_USER_DETAILS',
					payload: { email, first_name, last_name }
				})
				return true
			}

			return response
		}
	})
}
