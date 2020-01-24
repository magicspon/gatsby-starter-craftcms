import React from 'react'
import { string } from 'prop-types'
import * as T from '@/types'
import RichText from '@/utils/RichText'
import { Heading, SubHeading } from '@/utils/Text'

function Legal({ heading, faq, text }) {
	return (
		<div className="py-12 wrapper">
			<div className="w-full max-w-xl mx-auto">
				<Heading as="h1" scale="h2" className="pb-4 mb-12 border-b-2">
					{heading}
				</Heading>
				{text && <h3 className="mb-8 text-2md">{text}</h3>}
				{faq.map(item => (
					<div key={item.id} className="pb-6">
						<SubHeading className="mb-2" as="h4">
							{item.question}
						</SubHeading>
						<RichText markdown={item.answer} />
					</div>
				))}
			</div>
		</div>
	)
}

Legal.propTypes = {
	heading: string.isRequired,
	faq: T.craftFaqBlock.isRequired,
	text: string
}

export default Legal
