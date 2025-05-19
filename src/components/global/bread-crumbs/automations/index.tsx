'use client'
import { ChevronRightIcon, PencilIcon } from 'lucide-react'
import React from 'react'
import ActivateAutomationButton from '../../activate-automation-button'
import { useQueryAutomation } from '@/hooks/use-queries'
import { useEditAutomation } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { Input } from '@/components/ui/input'

type Props = {
	id: string
}

const AutomationsBreadCrumb = ({ id }: Props) => {
	const { data } = useQueryAutomation(id)

	const { edit, enableEdit, inputRef, isPending } = useEditAutomation(id)

	const latestVariable = useMutationDataState(['update-automation'])
	return (
		<div className='rounded-full w-full p-5 bg-[#18181b1a] flex items-center'>
			<div className='flex items-center gap-x-3 min-w-0'>
				<p className='text-[#9b9ca0] truncate'>Automations</p>
				<ChevronRightIcon className='text-[#5c75d6] shrink-0' />
				<span className='flex gap-x-3 items-center min-w-0'>
					{edit ? (
						<Input ref={inputRef}
							placeholder={isPending ? latestVariable.variables : "Add a new name"}
							className='bg-transparent h-auto outline-none text-base border-none p-0'
						/>
					) : (
						<p className='text-[#9b9ca0] truncate'>{latestVariable?.variables
							? latestVariable?.variables.name
							: data?.data?.name}</p>
					)
					}
					{edit ?
						(<></>)
						: (<span className='cursor-pointer hover:opacity-75 duration-75 transition shrink-0' onClick={enableEdit}>
							<PencilIcon className='w-4 h-4 mr-4' />
						</span>)
					}
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
			<ActivateAutomationButton id={id} />
		</div >
	)
}

export default AutomationsBreadCrumb