"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {BsGithub, BsGoogle} from 'react-icons/bs' 

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import AuthSocialButton from "./AuthSocialButton";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";


type variant = "Login" | "Register";

const AuthForm = () => {
  const [variant, setvariant] = useState<variant>("Login");
  const [isLoading, setisLoading] = useState(false);

  const togglevariant = useCallback(() => {
    if (variant === "Login") {
      setvariant("Register");
    } else {
      setvariant("Login");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);

    if (variant === "Register") {
        axios.post('/api/register', data)
        .catch(()=>toast.error('Something went wrong!'))
        .finally(()=>setisLoading(false))
        }

    //user Credential log

    if (variant === "Login") {
      signIn('credentials',{
        ...data,
        redirect:false
      })
      .then((callback)=>{
        if(callback?.error){
            toast.error('Invalid user')
        }
        if(callback?.ok && !callback?.error){
            toast.success('Logged in!')
        }
      })
      .finally(()=>setisLoading(false))
    }
  };

  //Social Loigin


  const socialAction = (action: string) => {
    setisLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
            toast.error('Invalid user')
        }

        if(callback?.ok && !callback?.error){
            toast.success('Logged in!')
        }
      })
      .finally(() => setisLoading(false));
  } 

  return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md"
                >
        <div
            className="
                bg-white
                px-4
                py-8
                shadow-md
                sm:rounded-lg
                sm:px-10"
                >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "Register" && (
                    <Input
                    id="name"
                    label="Name"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    />
                    )}
                    <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    register={register}
                    errors={errors}
                    disabled={isLoading}

                    />
                    <Input
                    id="password"
                    label="Password"
                    type="password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}

                    />
    <Button disabled={isLoading} fullWidth type="submit">
        {variant === "Login" ? "Sign in" : "Register"}
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
                    <div
                    className="
                        w-full 
                        border-t
                        border-gray-300"
                    />
                </div>
                    <div
                        className="
                        relative
                        flex
                        justify-center
                        text-sm"
                    >
                    <span
                        className="
                        bg-white
                        px-2
                        text-gray-500"
                    >
                      Or continue with
                    </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
                <AuthSocialButton 
                icon={BsGithub}
                onClick={()=>socialAction('github')}
                />
                <AuthSocialButton 
                icon={BsGoogle}
                onClick={()=>socialAction('google')}/>
            </div>
          </div>
        <div className="
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-gray-500
        ">
            <div>
                {variant === 'Login'?'New to messenger?':'Already have an account?'}
            </div>
            <div
            onClick={togglevariant}
            className="Underline cursor-pointer"
            >
            {variant === 'Login'?<a  className="font-bold leading-6 text-black-600 hover:text-black-500">{'Create an account'}</a>:<a  className="font-bold leading-6 text-black-600 hover:text-black-500">{ 'Login'}</a>}
            </div>
        </div>

        </div>
      </div>
  
  );
};

export default AuthForm;
