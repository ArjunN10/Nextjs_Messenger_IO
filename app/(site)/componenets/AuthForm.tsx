'use client';

import Button from "@/app/components/Button";
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
{variant === 'Register' && (
<Input 
id="name" 
label="name" 
register={register}
errors={errors}
/>
)}
<Input 
id="emal" 
label="Email Address"
type="email" 
register={register}
errors={errors}
/><Input 
id="password" 
label="Password" 
type="password"
register={register}
errors={errors}
/>
<Button 
disabled={isLoading}
fullWidth
type="submit"
>
    {variant === 'Login'? 'Sign in':'Register'}
</Button>
</form>
<div className="mt-6">
<div className="relative">
<div
className="
absolute
inset-0
flex
item-center"
>
<div className="
w-full 
border-t
border-gray-300"
>
<div className="
relative
flex
justify-center
text-sm"
>
<span className="
bg-white
px-2
text-gray-500"
>
Or continue with
</span>
</div>
</div>
</div>

</div>
</div>
</div>
</div>
</>
    )
}

export default AuthForm