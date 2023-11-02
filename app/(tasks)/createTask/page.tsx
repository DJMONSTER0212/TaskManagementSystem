"use client";
import Navbar from '@/components/Navbar'

import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Heading } from '@/components/ui/Heading'
// import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    desc: z.string().min(4, {
        message: "Description must contain at least 4 characters"
    }),
    date: z.string()
})

const Create = () => {
    const router = useRouter();
    const params = useParams();
    const [loading,setLoading] = useState(false)
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    if (!isLoaded || !userId) {
        return null;
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            desc: "",
            date: "",
        },
    })

    const onSubmit =async (values: z.infer<typeof formSchema>)=> {
        try {
            setLoading(true)
            const options = {
                headers: {"content-type": "application/json"}
            }
            const data ={
                title : values.title,
                date : values.date,
                authorId : userId,
                desc : values.desc
            }

            const result = await axios.post('/api/task/add',data,options)
            if(result){
                router.refresh();
                router.push("/");
                toast.success("Task Created")
            }
        } catch (error) {
            toast.error("Something Went Wrong")
        }finally{
            setLoading(false);
        }
        console.log(values)
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-col  p-2">
                <div className='flex items-center justify-between p-2  mb-2'>
                    <Heading title={`Create Task`} description='create a new Task' />
                </div>
                <Separator />
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className='grid p-2 xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-8'>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Give A title for your Task
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} type='datetime-local' placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Give due date to your task
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className='p-2 '>
                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} className='lg:w-1/2 h-fit ' placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Describe Your Task
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex p-2 '>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>

        </>
    )
}

export default Create
