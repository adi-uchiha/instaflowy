import { INTEGRATION_CARDS } from '@/constants/integrations'
import React from 'react'
import IntegrationCard from './_components/IntegrationCard'

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params }: Props) => {
  await params // await even if not used
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-full lg:w-8/12 gap-y-5'>
        {INTEGRATION_CARDS.map((card, key) => <IntegrationCard key={key} {...card} />)}
      </div>
    </div>
  )
}

export default Page