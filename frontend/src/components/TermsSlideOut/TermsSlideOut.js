import React from 'react'
import { func, bool } from 'prop-types'
// import classNames from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import Modal from '@/components/Modal'
import IconWrapper from '@/utils/IconWrapper'
import DeleteIcon from '@/icons/delete.svg'
// import terms from '@/content/register_parent.json'
import RichText from '@/utils/RichText'
import { cleanData } from '@/utils'
import useConstant from '@/hooks/useConstant'
import { Heading, SubHeading } from '@/utils/Text'

function TermsSlideOut({ isOpen, setOpen }) {
	const data = useStaticQuery(graphql`
		{
			craft {
				entries(slug: "terms") {
					id
					... on Craft_terms_terms_Entry {
						id
						faq {
							...faqQuery
						}
						heading
						headingText {
							...headingTextQuery
						}
						title
					}
					title
				}
			}
		}
	`)

	const { heading, faq } = useConstant(() => cleanData(data))

	return (
		<Modal
			overlayClassName="fixez inset-0 w-full"
			aria={{
				labelledby: 'select-school-heading',
				describedby: 'select-school-options'
			}}
			isModalOpen={isOpen}
			setModalOpen={setOpen}
			contentLabel="Select School modal"
			className="flex flex-col items-center w-full h-full max-w-2xl ml-auto"
		>
			<div className="w-full h-full px-4 py-8 bg-blue-100 md:py-12 md:px-12">
				<IconWrapper
					icon={DeleteIcon}
					className="absolute w-3 h-3 top-4 right-4"
					as="button"
					type="button"
					onClick={() => setOpen(false)}
				/>
				<div className="flex flex-col w-full h-full overflow-auto">
					<Heading as="h1" scale="h2" className="pb-4 mb-12 border-b-2">
						{heading}
					</Heading>
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
		</Modal>
	)
}

TermsSlideOut.propTypes = {
	setOpen: func.isRequired,
	isOpen: bool.isRequired
}

export default TermsSlideOut
