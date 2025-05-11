'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '../loader'
import { FastForwardIcon } from 'lucide-react'
import { useCreateAutomation } from '@/hooks/use-automations'
import { v4 } from 'uuid'

const CreateAutomation = () => {
	const mutationId = useMemo(() => `temp_${v4()}`, [])

	const { isPending, mutate } = useCreateAutomation(mutationId)

	return (
		<Button className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 test-white rounded-full from-[#3352CC] to-[#1C2D70]'
			onClick={() => mutate({ 
				name: 'Untitled', 
				id: mutationId,
				createdAt: new Date(), 
				keywords: [],
				isTemporary: true 
			})}
		>
			<Loader state={false}>
				<FastForwardIcon />
				<p className='lg:inline hidden'>Create an Automation</p>
			</Loader>
		</Button>
	)
}

export default CreateAutomation