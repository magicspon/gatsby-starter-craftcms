import React from 'react'
import CampaignGraph from './CampaignGraph'

export default {
	title: 'widget|CampaignGraph',

	parameters: {
		component: CampaignGraph
	}
}

export const basic = () => (
	<CampaignGraph
		data={[
			{
				value: 100
			},
			{
				value: 300
			},
			{
				value: 280
			},
			{
				value: 370
			},
			{
				value: 500
			},
			{
				value: 700
			},
			{
				value: 600
			},
			{
				value: 800
			},
			{
				value: 590
			},
			{
				value: 900
			}
		]}
	/>
)
