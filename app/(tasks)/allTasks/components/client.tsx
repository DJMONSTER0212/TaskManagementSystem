"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
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
    const params = useParams();




    return (
        <>

            <p className="text-sm">Type Finished for looking all completed Tasks</p>
            <Separator />
            <p className="text-sm">Type Pending for looking all not completed Tasks</p>
            <DataTable searchKey="status" columns={columns} data={data} />

            <Separator />

        </>
    )
}