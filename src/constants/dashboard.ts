import { v4 } from "uuid"

type Props = {
	id: string
	label: string
	subLabel: string
	description: string
}

export const DASHBOARD_CARDS: Props[] = [
	{
		id: v4(),
		label: 'Set-up Auto Replies',
		subLabel: 'Deliver a product lineup through Instagram DM',
		description: 'Get product in front of your followers in as many places',
	},
	{
		id: v4(),
		label: 'Answer questions with AI',
		subLabel: 'Identity and respond to queries with AI',
		description: 'The intention of the message will be automatically detected',
	},
	{
		id: v4(),
		label: 'Answer questions with AI',
		subLabel: 'Identity and respond to queries with AI',
		description: 'The intentions of the message will be automatically detected',
	},
]