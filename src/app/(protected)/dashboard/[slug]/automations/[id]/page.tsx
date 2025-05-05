import AutomationsBreadCrumb from '@/components/global/bread-crumbs/automations'
import Trigger from '@/components/global/automations/trigger'
import React from 'react'
import { InfoIcon } from 'lucide-react'

type Props = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  
  return (
    <div className="flex flex-col items-center gap-y-20">
      <AutomationsBreadCrumb id={id} />
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
        <div className="flex gap-x-2">
          <InfoIcon className='text-blue-900' />
          When...
        </div>
        <Trigger id={id} />
      </div>
    </div>
  )
}

export default Page