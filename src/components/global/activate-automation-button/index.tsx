import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import ActiveAutomation from '@/components/svgs/ActiveAutomation'

type Props = {}

const ActivateAutomationButton = (props: Props) => {
	return (
		<Button className='lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3353cc] font-medium to-[#1c2d70] mx-4'>
			<Loader state={false}>
				<ActiveAutomation />
				<p
				className='lg:inline hidden'
				>
					Activate
				</p>
			</Loader>
		</Button>
	)
}

export default ActivateAutomationButton