'use client';

import Input from "@/app/components/Input";
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
type variant= 'Login' | 'Register'

const AuthForm=()=>{

const [variant,setvariant]=useState<variant>('Login');
const [isLoading,setisLoading]=useState(false);


const togglevariant=useCallback(()=>{
    if(variant === 'Login'){
        setvariant('Register')
    }else{

        setvariant('Login')
    }
},[variant])



const {
    register,
    handleSubmit,
    formState:{
        errors
    },
}=useForm<FieldValues>({
    defaultValues:{
        name:'',
        email:'',
        password:''
    }
})



const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setisLoading(true);

    if(variant === 'Register'){
        //Axios register
    }
    if(variant === 'Login'){
        //NextAuth signin
    }
}


const socialAction=(action:string)=>{
setisLoading(true);

//NextAuth social signin
}


return(
<>
<div className="
mt-8
sm:mx-auto
sm:w-full
sm:max-w-md
">
<div className="
bg-white
px-4
py-8
shadow-md
sm:rounded-lg
sm:px-10
">

<form 
className="space-y-6"
onSubmit={handleSubmit(onSubmit)}
>

<Input/>




</form>
</div>
</div>
</>
    )
}

export default AuthForm