import SignOutBtn from '@/components/SignOutBtn'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface PageProps {
  
}

const Page = async ({}) => {
    const session = await getServerSession(authOptions)
  return (
    <>
        <div>Dashboard Page</div>
        <p>user {session?.user.email}</p>
        <SignOutBtn />
    </>
  ) 
}

export default Page