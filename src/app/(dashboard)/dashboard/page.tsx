import SignOutBtn from '@/components/SignOutBtn'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
  
}

const Page = async ({}) => {
    const session = await getServerSession(authOptions)

    if (!session) {
      return notFound()
    }
    
  return (
    <>
        <div>Dashboard Page</div>
        <SignOutBtn />
    </>
  ) 
}

export default Page