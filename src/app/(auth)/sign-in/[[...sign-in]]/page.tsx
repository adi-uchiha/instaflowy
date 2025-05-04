import { SignIn } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
	return <div>
		<SignIn />
	</div>
}

export default Page