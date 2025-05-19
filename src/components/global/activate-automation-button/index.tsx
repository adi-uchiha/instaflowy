import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import ActiveAutomation from '@/components/svgs/ActiveAutomation'
import { useQueryAutomation } from '@/hooks/use-queries'
import { useMutationData } from '@/hooks/use-mutation-data'
import { activateAutomation } from '@/actions/automations'

type Props = {
	id: string
}

const ActivateAutomationButton = ({ id }: Props) => {
	const { data } = useQueryAutomation(id)
	const { mutate, isPending } = useMutationData(
		['activate'],
		(data: { state: boolean }) => activateAutomation(id, data.state),
		'automation-info'
	)

	return (
		<Button
			onClick={() => mutate({ state: !data?.data?.active })}
			className='lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3353cc] font-medium to-[#1c2d70] ml-4'>
			<Loader state={isPending}>
				<ActiveAutomation />
				<p className='lg:inline hidden'>
					{data?.data?.active ? 'Disable' : 'Activate'}
				</p>
			</Loader>
		</Button>
	)
}

export default ActivateAutomationButton