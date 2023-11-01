import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {

    try {
        // const { userId } = auth();
        // const { userId } = getAuth();
        // console.log(auth())
        const body = await req.json();
        // const user = await currentUser()
        // console.log(user)

        const { title, desc, date, authorId } = body;
        if (!authorId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!title || !desc || !date) {
            console.log("hello");
            return new NextResponse("All Fields are Required", { status: 400 });
        }
        // console.log(date)

        const newdate = new Date(date);
        // console.log(newdate)
        const task = await prismadb.task.create({
            data: {
                title,
                desc,
                Date: newdate,
                authorId
            }
        });

        return NextResponse.json(task);

    } catch (error) {
        console.log('[TASK_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// import { NextResponse } from 'next/server';
// import { currentUser, auth } from "@clerk/nextjs";

export async function GET() {

    // Get the userId from auth() -- if null, the user is not logged in
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await currentUser();

    // Perform your Route Handler's logic with the returned user object

    return NextResponse.json({ "user": user }, { status: 200 })
}