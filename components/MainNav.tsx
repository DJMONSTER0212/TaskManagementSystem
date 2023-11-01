"use client";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

export function MainNav({
    className,
    ...props
}:React.HTMLAttributes<HTMLElement>){

    const pathName = usePathname();
    const params = useParams();
    const routes=[
        {
            href:`/`,
            label :"Home",
            active: pathName ===`/`
        },
        {
            href:`/allTasks`,
            label :"All Tasks",
            active: pathName ===`/allTasks`
        },
        
    ];
    return (  //by cn u can merge multiple classnames
        <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)} >
            {routes.map((route)=>(
                <Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary",route.active?"text-black dark:text-white":"text-muted-foreground")}>{route.label}</Link>
            ))}
        </nav>
    )
}