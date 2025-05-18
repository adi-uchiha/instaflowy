import { useListener } from '@/hooks/use-automations'
import React from 'react'
import TriggerButton from '../trigger-button'
import { AUTOMATION_LISTENERS } from '@/constants/automation'
import { SubscriptionPlan } from '../../subscription-plan'
import { cn } from '@/lib/utils'

type Props = {
	id: string
}

const ThenAction = ({ id }: Props) => {
	const { onSetListener, register, onFormSubmit, listener: Listener, isPending } = useListener(id)
	return <TriggerButton label="Then">
		<div className='flex flex-col gap-y-2'>
			{AUTOMATION_LISTENERS.map((listener) => listener.type === 'SMARTAI'
				? <SubscriptionPlan key={listener.type} type='PRO' >
					<div onClick={() => onSetListener(listener.type)}
						key={listener.id}
						className={cn(
							Listener === listener.type
								? 'bg-gradient-to-br from-[#3352cc] to-[#1c2d70]'
								: 'bg-background/80',
							'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
						)}
					>
						<div className='flex gap-x-2 items-center'>
							{listener.icon}
							<p>{listener.label}</p>
						</div>
						<p>{listener.description}</p>
					</div>
				</SubscriptionPlan>
				: (
					<div onClick={() => onSetListener(listener.type)}
						key={listener.id}
						className={cn(
							Listener === listener.type
								? 'bg-gradient-to-br from-[#3352cc] to-[#1c2d70]'
								: 'bg-background/80',
							'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
						)}
					>
						<div className='flex gap-x-2 items-center'>
							{listener.icon}
							<p>{listener.label}</p>
						</div>
						<p>{listener.description}</p>
					</div>
				)

			)}
		</div>
	</TriggerButton>
}

export default ThenAction