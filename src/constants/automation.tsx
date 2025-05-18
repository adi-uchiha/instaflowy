import { BrainIcon, SendIcon } from "lucide-react"
import { JSX } from "react"
import { v4 } from "uuid"

export type AutomationListenerProps = {
	id: string
	label: string
	icon: JSX.Element
	description: string
	type: 'SMARTAI' | 'MESSAGE'
}

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
	{
		id: v4(),
		label: 'Send the user a message',
		icon: <SendIcon />,
		description: 'Enter the message that you want to be sent to the user',
		type: 'MESSAGE'
	},
	{
		id: v4(),
		label: 'Let Smart AI take over',
		icon: <BrainIcon />,
		description: 'Tell AI about your project (Upgrade to use this feature)',
		type: 'SMARTAI'
	}
]