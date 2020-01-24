/**
 * Authentication Endpoints
 */

export const REGISTER = 'api/register'
export const REGISTER_ORG = 'api/applications'
export const LOGIN = 'api/login'
export const LOGOUT = 'api/logout'
export const EMAIL_VERIFICATION = 'api/verify/'
export const FORGOTTEN_PASSWORD = 'api/password/email'
export const PASSWORD_RESET = 'api/password/reset'

export const UNIQUE_CAMPAIGN = id => `api/campaigns/${id}`

export const CREATE_STUDENT = 'api/students'
export const EDIT_STUDENT = id => `api/students/${id}`
export const VIEW_STUDENTS = `api/students`
export const EDIT_PARENT = 'api/parents'
export const SET_STUDENT_EMAIL = id => `api/students/${id}/email`
export const SEND_EMAIL = id => `api/students/${id}/campaign-email`

/**
 * User Endpoints
 */

export const CURRENT_USER = 'api/current-user'
export const CURRENT_CAMPAIGN = 'api/campaigns/current'
export const CAMPAIGN_HISTORY = 'api/campaigns/history'
export const RESOURCE_LIST = 'api/resources'
export const ORGANISATION_STATS = 'api/organisation-stats'

/**
 * Shop Endpoints
 */

export const ADD_TO_CART = campaignId =>
	`api/campaigns/${campaignId}/cart/add-item`

export const UPDATE_CART_ITEM = campaignId =>
	`api/campaigns/${campaignId}/cart/update-item`

export const REMOVE_FROM_CART = campaignId =>
	`api/campaigns/${campaignId}/cart/remove-item`

export const CHECKOUT = campaignId =>
	`api/campaigns/${campaignId}/cart/checkout`

export const VIEW_CART = campaignId => `api/campaigns/${campaignId}/cart`

/**
 * Contact
 */

export const ENQUIRY_FORM = 'api/enquiry'
