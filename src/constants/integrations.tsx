import { InstagramIcon, Satellite } from "lucide-react";

type Props = {
	title: string
	icon: React.ReactNode
	description: string
	strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
	{
		title: 'Connect Instagram',
		description: 'Connect your instagram account to create automations on Posts and DMs',
		icon: <InstagramIcon className="text-pink-400"/>,
		strategy: 'INSTAGRAM'
	},
	{
		title: 'Connect Salesforce',
		description: 'Connect your safeforce customer relationship management',
		icon: <Satellite  className="text-blue-400"/>,
		strategy: 'CRM'
	}
]