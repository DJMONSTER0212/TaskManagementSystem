"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

import React from 'react'

const page = () => {
    const router = useRouter();
    return (
        <>
            <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">Congrats You have completed Your task    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-indigo-600 sm:text-5xl">🎉🎈🎊</h1>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {/* <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </a> */}
                        <div>
                            <Button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => router.push('/')}>Go back home</Button>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default page
