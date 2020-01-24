import {
	shape,
	arrayOf,
	number,
	string,
	oneOfType,
	objectOf,
	any
} from 'prop-types'

export const organisations = arrayOf(
	shape({
		id: number.isRequired,
		name: string.isRequired,
		uri: string.isRequired,
		classrooms: arrayOf(
			shape({
				id: number.isRequired,
				name: string.isRequired,
				organisation_id: number.isRequired,
				teacher_name: string.isRequired,
				year_level: string.isRequired
			})
		).isRequired
	}).isRequired
).isRequired

export const product = {
	id: number.isRequired,
	default_image: string.isRequired,
	default_image_width: number.isRequired,
	default_image_height: number.isRequired,
	default_image_alt: string.isRequired,
	name: string.isRequired,
	slug: string.isRequired,
	campaign_id: number.isRequired,
	description: string.isRequired,
	contribution_amount: number.isRequired,
	variants: arrayOf(
		shape({
			id: number.isRequired,
			sku: string.isRequired,
			price: number.isRequired,
			size: string
		})
	).isRequired
}

export const student = {
	email: string,
	first_name: string,
	last_name: string,
	organisation: shape({
		id: number.isRequired,
		name: string.isRequired
	}),
	classroom: shape({
		id: number.isRequired,
		name: string.isRequired
	}),
	id: oneOfType([number, string]).isRequired,
	donee_code: oneOfType([number, string])
}

export const campaigns = arrayOf(
	shape({
		id: number.isRequired,
		title: string.isRequired,
		start_date: string.isRequired,
		end_date: string.isRequired,
		amount_in_cents: string.isRequired,
		products: arrayOf(string)
	})
)

export const campaign = shape({
	id: number.isRequired,
	title: string.isRequired,
	description: string.isRequired,
	start_date: string.isRequired,
	end_date: string.isRequired,
	total_amount: number.isRequired,
	orders_count: number.isRequired,
	days_remaining: number.isRequired,
	chart_data: arrayOf(
		shape({
			date: string.isRequired,
			amount: number.isRequired
		})
	),
	campaign_url: string,
	campaign_report: string,
	fulfillment_info: string
})

export const organisation = shape({
	id: number,
	name: string.isRequired,
	logo_url: string.isRequired
})

export const cartItem = shape({
	id: number.isRequired,
	name: string.isRequired,
	image: string.isRequired,
	image_width: number.isRequired,
	image_height: number.isRequired,
	image_alt: string.isRequired,
	quantity: number.isRequired,
	sale_item_price: number.isRequired,
	contribution_amount: number.isRequired,
	total: number.isRequired
})

export const craftButton = arrayOf(
	shape({
		link: string,
		text: string
	})
)

export const craftTestimonialBlock = arrayOf(
	shape({
		id: string.isRequired,
		association: string,
		by: string,
		text: string.isRequired
	})
)

export const craftFaqBlock = arrayOf(
	shape({
		id: string.isRequired,
		question: string,
		answer: string
	})
)

export const craftHeadingText = arrayOf(
	shape({
		id: string.isRequired,
		heading: string.isRequired,
		text: string.isRequired
	})
)

export const craftList = arrayOf(
	shape({
		item: string.isRequired
	})
)

export const craftImage = {
	id: string.isRequired,
	title: string.isRequired,
	width: number.isRequired,
	height: number.isRequired,
	optimizedimages: shape({
		src: string.isRequired,
		srcset: string.isRequired,
		srcWebp: string.isRequired,
		srcsetWebp: string.isRequired,
		maxSrcsetWidth: number.isRequired
	})
}

const socialMetaProps = shape({
	content: string,
	property: string
})

export const craftSEOMatic = {
	metaTitleContainer: shape({
		title: shape({
			title: string
		})
	}),
	metaTagContainer: shape({
		description: shape({ content: string }),
		keywords: arrayOf(string),
		robots: shape({
			content: string,
			name: string
		}),
		'og:site_name': socialMetaProps,
		'og:type': socialMetaProps,
		'og:url': socialMetaProps,
		'og:image': socialMetaProps,
		'og:image:width': socialMetaProps,
		'og:image:height': socialMetaProps
	}),
	metaLinkContainer: shape({
		canonical: shape({
			href: string,
			rel: string
		}),
		home: shape({
			href: string,
			rel: string
		}),
		author: shape({
			href: string,
			rel: string,
			type: string
		}),
		alternate: shape({
			href: string,
			hreflang: string,
			rel: string
		})
	}),
	metaJsonLdContainer: shape({
		// eslint-disable-next-line no-undef
		mainEntityOfPage: objectOf(any)
	})
}
