"use client";
import Image from 'next/image'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,

} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"

// import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation";
import Navbar from '@/components/Navbar';
// import { auth } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Heading } from '@/components/ui/Heading';
import { Plus } from 'lucide-react';
import { TaskClient } from './components/client';

export default function Home() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    if (!isLoaded || !userId) {
        return null;
    }
    const router = useRouter();
    const params = useParams();
    const tempData = [
        {
            "id": "6541ef719da70655fc32a451",
            "title": "Test title",
            "desc": "Test Desc",
            "status": "Pending",
            "Date": "2019-05-01T05:50:00.000Z",
            "authorId": "user_2XWio8j02vMfWSKFtqgL3ifPujL"
        },
        {
            "id": "6541ef719da70655fc32a451",
            "title": "Test title2",
            "desc": "Test Desc2",
            "status": "Finished",
            "Date": "2019-05-01T05:50:00.000Z",
            "authorId": "user_2XWio8j02vMfWSKFtqgL3ifPujL"
        }
    ]
    return (
        <>
            {userId}
            <Navbar />
            <div className="flex  flex-col  p-2">
                <div className='flex items-center justify-between mb-2'>
                    <Heading title={`All Tasks (${2})`} description='All your Tasks' />
                    <Button onClick={() => router.push(`/createTask`)} >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Button>
                </div>
                <Separator />
            </div>
            <div className='flex-col '>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <TaskClient data={tempData} />
                </div>
            </div>
        </>
    )
}
