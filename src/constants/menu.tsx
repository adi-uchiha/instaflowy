import { FastForwardIcon, Home, Link, Settings } from 'lucide-react'
import { v4 as uuid } from 'uuid'

type FieldProps = {
	label: string
	id: string
}

type SidebarProps = {
	icon: React.ReactNode
} & FieldProps

export const SIDEBAR_MENU: SidebarProps[] = [
	{
		id: uuid(),
		label: "home",
		icon: <Home className='w-5 h-5'/>
	},
	{
		id: uuid(),
		label: "automations",
		icon: <FastForwardIcon className='w-5 h-5'/>
	},
	{
		id: uuid(),
		label: "integrations",
		icon: <Link className='w-5 h-5'/>
	},
	{
		id: uuid(),
		label: "settings",
		icon: <Settings className='w-5 h-5'/>
	},
]