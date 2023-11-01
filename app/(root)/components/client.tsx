"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { TaskColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
// import { ApiList } from "@/components/ui/api-list";

interface TaskClientProps{
    data: TaskColumn[]
}

export const TaskClient: React.FC<TaskClientProps> = ({
    data
})=>{
    const router = useRouter();
    const params = useParams();

    return (
        <>
        <DataTable searchKey="title" columns={columns} data={data}/>
        {/* <Heading title="API" description="API calls for Billboards "/> */}
        <Separator />
        {/* <ApiList entityName="billboards" entityIdName="billboardId"/> */}
        </>
    )
}