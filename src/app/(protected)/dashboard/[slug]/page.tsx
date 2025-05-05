import React from 'react'

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params
  return (
    <div>Dashboard {slug}</div>
  )
}

export default Page