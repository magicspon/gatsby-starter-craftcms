/**
 * ~/srx/store/index
 *
 * Initalise the store
 * this is used to pass props between components
 *
 */

import { init } from '@rematch/core'
import * as models from './models'

const store = init({
	models
})

export default store
