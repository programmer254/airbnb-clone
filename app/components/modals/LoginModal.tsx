"use client"

import {signIn} from 'next-auth/react'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { useState } from 'react';
import Modal from './Modal';
// import Button from '../components/Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { toast }from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    // USE FORM (FORM CONTROLS)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // SAFELY PASS DATA BECAUSE WE KNOW DATA IS FIELD VALUES NAME, EMAIL AND PASSWORD
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        // USE NEXTAUTH TO SIGN IN
        // WE NEED NAME AND PASSWORD SINCE IN PAGES 
        // NEXT AUTH WE HAVE EMAIL AND PASSWORD FOR CRENDENTIALS
        signIn('credentials',{
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false)

            if(callback?.ok){
                toast.success("Logged In");
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            Hello Modal Body!
            <Heading
                title="Welcome Back"
                subtitle='Login to your Account'
                 
            />
            <Input
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            />
            
            <Input
                id="password"
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 nt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => { }}
            />

            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => { }}
            />

            <div className="text-mutual-500
            text-center
            mt-4
            font-light
            "
            >
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div 
                    onClick={registerModal.onClose}
                    className='text-neutral-800
                    cursor-pointer
                    hover:underline
                    '
                    >
                        Log in
                    </div>
                </div>
            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            // USING HANDLE SUBMIT TO WRAP SUBMIT FUNCTION
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}

        />
    );
}
export default LoginModal