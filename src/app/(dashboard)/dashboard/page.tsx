import SignOutBtn from '@/components/SignOutBtn'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface PageProps {
  
}

const Page = async ({}) => {
    const session = await getServerSession(authOptions)
  return (
    <>
        <div>Dashboard Page</div>
        <SignOutBtn />
    </>
  ) 
}

export default Page