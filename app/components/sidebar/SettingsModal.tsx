"use client"

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Modal from "../Modal"
import Input from "../Input"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import Button from "../Button"

import { FaCamera } from "react-icons/fa";

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
          <div className="border-b flex justify-center items-center flex-col border-gray-900/10 pb-12">
           <h2 
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
                m-2
              "
            >
              Profile
            </h2>
            <div className="h-40 w-40  rounded-full bg-black m-4">
            <div className="mt-0 mb-1 flex items-center gap-x-3 h-40 w-40 justify-center">
                  <Image
                    width="200"
                    height="200" 
                    className="rounded-full" 
                    src={image || currentUser?.image || '/images/holder.png'}
                    alt="Avatar"
                  />
                </div>
                  <CldUploadButton 
                    options={{ maxFiles: 1 }} 
                    onUpload={handleUpload} 
                    uploadPreset="shdekvul"
                    className="ms-2"
                  >
                    <Button
                      disabled={isLoading}
                      secondary
                      type="button"
                    >
                    {/* <FaCamera size={30}/> */}
                    Change
                    </Button>
                  </CldUploadButton>
            </div>
            <p className="mt-8 text-sm leading-6 text-gray-600 ">
              Edit your public information.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name" 
                id="name" 
                errors={errors} 
                required 
                register={register}
              />
              <div>
              <dl className="space-y-8
                  px-4
                   sm:space-y-6
                    sm:px-6
                   ">
                {/* <label 
                  htmlFor="photo" 
                  className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                  "
                >
                  About
                </label> */}
                <label 
                  htmlFor="photo" 
                  className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                  "
                >
                    Email 
                     </label>
                     <dd className="
                        mt-1
                        text-sm
                       text-gray-900
                        sm:c">
                        {currentUser?.email}
                    </dd>
                
                {/* <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48" 
                    className="rounded-full" 
                    src={image || currentUser?.image || '/images/holder.png'}
                    alt="Avatar"
                  />
                  <CldUploadButton 
                    options={{ maxFiles: 1 }} 
                    onUpload={handleUpload} 
                    uploadPreset="pgc9ehd5"
                  >
                    <Button
                      disabled={isLoading}
                      secondary
                      type="button"
                    >
                      Change
                    </Button>
                  </CldUploadButton>
                </div> */}

              </dl>
              </div>
            </div>

          </div>
        </div>
        <div 
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          "
        >
          <Button 
            disabled={isLoading}
            secondary 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            disabled={isLoading}
            type="submit"
          >
            Save
          </Button>
        </div>
            </form>
        </Modal>
    );
}

export default SettingsModal;