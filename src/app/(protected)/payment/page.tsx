import { onSubscribe } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
	searchParams?: Promise<{
		session_id?: string
		cancel?: boolean
	}>;
}

const Page = async ({ searchParams }: Props) => {
	const sParams = await searchParams
	if (sParams?.session_id) {
		const customer = await onSubscribe(sParams.session_id)

		if (customer.status === 200) {
			return redirect('/dashboard')
		}
		return <div className='flex flex-col justify-center items-center h-screen w-full'>
			<h4 className='text-5xl font-bold'>404</h4>
			<p className='text-xl font-bold'>
				Ooop! Something went wrong
			</p>
		</div>
	}

	if (sParams?.cancel) {
		return <div className='flex flex-col justify-center items-center h-screen w-full'>
			<h4 className='text-5xl font-bold'>404</h4>
			<p className='text-xl font-bold'>
				Ooop! Something went wrong
			</p>
		</div>
	}
}

export default Page	