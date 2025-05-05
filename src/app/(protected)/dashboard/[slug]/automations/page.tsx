import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import { Check } from 'lucide-react'
import React from 'react'

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params }: Props) => {
  await params // await even if not used
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-4">
        <AutomationList />
      </div>
      <div className="lg:col-span-2">
        <div className="flex flex-col rounded-xl gap-y-6 bg-[#1b1b1b] p-6 border-[1px] overflow-hidden border-pink-300">
          <div>
            <h2 className="text-xl">Automations</h2>
            <p className="text-muted-foreground">
              Your live automations will show here.
            </p>
          </div>
          <div className='flex flex-col gap-y-3'>
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="text-medium">Direct traffic towards website</h3>
                  <p className="text-muted-foreground text-sm">October 5th 2024
                  </p>
                </div>
                <Check />
              </div>
            ))}
          </div>
          <CreateAutomation />
        </div>
      </div>
    </div>
  )
}

export default Page