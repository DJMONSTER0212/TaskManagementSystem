"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TaskColumn = {
    id: string
    title: string
    Date: Date
    desc : string
    status : string
    authorId : string
}

export const columns: ColumnDef<TaskColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "desc",
        header: "Description",
    },
    {
        accessorKey: "Date",
        header: "Date",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id:"actions",
        cell:({row})=> <CellAction data={row.original}/>
    }
]
