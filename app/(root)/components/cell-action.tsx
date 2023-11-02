"use client";

import React, { useState } from "react";
import { TaskColumn } from "./columns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckSquareIcon, MoreHorizontal } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data: TaskColumn;

}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const onComplete = async () => {
        try {
            const taskId = data.id
            const newData = {
                title: data.title,
                authorId: data.authorId,
                date: data.Date,
                desc: data.desc,
                status: "Finished"
            }
            const options = {
                headers: { "content-type": "application/json" }
            }
            const result = await axios.patch(`/api/task/${taskId}`, newData, options)
            setLoading(true);
            // console.log(result)
            router.push("/completedTask");
            router.refresh();
            toast.success("Task completed")

        } catch (error) {
            toast.error("SomeThing went Wrong.");
        } finally {
            setLoading(false)
            setOpen(false);
        }
    }



    return (
        <>
            <ToastContainer />
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onComplete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Mark as Completed
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <CheckSquareIcon className="mr-2 h-4 w-4" />
                        Completed
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}