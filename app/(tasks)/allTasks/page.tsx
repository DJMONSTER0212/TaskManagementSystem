"use client";
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
import { useEffect, useState } from 'react';
import { TaskColumn } from './components/columns';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    if (!isLoaded || !userId) {
        return null;
    }
    const router = useRouter();
    const params = useParams();
    var tasks: TaskColumn[] = []
    const [flag, setFlag] = useState(true);
    const [tasks1, setTasks1] = useState(tasks)

    const getTasks = async () => {
        try {
            const temp = await axios.get(`/api/${userId}`)
            setFlag(false);
            tasks = temp.data;
            setTasks1(tasks)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTasks()
    }, [])

    if (tasks1.length === 0 && flag) {
        return <><div className="flex mt-20 justify-center items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-4">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[200px]" />
            </div>
        </div></>
    }
    return (
        <>

            <Navbar />
            <div className="flex  flex-col  p-2">
                <div className='flex items-center justify-between mb-2'>
                    <Heading title={`All Tasks (${tasks1.length})`} description='All your Tasks' />
                    <Button onClick={() => router.push(`/createTask`)} >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Button>
                </div>
                <Separator />
            </div>
            <div className='flex-col '>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <TaskClient data={tasks1} />
                </div>
            </div>
        </>
    )
}
