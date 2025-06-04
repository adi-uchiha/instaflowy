import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import React from 'react'

type Props = {
	label: string
	subLabel: string
	description: string
}

const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
	return (
		<div className='relative border-[1px] border-white/10 p-8 rounded-xl flex flex-col gap-y-16 overflow-hidden bg-black/20 backdrop-blur-sm'>
			<div className='flex flex-col z-40'>
				<h2 className='text-2xl font-medium text-white/90'>{label}</h2>
				<p className='text-white/60 text-sm mt-1'>{subLabel}</p>
			</div>
			<div className='flex justify-between items-center z-40'>
				<p className='text-white/60 text-sm max-w-[70%]'>{description}</p>
				<Button className="rounded-full bg-[#0063FF] hover:bg-[#0063FF]/90 w-11 h-11 p-0">
					<ArrowRightIcon className="h-5 w-5" />
				</Button>
			</div>
			{/* Top left gradient */}
			<div className='w-[120%] h-[120%] absolute -top-[10%] -left-[10%] z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,99,255,0.15)_0%,transparent_50%)]' />
			{/* Bottom right gradient */}
			<div className='w-[120%] h-[120%] absolute -bottom-[10%] -right-[10%] z-0 bg-[radial-gradient(circle_at_bottom_right,rgba(149,78,255,0.15)_0%,transparent_50%)]' />
		</div>
	)
}

export default DoubleGradientCard