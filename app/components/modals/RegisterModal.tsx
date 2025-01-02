'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
const RegisterModal = () => {
  const registerModal = useRegisterModal(); //Accessing the modal state and actions from the store.
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    axios
      .post("/api/auth/register", data)
      .then(() => {
        registerModal.onClose(); // Close the modal after successful registration
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default RegisterModal;

{
  /* The modal and user menu system utilizes centralized state 
  management with Zustand (useRegisterModal), 
  allowing the modal’s visibility to be controlled globally. 
  The UserMenu.tsx triggers the modal (RegisterModal.tsx), 
  which handles form submission and validation using react-hook-form.  */
}