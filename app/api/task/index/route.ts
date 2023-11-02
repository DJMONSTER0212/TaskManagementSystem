import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
async function getCookieData() {
    const cookieData = cookies().getAll()
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(cookieData)
        }, 1000)
    )
}

export async function GET(
    req: Request,

) {
    // const cookieData = cookies().getAll()
    const cookieData = await getCookieData()
    try {
        // const body = req.json()
        const { searchParams } = new URL(req.url);
        const param = searchParams.get("authorId");

        if (!param) {
            return new NextResponse("authorId is Required", { status: 400 });
        }
        const tasks = await prismadb.task.findMany({
            where: {
                authorId: param
            }
        });
        return NextResponse.json(tasks);

    } catch (error) {
        console.log("[TASK_GET ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}