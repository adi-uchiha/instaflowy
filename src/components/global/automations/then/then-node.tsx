'use client'

import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/use-queries'
import { BrainIcon, InfoIcon, SendIcon } from 'lucide-react'
import React from 'react'
import PostButton from '../post'

type Props = {
	id: string
}

const ThenNode = ({ id }: Props) => {

	const { data } = useQueryAutomation(id)
	const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')
	return !data?.data?.listener ? <></> : <div
		className='w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3'
	>
		<div className='absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50'>
			<span className='h-[9px] w-[9px] bg-connector/10 rounded-full' />
			<Separator
				orientation='vertical'
				className='bottom-full flex-1 border-[1px] border-gray-800'
			/>
			<span className='h-[9px] w-[9px] bg-connector/10 rounded-full' />
		</div>
		<div className='flex gap-x-2'>
			<InfoIcon />
			Then...
		</div>
		<div className='bg-background-80 p-3 rounded-xl flex flex-col gap-y-2'>
			<div>
				{data.data.listener.listener === 'MESSAGE' ? (
					<SendIcon />
				) : (
					<BrainIcon />
				)} 
				<p className='text-lg'>
					{data.data.listener.listener === 'MESSAGE'
						? 'Send the user a message'
						: 'Let Smart AI take over'}
				</p>
			</div>
			<p className='font-light text-muted-foreground'>
				{data.data.listener.prompt}
			</p>
		</div>
		{data.data.posts.length > 0
			? <></>
			: commentTrigger
				? <PostButton id={id} />
				: <></>}
	</div>
}

export default ThenNode