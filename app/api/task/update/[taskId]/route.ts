import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    {params} : {params :{taskId : string}}
){

    try {
        const body = await req.json();
        const {authorId,title,desc,date,status} = body;
        if(!authorId||!title||!desc||!date||!status){
            return new NextResponse("All fields Required",{status:400})
        }
        const newdate = new Date(date);
        const task = await prismadb.task.update({
            where:{
                id : params.taskId
            },
            data:{
                authorId,
                title,
                desc,
                Date: newdate,
                status
            }
        })
        return NextResponse.json(task)
    } catch (error) {

    }
}