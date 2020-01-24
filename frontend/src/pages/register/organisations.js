/* eslint-disable compat/compat */
import React, { useContext, useEffect, useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { string, node } from 'prop-types'
import { useForm } from 'react-hook-form'
import { toPairs, compose, map, filter, forEach } from 'ramda'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeContext } from '@/container/ThemeProvider'
import TextPanel from '@/components/TextPanel'
import InputField from '@/components/InputField'
import InputUpload from '@/components/InputUpload'
import Label from '@/components/Label'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import api from '@/utils/api'
import RichText from '@/utils/RichText'
import { REGISTER_ORG } from '@/utils/endpoints'
import terms from '@/content/register_org_terms.json'
import SubmitButton from '@/components/SubmitButton'
import Button from '@/components/Button'
import useProgressBar from '@/hooks/useProgressBar'
import { fade } from '@/utils/transitions'
import Switch from '@/utils/Switch'
import Link from '@/utils/Link'
import Box from '@/components/Box'
import useFormErrors from '@/hooks/useFormErrors'
import FormError from '@/utils/FormError'

const MotionBox = motion.custom(Box)

function Fieldset({ children, title }) {
	return (
		<fieldset className="p-4 mb-6 bg-white rounded-lg md:px-6 lg:px-8 lg:py-6">
			<h2 className="mb-4 text-xl font-sans-semi">{title}</h2>
			{children}
		</fieldset>
	)
}

Fieldset.propTypes = {
	children: node.isRequired,
	title: string.isRequired
}

const STATES = [
	{ id: `Northland`, value: `Northland` },
	{ id: 'Auckland', value: `Auckland` },
	{ id: 'Waikato', value: `Waikato` },
	{ id: `Bay Of Plenty`, value: `Bay Of Plenty` },
	{ id: `Gisborne`, value: `Gisborne` },
	{ id: `Hawke's Bay`, value: `Hawke's Bay` },
	{ id: `Taranaki`, value: `Taranaki` },
	{ id: `Manawatu / Wanganui`, value: `Manawatu / Wanganui` },
	{ id: `Wellington`, value: `Wellington` },
	{ id: `Nelson / Tasman`, value: `Nelson / Tasman` },
	{ id: `Marlborough`, value: `Marlborough` },
	{ id: `West Coast`, value: `West Coast` },
	{ id: `Canterbury`, value: `Canterbury` },
	{ id: `Otago`, value: `Otago` },
	{ id: `Southland`, value: `Southland` }
]

