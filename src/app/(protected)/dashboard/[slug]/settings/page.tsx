import Billing from '@/components/global/billing'
import React from 'react'

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params }: Props) => {
  await params // await even if not used
  return <Billing />
}

export default Page