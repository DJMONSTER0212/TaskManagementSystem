import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import {MainNav} from './MainNav'
// import StoreSwitcher from './store.switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ModeToggle } from './theme-toggle'

const Navbar =  () => {

    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>

                {/* <StoreSwitcher items={stores}/> */}
                <MainNav className='mx-6'/>
                <div className='ml-auto flex items-center space-x-4'>
                    <ModeToggle/>
                    <UserButton afterSignOutUrl='/'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar
