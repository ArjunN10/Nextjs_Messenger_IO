"use client"

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { 
    FieldValues,
     SubmitHandler,
     useForm
     } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";


const Form = () => {

    const {conversationId}=useConversation()

    const {
        register,
        handleSubmit,
        setValue,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
        message:'' 
        }
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setValue('message','',{shouldValidate:true});   //clear the message input onSubmit
        axios.post('/api/messages',{
            ...data,
            conversationId
        })
    }

    //cloudinary

    const handleUpload=(result:any)=>{
        axios.post('/api/messages',{
            image:result?.info?.secure_url,
            conversationId
        })
    }


    return (
        <div className="
        py-4
        px-4
        bg-white
        borde-t
        flex
        item-center
        gap-2
        lg:gap-4
        w-full
        ">
            
        {/* <div className="max-w-md mx-auto max-h-20 overflow-hidden"> */}
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="shdekvul"
        >
          <HiPhoto size={32} className="text-sky-500" />
        </CldUploadButton>
      {/* </div> */}

            <form onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 lp:gap-4 w-full">
                <MessageInput
                id="message"
                register={register}
                errors={errors}
                required
                placeholder="Write a message"
                />
                <button 
                type="submit"
                className="
                rounded-full
                p-2
                bg-sky-500
                cursor-pointer
                hover:bg-sky-600
                transition
                ">
                    <HiPaperAirplane
                    size={18}
                    className="text-white"/>
                </button>
            </form>
        </div>
    );
}

export default Form;