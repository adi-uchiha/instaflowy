import { Input } from '@/components/ui/input'
import { useKeywords } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { useQueryAutomation } from '@/hooks/use-queries'
import { XIcon } from 'lucide-react'
import React from 'react'

type Props = {
	id: string
}

const Keywords = ({ id }: Props) => {
	const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
	const latestVariable = useMutationDataState(['add-keyword'])
	const { data } = useQueryAutomation(id)

	return (
		<div className='bg-background/80 flex flex-col gap-y-3 p-3 rounded-xl'>
			<p className='text-sm text-muted-foreground'>
				Add words that trigger automation
			</p>
			<div className='flex flex-wrap justify-start gap-2 items-center'>
				{data?.data?.keywords && data.data.keywords.map((word) => (
					<div
						key={word.id}
						className='bg-background/90 flex items-center gap-x-2 capitalize text-muted-foreground py-1 px-4 rounded-full'
					>
						<p>{word.word}</p>
						<XIcon
							size={20}
							onClick={() => deleteMutation({ id: word.id })}
						/>
					</div>
				))}
				{latestVariable?.state?.status === 'pending' && latestVariable?.variables?.keyword && (
					<div className='bg-background/90 flex items-center gap-x-2 capitalize text-muted-foreground py-1 px-4 rounded-full'>
						{latestVariable.variables.keyword}
					</div>
				)}
				<Input placeholder='Add keyword...'
					style={{
						width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch'
					}}
					value={keyword}
					className='p-0 bg-transparent ring-0 border-none outline-none'
					onChange={onValueChange}
					onKeyUp={onKeyPress}
				/>
			</div>
		</div>
	)
}

export default Keywords