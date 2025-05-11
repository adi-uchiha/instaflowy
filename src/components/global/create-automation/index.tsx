import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { FastForwardIcon } from 'lucide-react'
import { useCreateAutomation } from '@/hooks/use-automations'

const CreateAutomation = () => {

	  const {} = useCreateAutomation()

	return (
		<Button className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 test-white rounded-full from-[#3352CC] to-[#1C2D70]'>
			<Loader state={false}>
				<FastForwardIcon />
				<p className='lg:inline hidden'>Create an Automation</p>
			</Loader>
		</Button>
	)
}

export default CreateAutomation