import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-md items-center'>
        <div className='flex font-bold text-xl items-center' >
        <Image src={'/online-education.png'} alt='logo' width={40} height={40}/><h2 className='ml-2'>Course Maker AI</h2></div>
        <Link href={"/dashboard"} ><Button>Get Started</Button></Link>
    </div>
  )
}

export default Header