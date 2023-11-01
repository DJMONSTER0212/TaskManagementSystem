"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TaskColumn, columns } from "./columns";
import { Label } from "@/components/ui/label"
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"


interface TaskClientProps {
    data: TaskColumn[]
}

export const TaskClient: React.FC<TaskClientProps> = ({
    data
}) => {
    const router = useRouter();
    const f1 = () => {
        if (notcompleted) {
            setNotcompleted(!notcompleted)
        }
        setcompleted(!completed)
    }
    const f2 = () => {
        if (completed) {
            setcompleted(!completed)
        }
        setNotcompleted(!notcompleted)
    }

    const [completed, setcompleted] = useState(false)
    const [notcompleted, setNotcompleted] = useState(false)
    const getData = async () => {

        if (completed) {
            let temp = data.filter((task) => { return task.status === "Completed" })
            data = temp;
            console.log(data)
        }
        else if (notcompleted) {
            let temp = data.filter((task) => { return task.status === "Not Completed" })
            // console.log(temp)
            data = temp;
            console.log(data)
        }
    }
    useEffect(() => {
        // console.log(completed)
        // console.log(notcompleted)
        getData()
    }, [completed, notcompleted])
    const params = useParams();

    return (
        <>

            <p className="text-sm">Type Finished for looking all completed Tasks</p>
            <Separator/>
            <p className="text-sm">Type Pending for looking all not completed Tasks</p>
            <DataTable searchKey="status" columns={columns} data={data} />

            <Separator />

        </>
    )
}