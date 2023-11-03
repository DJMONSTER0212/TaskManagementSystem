"use client";

import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

// import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation";
import Navbar from '@/components/Navbar';
// import { auth } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Heading } from '@/components/ui/Heading';
import { Plus } from 'lucide-react';
import { TaskClient } from './components/client';
import prismadb from '@/lib/prismadb';
import {  useState,useEffect } from 'react';
import { TaskColumn } from './components/columns';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const params = useParams();
  var tasks : TaskColumn[] = []

  const [flag,setFlag] = useState(true);
  const [tasks1,setTasks1] = useState(tasks)
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const getTasks = async()=>{
    try {
        console.log(userId)
        const temp = await axios.get(`/api/${userId}`)
          setFlag(false);


      tasks = temp.data;

      tasks = tasks.filter((element,index,tasks)=>{
        return (element.status==="Pending")
      })

      setTasks1(tasks)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    console.log("123")
    getTasks()
  },[])
  if (!isLoaded || !userId) {
    return null;
  }
  if(tasks1.length===0&& flag) {
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
          <Heading title={`Tasks (${tasks1.length})`}  description='all your pending tasks'/>
          <Button onClick={()=>router.push(`/createTask`)} >
          {/*  */}
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator />
      </div>
      <div className='flex-col '>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <TaskClient data={tasks1}  />
            </div>
        </div>
    </>
  )
}
