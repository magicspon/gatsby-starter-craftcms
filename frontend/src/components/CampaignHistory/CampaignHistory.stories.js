import React from 'react'
import CampaignHistory from './CampaignHistory'

const data = [
	{
		name: 'Schoolwide',
		from: '15/09/2019',
		to: '15/10/2019',
		charity: 'Cancer Society Sunscreen',
		value: '$12,567'
	},
	{
		name: '15A Rugby',
		from: '20/09/2019',
		to: '20/10/2019',
		charity: 'Cancer Society Sunscreen',
		value: '$8,456'
	},
	{
		name: 'Schoolwide',
		from: '15/01/2019',
		to: '15/02/2019',
		charity: 'Cancer Society Sunscreen',
		value: '$21,560'
	},
	{
		name: 'Schoolwide',
		from: '20/09/2019',
		to: '20/10/2019',
		charity: 'Cancer Society Sunscreen',
		value: '$8,456'
	}
]

export default {
	title: 'widget|CampaignHistory',

	parameters: {
		component: CampaignHistory
	}
}

export const basic = () => <CampaignHistory data={data} />
