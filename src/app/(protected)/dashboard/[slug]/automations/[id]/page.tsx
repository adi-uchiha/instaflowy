import AutomationsBreadCrumb from '@/components/global/bread-crumbs/automations'
import Trigger from '@/components/global/automations/trigger'
import React from 'react'
import { InfoIcon } from 'lucide-react'
import { getAutomationInfo } from '@/actions/automations'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { PrefetchUserAutomation } from '@/react-query/prefetch'

type Props = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetaData({
  params,
}: {
  params: { id: string }
}) {
  const info = await getAutomationInfo(params.id)
  return {
    title: info.data?.name,
  }
}

const Page = async ({ params }: Props) => {
  const { id } = await params

  const query = new QueryClient()
  await PrefetchUserAutomation(query, id)

  return (
    <HydrationBoundary state={dehydrate(query)}>

      <div className="flex flex-col items-center gap-y-20">
        <AutomationsBreadCrumb id={id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2 text-xl font-bold">
            <InfoIcon className='text-blue-900' />
            When ...
          </div>
          <Trigger id={id} />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Page