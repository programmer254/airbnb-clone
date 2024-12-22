"use client"

import axios from 'axios'
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
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import toast from 'react-hot-toast';
import { PrismaClient } from '@prisma/client'; // Initialize Prisma Client const prisma = new PrismaClient()

import bcrypt from "bcrypt";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
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
            name: '',
            email: '',
            password: ''
        }
    });

    // SAFELY PASS DATA BECAUSE WE KNOW DATA IS FIELD VALUES NAME, EMAIL AND PASSWORD
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            
            .catch((error) => {
                toast.error("Something Amiss")
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            Hello Modal Body!
            <Heading
                title="Welcome to Airbnb"
                subtitle='Create An Account!'
                 
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
                id="name"
                label='Name'
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
                onClick={() => {}}
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
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            // USING HANDLE SUBMIT TO WRAP SUBMIT FUNCTION
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}

        />
    );
}
export default RegisterModal