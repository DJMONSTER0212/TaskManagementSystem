import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params} : {params :{authorId : string}}
){
    try {
        console.log("hello")
        if(!params.authorId){
            return new NextResponse("authorId is Required",{status:400});
        }
        const tasks =  await prismadb.task.findMany({
            where:{
                authorId : params.authorId
            }
        });
        return NextResponse.json(tasks);

    } catch (error) {
        console.log("[authorID_TASK_GET ERROR]",error)
        return new NextResponse("Internal Error",{status:500});
    }
}