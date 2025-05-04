import Sidebar from '@/components/global/sidebar'
import React from 'react'

type Props = {
	children: React.ReactNode
	params: {slug: string}
}

const Layout = async ({ children, params }: Props) => {
	const { slug } = await params
	//Query 
	// WIP: Query Client fetch data

	return <div className='p-3'>
		<Sidebar slug={slug}/>
	</div>
}

export default Layout