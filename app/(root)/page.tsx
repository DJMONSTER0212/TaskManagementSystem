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

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  if (!isLoaded || !userId) {
    return null;
  }
  const router = useRouter();
  const params = useParams();
  return (
    <>
    {userId}
      <Navbar />
      <div className="flex min-h-screen flex-col  p-2">
        <div className='flex items-center justify-between mb-2'>
          <Heading title={`Tasks (${4})`}  description='all your pending tasks'/>
          <Button onClick={()=>router.push(`/createTask`)} >
          {/*  */}
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator />
      </div>
    </>
  )
}
