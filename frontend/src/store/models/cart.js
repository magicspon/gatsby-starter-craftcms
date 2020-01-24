/* eslint-disable no-param-reassign */
import { lensPath, set, over } from 'ramda'
import api from '@/utils/api'
import * as e from '@/utils/endpoints'

const toNum = num => parseInt(num, 10)

export default {
	state: {
		basket: {},
		history: {}
	}, // initial state
	reducers: {
		SET_CAMPAIGN_CART(state, { campaign_id, cart }) {
			const { basket } = state
			const campaignItems = lensPath([`${campaign_id}`])
			const total = cart.line_items.length
			return {
				...state,
				basket: over(campaignItems, c => ({ ...c, ...cart }), basket),
				current_campaign: campaign_id,
				total
			}
		},

		SET_DONEE_CODE(state, { campaign_id, donee_code }) {
			const { basket } = state
			const campaignItems = lensPath([`${campaign_id}`, 'donee_code'])
			return {
				...state,
				basket: set(campaignItems, donee_code, basket)
			}
		},

		SET_CURRENT_ORGANISATION(state, { campaign_id, organisation }) {
			const { basket } = state
			const campaignItems = lensPath([`${campaign_id}`, 'organisation'])
			return {
				...state,
				basket: set(campaignItems, organisation, basket)
			}
		},

		FINISH_CAMPAIGN(state, { campaign_id, hash, ...rest }) {
			const { history } = state
			const campaignItemComplete = lensPath([hash])
			const basket = state.basket[campaign_id]

			return {
				...state,
				history: set(
					campaignItemComplete,
					{ ...rest, campaign_id, basket },
					history
				),
				total: 0
			}
		},

		DELETE_CAMPAIGN(state, { campaign_id }) {
			delete state.basket[campaign_id]

			return { ...state, current_campaign: null, total: 0 }
		}
	},
	effects: dispatch => ({
		async REQUEST_ADD_TO_CART(
			{ campaign_id, variant, quantity, organisation },
			{ user: { access_token } }
		) {
			const response = await api(e.ADD_TO_CART(campaign_id), {
				method: 'POST',
				body: JSON.stringify({
					product_variant_id: toNum(variant.id),
					quantity: toNum(quantity)
				}),
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			if (response.status >= 200 && response.status < 300) {
				await dispatch({
					type: 'cart/REQUEST_UPDATE_CART',
					payload: { campaign_id }
				})

				dispatch({
					type: 'cart/SET_CURRENT_ORGANISATION',
					payload: { organisation, campaign_id }
				})

				return true
			}

			return response
		},

		async REQUEST_UPDATE_ITEM(
			{ campaign_id, id, quantity, abortSignal },
			{ user: { access_token } }
		) {
			const response = await api(e.UPDATE_CART_ITEM(campaign_id), {
				method: 'POST',
				body: JSON.stringify({
					product_variant_id: toNum(id),
					quantity: toNum(quantity)
				}),
				headers: {
					Authorization: `Bearer ${access_token}`
				},
				signal: abortSignal
			})

			if (response.status >= 200 && response.status < 300) {
				await dispatch({
					type: 'cart/REQUEST_UPDATE_CART',
					payload: { campaign_id }
				})

				return true
			}

			return false
		},

		async REQUEST_DELETE({ campaign_id, id }, { user: { access_token } }) {
			const response = await api(e.REMOVE_FROM_CART(campaign_id), {
				method: 'POST',
				body: JSON.stringify({
					product_variant_id: toNum(id)
				}),
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			if (response.status >= 200 && response.status < 300) {
				await dispatch({
					type: 'cart/REQUEST_UPDATE_CART',
					payload: { campaign_id }
				})

				return true
			}

			return false
		},

		async REQUEST_UPDATE_CART({ campaign_id }, { user: { access_token } }) {
			const cart = await api(e.VIEW_CART(campaign_id), {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}).then(resp => resp.json())

			dispatch({
				type: 'cart/SET_CAMPAIGN_CART',
				payload: { campaign_id, cart }
			})
		}
	})
}
