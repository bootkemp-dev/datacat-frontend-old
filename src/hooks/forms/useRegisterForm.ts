import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormFields } from '../../interfaces/forms';
import { registerSchema } from '../../schemas/auth';

const useRegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterFormFields>({
    resolver: yupResolver(registerSchema)
  });

  const [registerData, setRegisterData] = useState<RegisterFormFields>({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setRegisterData(prevRegisterData => ({
      ...prevRegisterData,
      [id]: value
    }));
  };

  return {
    handleChange,
    register,
    handleSubmit,
    registerData
  };
};

export default useRegisterForm;
