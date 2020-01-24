import React, { Fragment, useCallback, useState } from 'react'
import { number, string } from 'prop-types'
import Box from '@/components/Box'
import Button from '@/components/Button'
import SubmitButton from '@/components/SubmitButton'
import Link from '@/utils/Link'
import api from '@/utils/api'
import { SEND_EMAIL } from '@/utils/endpoints'
import useProgressBar from '@/hooks/useProgressBar'
import Modal from '@/components/Modal'
import IconWrapper from '@/utils/IconWrapper'
import DeleteIcon from '@/icons/delete.svg'

function CampaignPanel({ id, name, campaign_url, access_token }) {
	const { isLoading, setLoading } = useProgressBar()
	const [isOpen, setOpen] = useState(false)
	const [friends, setFriends] = useState(false)

	const onClick = useCallback(async () => {
		setLoading(true)
		const response = await api(SEND_EMAIL(id), {
			method: 'POST',

			headers: {
				Authorization: `Bearer ${access_token}`
			}
		})

		setLoading(false)

		if (response.status >= 200 && response.status < 300) {
			const data = await response.json()
			setFriends(data.sent_to)
			setOpen(true)
		}
	}, [access_token, id, setLoading])

	return (
		<>
			<Box className="text-white bg-blue-600 rounded-t-none">
				<div className="mb-12">
					<h3 className="mb-6 leading-tight tracking-tight text-md font-sans-semi md:text-xl">
						Your campaign for {name} is now live!
					</h3>
					<p>
						Click below to shop now or send yourself convenient campaign email
						with your unique fundraising code so that you can forward your info
						to potential supporters via email.
					</p>
				</div>
				<ul className="xl:flex xl:-ml-4">
					<li className="mb-4 xl:mb-0 xl:w-1/2 xl:pl-4">
						<Button
							as={Link}
							to={campaign_url}
							className="w-full"
							theme="white"
						>
							Shop now
						</Button>
					</li>
					<li className="mb-4 xl:mb-0 xl:w-1/2 xl:pl-4">
						<SubmitButton
							onClick={onClick}
							theme="box"
							className="w-full"
							as="button"
							type="button"
							isLoading={isLoading}
						>
							Send campaign email
						</SubmitButton>
					</li>
				</ul>
			</Box>

			<Modal
				overlayClassName="fixez inset-0 w-full flex items-center"
				aria={{
					labelledby: 'login-button',
					describedby: 'login-form'
				}}
				isModalOpen={isOpen}
				setModalOpen={setOpen}
				contentLabel="Add student email address"
				className="relative flex items-center justify-center max-w-xl mx-auto"
			>
				<IconWrapper
					onClick={() => setOpen(false)}
					className="absolute w-3 h-3 top-4 right-4"
					as="button"
					type="button"
					icon={DeleteIcon}
				/>
				<Box className="w-full text-center shadow lg:p-12">
					<h1 className="mb-4 text-lg lg:text-xl lg:mb-6 text-cenrer font-sans-semi">
						Success!
					</h1>
					<p className="mb-4">
						An email with your campaign code and details has been sent to{' '}
						{friends &&
							friends.map((item, index, { length }) => {
								const sep =
									index === 0 ? '' : index < length - 1 ? ', ' : ' and '
								return (
									<Fragment key={item}>
										{sep}
										<span className="text-blue-600">{item}</span>
									</Fragment>
								)
							})}
					</p>
					<p>
						Forward this email to potential supporters to help spread the word
						about the campaign!
					</p>
				</Box>
			</Modal>
		</>
	)
}

CampaignPanel.propTypes = {
	id: number.isRequired,
	name: string.isRequired,
	campaign_url: string.isRequired,
	access_token: string.isRequired
}

export default CampaignPanel
