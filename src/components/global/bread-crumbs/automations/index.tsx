import { ChevronRightIcon, PencilIcon } from 'lucide-react'
import React from 'react'
import ActivateAutomationButton from '../../activate-automation-button'

type Props = {
	id: string
}

const AutomationsBreadCrumb = ({ id }: Props) => {
	
	return (
		<div className='rounded-full w-full p-5 bg-[#18181b1a] flex items-center'>
			<div className='flex items-center gap-x-3 min-w-0'>
				<p className='text-[#9b9ca0] truncate'>Automations</p>
				<ChevronRightIcon className='text-[#5c75d6] shrink-0' />
				<span className='flex gap-x-3 items-center min-w-0'>
					<p className='text-[#9b9ca0] truncate'>This is the automation title</p>
					<span className='cursor-pointer hover:opacity-75 duration-75 transition shrink-0'>
						<PencilIcon className='w-4 h-4 mr-4' />
					</span>
				</span>
			</div>
			<div className='flex items-center ml-auto gap-x-5'>
				<p className='hidden md:block text-muted-foreground text-sm truncate min-w-0'>
					All Updates are automatically saved
				</p>
				<div className='flex gap-x-5 shrink-0'>
					<p className='text-muted-foreground text-sm truncate min-w-0'> Changes Saved</p>

				</div>
			</div>
			<ActivateAutomationButton />
		</div>
	)
}

export default AutomationsBreadCrumb