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
// import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Navbar from '@/components/Navbar';
// import { auth } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Heading } from '@/components/ui/Heading';

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  if (!isLoaded || !userId) {
    return null;
  }
  return (
    <>
    {userId}
      <Navbar />
      <div className="flex min-h-screen flex-col  p-2">
      <Heading title="Tasks"  description='all your pending tasks'/>
      </div>
    </>
  )
}
