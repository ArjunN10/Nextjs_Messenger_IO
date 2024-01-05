import Image from 'next/image'
import AuthForm from './componenets/AuthForm'

export default function Home() {
  return (
     <div 
     className='
     flex 
     min-h-full 
     flex-col
     justify-center
     py-12
     sm:px-6
     lg:px-8
     bg-gray-100    '>

        <div>
            <Image
            alt='Logo'
            height="48"
            width="48"
            className='mx-auto w-auto'
            src="/images/logo.png"
            />
            <h2 
            className='
            text-center
            mt-5
            text-2xl
            font-bold
            tracking-tight
            text-gray-900
            '>
            Sign into Your Account!
            </h2>
        </div>
        <AuthForm/>
     </div>
  )
}
