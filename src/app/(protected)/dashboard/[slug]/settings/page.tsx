import Billing from '@/components/global/billing'
import React from 'react'

type Props = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params }: Props) => {
  return <Billing />
}

export default Page