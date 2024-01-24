"use client"

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Modal from "../Modal"

interface SettingsModalProps{
    onClose:()=>void
    isOpen?:boolean
    currentUser:User
}
const SettingsModal:React.FC<SettingsModalProps> = ({
    onClose,
    isOpen,
    currentUser
}) => {
    const router=useRouter()
    const [isLoading,setIsLoading]=useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name:currentUser?.name,
            image:currentUser?.image
        }
    })

    const image=watch('image')

    const handleUpload=(result:any)=>{
        setValue('image',result?.info?.secure_url,{
            shouldValidate:true
        })
    }

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true)

        axios.post('/api/settings',data)
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch(()=>toast.error('Something went wrong!'))
        .finally(()=>setIsLoading(false))
    }
    return (
        <Modal 
        isOpen={isOpen}
        onClose={onClose}
        >
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                    h
                    </div>

                </div>
            </form>
        </Modal>
    );
}

export default SettingsModal;