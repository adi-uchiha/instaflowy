'use client'


import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
import { usePath } from '@/hooks/user-nav'
import React from 'react'
import Sheet from '../sheet'
import { Info, Menu } from 'lucide-react'
import Items from '../sidebar/items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { SubscriptionPlan } from '../subscription-plan'
import UpgradeCard from '../sidebar/upgrade'
import LogoSmall from '@/components/svgs/logo-small'
import CreateAutomation from '../create-automation'
import Search from './search'
import Notifications from './notifications'
import MainBreadCrumb from '../bread-crumbs/main-bread-cumb'


type Props = {
	slug: string
}

const InfoBar = ({ slug }: Props) => {
	const { page } = usePath()
	const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug
	return currentPage &&
		<div className='flex flex-col'>

			<div className='flex gap-x-3 lg:gap-x-5 justify-end'>
				<span className='lg:hidden gap-x-2 flex items-center flex-1'>
					<Sheet
						side='left'
						trigger={<Menu />}
						className='lg:hidden'
					>
						<div className='flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e]/90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl'>
							<div className='flex gap-x-2 items-center	pl-12 pr-12 p-5 justify-center'>
								<LogoSmall />
							</div>
							<div className='flex flex-col py-3'>
								<Items page={page} slug={slug} />
							</div>
							<div className='px-16'>
								<Separator
									orientation='horizontal'
									className='bg-[#333336]'
								/>
							</div>
							<div className='px-3 flex flex-col gap-y-5'>
								<div className='flex gap-x-3'>
									<ClerkAuthState />
									<p className='text-[#9B9CA0]'>Profile</p>
								</div>
								<div className='flex gap-x-3'>
									<Info className='w-5 h-5'></Info>
									<p className='text-[#9B9CA0]'>Help</p>
								</div>
							</div>
							<SubscriptionPlan type='FREE'>
								<div className='flex flex-1 flex-col justify-end'>
									<UpgradeCard />
								</div>
							</SubscriptionPlan>
						</div> 
					</Sheet>
				</span>
				<Search />
				<CreateAutomation />
				<Notifications />
			</div>
			<MainBreadCrumb 
				page= {page === slug ? 'Home' : page}
				slug={slug}
			/>
		</div>
}

export default InfoBar