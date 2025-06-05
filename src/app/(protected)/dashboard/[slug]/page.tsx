'use client'

import DoubleGradientCard from '@/components/global/double-gradient-card';
import { DASHBOARD_CARDS } from '@/constants/dashboard';
import { ChartBarIcon } from 'lucide-react';
import React from 'react'
import Chart from './_components/metrics';
import MetricsCard from './_components/metrics/metrics-card';


type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = ({ params }: Props) => {
  return (
    <div className='flex flex-col gap-y-10'>
      <div className='flex gap-5 lg:flex-row flex-col'>
        {
          DASHBOARD_CARDS.map((card) => <DoubleGradientCard key={card.id} {...card} />)
        }
      </div>
      <div className='border-[1px] relative border-gray-600 rounded-xl p-4'>
        <span className='flex gap-y-1 z-50 items-center'>
          <ChartBarIcon className='text-[#3651c0] mr-3' />
          <div className='z-50'>
            <h2 className='text-2xl font-medium text-white'>
              Automated Activity
            </h2>
            <p className='text-muted-foreground text-sm'>
              Automated 1 out of 2 interactions
            </p>
          </div>
        </span>
        <div className='w-full flex lg:flex-row flex-col gap-5'>
          <div className='lg:w-6/12'>
            <Chart />
          </div>
          <div className='lg:w-6/12'>
            <MetricsCard /> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page