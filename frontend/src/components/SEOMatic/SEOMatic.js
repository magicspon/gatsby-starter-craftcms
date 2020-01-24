import React, { memo } from 'react'
import { Helmet } from 'react-helmet-async'
import { toPairs, equals } from 'ramda'
import * as T from '@/types'

function SEOMatic({
	metaTitleContainer: {
		title: { title }
	},
	metaTagContainer,
	metaLinkContainer,
	metaJsonLdContainer
}) {
	return (
		<Helmet>
			<title>{title}</title>

			{toPairs(metaTagContainer).map(([key, value]) => (
				<meta key={key} {...value} />
			))}

			{toPairs(metaLinkContainer).map(([key, value]) => (
				<link key={key} {...value} />
			))}

			{toPairs(metaJsonLdContainer).map(([key, value]) => (
				<script key={key} type="application/ld+json">
					{JSON.stringify(value)}
				</script>
			))}
		</Helmet>
	)
}

SEOMatic.propTypes = T.craftSEOMatic

export default memo(SEOMatic, equals)