function RegisterOrganisations() {
	const { setTheme } = useContext(ThemeContext)
	const { register, handleSubmit, errors, watch, setValue } = useForm()
	const [extra_address, setExtraAddress] = useState()
	const { isLoading, setLoading } = useProgressBar()
	const [view, setView] = useState('form')
	const { errorRef, formError, setFormError } = useFormErrors()

	const onSubmit = useCallback(
		async data => {
			const formData = new FormData()
			setLoading(true)

			const {
				organisation_logo,
				statement,
				responsible_person_1_id,
				responsible_person_1_verification,
				...fields
			} = data
			const files = {
				organisation_logo,
				statement,
				responsible_person_1_id,
				responsible_person_1_verification
			}

			compose(
				forEach(([key, value]) => {
					formData.append(key, value)
				}),
				toPairs
			)(fields)

			await Promise.all(
				compose(
					map(([key, [file]]) => {
						return new Promise((resolve, reject) => {
							const reader = new FileReader()
							reader.onabort = reject
							reader.onerror = reject
							reader.onload = () => {
								formData.append(key, file)
								resolve({ [key]: reader.result })
							}
							reader.readAsBinaryString(file)
						})
					}),
					toPairs,
					filter(Boolean)
				)(files)
			)

			const response = await api(REGISTER_ORG, {
				body: formData,
				method: 'POST'
			})

			setLoading(false)

			if (response.status >= 200 && response.status < 300) {
				setView('thanks')
				return
			}

			const { messages } = JSON.parse(response.message)
			setFormError(messages)
		},
		[setFormError, setLoading]
	)

	const watchFields = watch([
		'organisation_logo',
		'statement',
		'responsible_person_1_id',
		'responsible_person_1_verification'
	])

	const same_address = watch(['same_address'])

	useEffect(() => {
		setExtraAddress(same_address.same_address === '0')
	}, [same_address])

	useEffect(() => {
		setTheme('light')
	}, [setTheme])

	return (
		<>
			<Helmet>
				<title>Signup | GoodGive</title>
			</Helmet>
			<div className="wrapper">
				<AnimatePresence exitBeforeEnter>
					<Switch test={view}>
						<motion.div
							variants={fade}
							initial="form"
							animate="enter"
							exit="exit"
							case="form"
						>
							<div className="py-8 md:flex md:justify-between">
								<div className="md:w-2/5">
									<TextPanel
										heading="School Registration"
										body={`<p>To register your organisation with <a href="#0">GoodGive</a>, please complete the steps below: </p><p>1. Complete and submit the online registration form below</p><p>2. In some cases, we may need to contact your organisation to complete 	the registration. </p>`}
									/>
								</div>
								<form
									method="POST"
									onSubmit={handleSubmit(onSubmit)}
									className="md:w-1/2"
								>
									<FormError ref={errorRef} error={formError} />
									<Fieldset title="Organisation logo">
										<p className="mb-8">
											You can include your logo on every fundraising page. If
											you don't have a logo, that's okay, we will use our
											default image (See below).
										</p>
										<label htmlFor="organisation_logo">
											<span className="block mb-4 text-sm text-pale">
												Upload your organisation’s logo
											</span>
											<InputUpload
												name="organisation_logo"
												id="organisation_logo"
												className="w-full"
												ref={register({ required: 'This field is required' })}
												error={errors.organisation_logo}
												multiple={false}
												files={watchFields.organisation_logo}
												setValue={setValue}
											>
												Choose file
											</InputUpload>
										</label>
									</Fieldset>

									<Fieldset title="Organisation's details">
										<p className="mb-4 text-sm text-pale">
											An asterisk ( *) denotes a required field.
										</p>
										<Label
											htmlFor="organisation_name"
											text="Organisation name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="organisation_name"
												name="organisation_name"
												type="text"
												placeholder="Organisation name (as you want it displayed) *"
												ref={register({ required: 'This field is required' })}
												error={errors.organisation_name}
											/>
										</Label>
										<Label
											htmlFor="organisation_date"
											text="Date established *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="organisation_date"
												name="organisation_date"
												type="text"
												placeholder="Date your organisation was established *"
												ref={register({ required: 'This field is required' })}
												error={errors.organisation_date}
											/>
										</Label>
										<Label
											htmlFor="organisation_type"
											text="Type of organisation *"
											className="w-full mb-4"
										>
											<Select
												name="organisation_type"
												id="organisation_type"
												defaultValue="select"
												options={[{ id: 'school', value: 'school' }]}
												ref={register({
													required: 'This field is required',
													validate: value => value !== 'select'
												})}
												error={errors.organisation_type}
											/>
										</Label>
									</Fieldset>

									<Fieldset title="Registered Address">
										<p className="mb-4 text-sm text-pale">
											An asterisk ( *) denotes a required field.
										</p>
										<Label
											htmlFor="registered_address_1"
											text="Address Line 1 *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="registered_address_1"
												name="registered_address_1"
												type="text"
												placeholder="87 Chesterfield Rd"
												ref={register({ required: 'This field is required' })}
												error={errors.registered_address_1}
											/>
										</Label>
										<Label
											htmlFor="registered_address_2"
											text="Address Line 2"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="registered_address_2"
												name="registered_address_2"
												type="text"
												placeholder="Springfield"
												ref={register}
												error={errors.registered_address_2}
											/>
										</Label>
										<Label
											htmlFor="registered_suburb"
											text="Suburb *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="registered_suburb"
												name="registered_suburb"
												type="text"
												placeholder="Suburb *"
												ref={register({ required: 'This field is required' })}
											/>
										</Label>
										<Label
											htmlFor="registered_state"
											text="State *"
											className="w-full mb-4"
										>
											<Select
												name="registered_state"
												id="registered_state"
												defaultValue="select"
												options={STATES}
												ref={register({
													required: 'This field is required',
													validate: value => value !== 'select'
												})}
												error={errors.registered_state}
											/>
										</Label>
										<Label
											htmlFor="registered_postcode"
											text="Postcode *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="registered_postcode"
												name="registered_postcode"
												type="text"
												placeholder="11553 *"
												ref={register({ required: 'This field is required' })}
												error={errors.registered_postcode}
											/>
										</Label>
									</Fieldset>

									<Fieldset title="Responsible Person 1">
										<p className="mb-4 text-sm text-pale">
											This person is responsible for your organisation, is the
											decision maker, can sign off on legal documents etc.
										</p>

										<Label
											htmlFor="responsible_person_1_position"
											text="Position"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_position"
												name="responsible_person_1_position"
												type="text"
												placeholder="Position"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_position}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_first_name"
											text="First Name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_first_name"
												name="responsible_person_1_first_name"
												type="text"
												placeholder="First Name"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_first_name}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_last_name"
											text="Last Name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_last_name"
												name="responsible_person_1_last_name"
												type="text"
												placeholder="First Name"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_last_name}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_email"
											text="Email *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_email"
												name="responsible_person_1_email"
												type="email"
												placeholder="Email"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_email}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_tel"
											text="Direct phone number *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_tel"
												name="responsible_person_1_tel"
												type="tel"
												placeholder="Direct phone number"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_tel}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_dob"
											text="Date of birth *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_dob"
												name="responsible_person_1_dob"
												type="text"
												placeholder="Date of birth"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_dob}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_id"
											text="Identifcation *"
											className="w-full mb-4"
										>
											<InputUpload
												name="responsible_person_1_id"
												id="responsible_person_1_id"
												className="w-full max-w-xs"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_id}
												multiple={false}
												files={watchFields.responsible_person_1_id}
												setValue={setValue}
											>
												Choose file
											</InputUpload>
										</Label>

										<Label
											htmlFor="responsible_person_1_address_1"
											text="Address Line 1 *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_address_1"
												name="responsible_person_1_address_1"
												type="text"
												placeholder="87 Chesterfield Rd"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_address_1}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_address_2"
											text="Address Line 2"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_address_2"
												name="responsible_person_1_address_2"
												type="text"
												placeholder="Springfield"
												ref={register}
												error={errors.responsible_person_1_address_2}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_suburb"
											text="Suburb *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_suburb"
												name="responsible_person_1_suburb"
												type="text"
												placeholder="Suburb *"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_suburb}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_state"
											text="State *"
											className="w-full mb-4"
										>
											<Select
												defaultValue="select"
												name="responsible_person_1_state"
												id="responsible_person_1_state"
												options={STATES}
												ref={register({
													required: 'This field is required',
													validate: value => value !== 'select'
												})}
												error={errors.responsible_person_1_state}
											/>
										</Label>
										<Label
											htmlFor="responsible_person_1_postcode"
											text="Postcode *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="responsible_person_1_postcode"
												name="responsible_person_1_postcode"
												type="text"
												placeholder="11553"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_postcode}
											/>
										</Label>
									</Fieldset>

									<Fieldset title="Organisations Responsible Persons">
										<p className="mb-8">
											Please upload verification of position for your
											responsible persons e.g. AGM Minutes, company registration
											document etc.
										</p>
										<label htmlFor="responsible_person_1_verification">
											<span className="block mb-4 text-sm text-pale">
												Attach a file *
											</span>
											<InputUpload
												name="responsible_person_1_verification"
												id="responsible_person_1_verification"
												className="w-full"
												ref={register({ required: 'This field is required' })}
												error={errors.responsible_person_1_verification}
												files={watchFields.responsible_person_1_verification}
												setValue={setValue}
											>
												Choose file
											</InputUpload>
										</label>
									</Fieldset>

									<Fieldset title="Details of entity conducting fundraising">
										<div className="mb-8">
											<p className="mb-4">
												Please note this is the school entity conducting the
												fundraising activity and referred to in our terms &
												conditions of Good Give online fundraising services.
											</p>
											<p>
												This may be the school or the fundraising committee of
												your school, such as the Parent Teachers Association.
											</p>
										</div>

										<Label
											htmlFor="entity_name"
											text="Entity name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="entity_name"
												name="entity_name"
												type="text"
												placeholder="Entity name"
												ref={register({ required: 'This field is required' })}
												error={errors.entity_name}
											/>
										</Label>
										<p className="pl-2 mb-4 ml-5 text-pale">
											Deductible gift recipient (DGR) Status
										</p>
										<Checkbox
											ref={register}
											className="mb-8 text-pale"
											name="dgr"
											id="dgr"
										>
											Tick to confirm this entity has DGR status for tax
											deductibility
										</Checkbox>

										<Label htmlFor="nzbn" text="NZBN *" className="w-full mb-4">
											<InputField
												className="w-full"
												id="nzbn"
												name="nzbn"
												type="text"
												placeholder="NZBN"
												ref={register({ required: 'This field is required' })}
												error={errors.nzbn}
											/>
										</Label>
										<p className="mb-4">
											Is the entity postal address the same as the school
											address? *
										</p>

										<Checkbox
											ref={register}
											type="radio"
											className="mb-2"
											name="same_address"
											id="yes"
											value="1"
										>
											Yes
										</Checkbox>

										<Checkbox
											value="0"
											ref={register}
											type="radio"
											name="same_address"
											id="no"
										>
											No
										</Checkbox>
										{extra_address && (
											<>
												<Label
													htmlFor="entity_address_1"
													text="Address Line 1 *"
													className="w-full mt-4 mb-4"
												>
													<InputField
														className="w-full"
														id="entity_address_1"
														name="entity_address_1"
														type="text"
														placeholder="87 Chesterfield Rd"
														ref={register({
															required: 'This field is required'
														})}
														error={errors.entity_address_1}
													/>
												</Label>
												<Label
													htmlFor="entity_address_2"
													text="Address Line 2"
													className="w-full mb-4"
												>
													<InputField
														className="w-full"
														id="entity_address_2"
														name="entity_address_2"
														type="text"
														placeholder="Springfield"
														ref={register}
														error={errors.entity_address_2}
													/>
												</Label>
												<Label
													htmlFor="entity_suburb"
													text="Suburb *"
													className="w-full mb-4"
												>
													<InputField
														className="w-full"
														id="entity_suburb"
														name="entity_suburb"
														type="text"
														placeholder="Suburb *"
														ref={register({
															required: 'This field is required'
														})}
														error={errors.entity_suburb}
													/>
												</Label>
												<Label
													htmlFor="entity_state"
													text="State *"
													className="w-full mb-4"
												>
													<Select
														defaultValue="select"
														name="entity_state"
														id="entity_state"
														options={STATES}
														ref={register({
															required: 'This field is required',
															validate: value => value !== 'select'
														})}
														error={errors.entity_state}
													/>
												</Label>
												<Label
													htmlFor="entity_postcode"
													text="Postcode"
													className="w-full mb-4"
												>
													<InputField
														className="w-full"
														id="entity_postcode"
														name="entity_postcode"
														type="text"
														placeholder="11553"
														ref={register({
															required: 'This field is required'
														})}
														error={errors.entity_postcode}
													/>
												</Label>
											</>
										)}
									</Fieldset>

									<Fieldset title="School profile on our website">
										<p className="mb-8">
											Some information you provide in this section will appear
											in your School Profile
										</p>
										<label
											className="block mb-8"
											htmlFor="organisation_profile"
										>
											<span className="block mb-4 text-sm text-pale">
												Organisation profile *
											</span>
											<textarea
												name="organisation_profile"
												id="organisation_profile"
												className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg resize-none"
												rows="10"
												ref={register}
											/>
										</label>
										<p className="mb-8 text-pale">Tick all that apply</p>

										<Checkbox
											name="school_organisation"
											className="mb-6 text-pale"
											id="school_organisation"
											ref={register}
										>
											My school organises its own swimming carnival,
											read-a-thon, cross-country/athletic events
										</Checkbox>

										<Checkbox
											className="mb-6 text-pale"
											name="goodgive_assist"
											id="goodgive_assist"
											ref={register}
										>
											We would like Good Give to assist us in developing online
											fundraising for our event/s
										</Checkbox>

										<Label
											htmlFor="public_tel"
											text="Public phone number *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="public_tel"
												name="public_tel"
												type="tel"
												placeholder="01234567890"
												ref={register({ required: 'This field is required' })}
												error={errors.public_tel}
											/>
										</Label>

										<Label
											htmlFor="publicEmail"
											text="Public email *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="public_email"
												name="public_email"
												type="email"
												placeholder="hello@email.com"
												ref={register({ required: 'This field is required' })}
												error={errors.public_email}
											/>
										</Label>

										<Label
											htmlFor="website"
											text="Website URL"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="website"
												name="website"
												type="text"
												placeholder="www.mysite.com"
												pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$"
												ref={register}
												// error={errors.website}
											/>
										</Label>
									</Fieldset>

									<Fieldset title="Fundraising Contact">
										<p className="mb-8">
											You can include your logo on every fundraising page. If
											you don't have a logo, that's okay, we will use our
											default image (See below).
										</p>

										<Label
											htmlFor="contact_position"
											text="Position"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="contact_position"
												name="contact_position"
												type="text"
												placeholder="Position"
												ref={register({ required: 'This field is required' })}
												error={errors.publicEmail}
											/>
										</Label>
										<Label
											htmlFor="contact_first_name"
											text="First Name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="contact_first_name"
												name="contact_first_name"
												type="text"
												placeholder="First Name"
												ref={register({ required: 'This field is required' })}
												error={errors.contact_first_name}
											/>
										</Label>
										<Label
											htmlFor="contact_last_name"
											text="Last Name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="contact_last_name"
												name="contact_last_name"
												type="text"
												placeholder="Last Name"
												ref={register({ required: 'This field is required' })}
												error={errors.contact_last_name}
											/>
										</Label>
										<Label
											htmlFor="contact_email"
											text="Email *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="contact_email"
												name="contact_email"
												type="email"
												placeholder="Email"
												ref={register({ required: 'This field is required' })}
												error={errors.contact_email}
											/>
										</Label>
										<Label
											htmlFor="contact_tel"
											text="Direct phone number *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="contact_tel"
												name="contact_tel"
												type="tel"
												placeholder="Direct phone number"
												ref={register({ required: 'This field is required' })}
												error={errors.contact_tel}
											/>
										</Label>
									</Fieldset>

									<Fieldset title="Payment destination details">
										<p className="mb-4">
											We need this information to deposit donations made to your
											organisation entity. If you are claiming DGR (Tax
											deductible) status, you must provide the account details
											of the entity that has DGR status.
										</p>
										<p className="mb-4">
											You will be required to supply proof of ownership of this
											bank account by providing a bank statement in the next
											step.
										</p>

										<Label
											htmlFor="bank_name"
											text="Bank name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="bank_name"
												name="bank_name"
												type="text"
												placeholder="Bank name *"
												ref={register({ required: 'This field is required' })}
												error={errors.bank_name}
											/>
										</Label>
										<Label
											htmlFor="account_name"
											text="Account name *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="account_name"
												name="account_name"
												type="text"
												placeholder="Account name"
												ref={register({ required: 'This field is required' })}
												error={errors.account_name}
											/>
										</Label>
										<Label
											htmlFor="bsb_number"
											text="BSB number *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="bsb_number"
												name="bsb_number"
												type="text"
												placeholder="BSB number"
												ref={register({ required: 'This field is required' })}
												error={errors.bsb_number}
											/>
										</Label>
										<Label
											htmlFor="account_number"
											text="Account number *"
											className="w-full mb-4"
										>
											<InputField
												className="w-full"
												id="account_number"
												name="account_number"
												type="text"
												placeholder="Email"
												ref={register({ required: 'This field is required' })}
												error={errors.account_number}
											/>
										</Label>
										<label htmlFor="statement">
											<span className="block mb-4 text-sm text-pale">
												Attach Bank Statement for verification of bank account
												details *
											</span>
											<InputUpload
												name="statement"
												id="statement"
												className="w-full"
												ref={register({ required: 'This field is required' })}
												error={errors.statement}
												files={watchFields.statement}
												setValue={setValue}
											>
												Choose file
											</InputUpload>
										</label>
									</Fieldset>

									<Fieldset title="Terms and Conditions">
										<RichText
											className="mb-8"
											dangerouslySetInnerHTML={{ __html: terms.content }}
										/>

										<p className="mb-4 text-pale">
											I have read and agreed to the Terms & Conditions *
										</p>
										<Checkbox
											name="terms"
											id="terms"
											className="mb-8 text-pale"
											ref={register}
										>
											I agree to receive future communication about GoodGive
											Fundraising
										</Checkbox>
										<SubmitButton
											isLoading={isLoading}
											type="submit"
											className="w-full max-w-xs"
										>
											Register
										</SubmitButton>
									</Fieldset>
								</form>
							</div>
						</motion.div>
						<MotionBox
							case="thanks"
							variants={fade}
							initial="initial"
							animate="enter"
							exit="exit"
							className="w-full max-w-xl mx-auto my-12 md:my-24 lg:my-40"
						>
							<div className="mb-8">
								<h1 className="mb-4 leading-tight text-md md:text-xl font-sans-semi">
									Thanks for signing up
								</h1>
								<p className="text-pale">
									Please check your email (and spam) for an an account
									activation link which you'll receive shortly.
								</p>
							</div>

							<Button as={Link} to="/" className="w-full">
								Proceed to shop
							</Button>
						</MotionBox>
					</Switch>
				</AnimatePresence>
			</div>
		</>
	)
}

export default RegisterOrganisations
