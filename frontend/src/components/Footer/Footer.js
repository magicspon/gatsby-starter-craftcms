/* eslint-disable no-underscore-dangle */
import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { filter, compose, prop, head } from 'ramda'
// import Social from '@/components/Social'
// import FormNewsletter from '@/components/FormNewsletter'
import IconWrapper from '@/utils/IconWrapper'
import LogoIcon from '@/icons/logo.svg'
import Link from '@/utils/Link'
import useConstant from '@/hooks/useConstant'

function MenuList({ heading, links }) {
	return (
		<>
			<h4 className="mb-4 text-base text-black font-sans-semi">{heading}</h4>
			<ul className="text-base text-gray-700 font-sans-medium">
				{links.map(({ text, linkUrl }) => (
					<li className="mb-3 last:mb-0" key={text}>
						<Link
							className="focus:outline-none hocus:underline"
							activeClassName="underline"
							to={linkUrl}
						>
							{text}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

MenuList.propTypes = {
	heading: string.isRequired,
	links: arrayOf(
		shape({
			linkUrl: string,
			text: string
		})
	)
}

function Footer() {
	const data = useStaticQuery(graphql`
		query FooterLinks {
			craft {
				globalSets {
					__typename
					... on Craft_footer_GlobalSet {
						id
						name
						links {
							linkUrl
							text
						}
						links2 {
							linkUrl
							text
						}
						links3 {
							linkUrl
							text
						}
						heading
						heading10
						heading2
						heading3
						heading4
					}
				}
			}
		}
	`)

	const { links, links2, links3, heading10, heading2, heading3 } = useConstant(
		() =>
			compose(
				head,
				filter(v => v.__typename === 'Craft_footer_GlobalSet'),
				prop('globalSets'),
				prop('craft')
			)(data)
	)

	return (
		<footer className="bg-white">
			<div className="py-8 wrapper lg:py-12">
				<div className="mb-8 sm:flex sm:flex-wrap md:items-baseline sm:mb-16 md:mb-32">
					<div aria-hidden className="w-full mb-8 md:w-auto md:mb-0 md:mr-auto">
						<IconWrapper className="w-20" icon={LogoIcon} />
					</div>
					<div className="pr-4 mb-8 sm:mb-0 sm:w-1/3 md:w-1/4 lg:w-1/6">
						<MenuList heading={heading10} links={links} />
					</div>
					<div className="pr-4 mb-8 sm:mb-0 sm:w-1/3 md:w-1/4 lg:w-1/6">
						<MenuList heading={heading2} links={links2} />
					</div>
					<div className="sm:w-1/3 md:w-1/4 lg:w-1/6">
						<MenuList heading={heading3} links={links3} />
					</div>
				</div>
				{/* <hr className="mb-8 border-t-2" />
				<div className="md:flex">
					<FormNewsletter className="mb-12" />
					<div className="flex justify-center md:ml-auto">
						<Social google="#0" twitter="#0" linkedin="#0" />
					</div>
				</div> */}
			</div>
		</footer>
	)
}

export default Footer
