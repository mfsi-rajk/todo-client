import Button from '../components/Button';
import Input from '../components/inputs/input';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosConfig from '../config/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [varient, setVarient] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleVarient = useCallback(() => {
    if (varient === 'LOGIN') {
      setVarient('REGISTER');
    } else {
      setVarient('LOGIN');
    }
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);

    if (varient === 'REGISTER') {
        axiosConfig
        .post('users/register', data)
        .then((res) => res.status === 200 && navigate('/mytodos'))
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.error || 'Something went wrong');
            setIsLoading(false);
          }
        });
    }

    if (varient === 'LOGIN') {
      axiosConfig
        .post('users/authenticate', data)
        .then((res) => res.status === 200 && navigate('/mytodos'))
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.error || 'Something went wrong');
            setIsLoading(false);
          }
        });
    }
  };

  return (
    <div className='flex h-screen min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          {varient === 'LOGIN' ? 'Sign in to your account' : 'Create an Account'}
        </h2>
      </div>
      <div className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <Input
              id='email'
              label='Email Address'
              type='email'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              id='password'
              label='Password'
              type='password'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <div>
              <Button disabled={isLoading} fullWidth type='submit'>
                {varient === 'LOGIN' ? 'Sign In' : 'Register'}
              </Button>
            </div>
          </form>
          <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
            <div>{varient === 'LOGIN' ? 'New to Application?' : 'Already have an account?'}</div>
            <div onClick={toggleVarient} className='underline cursor-pointer'>
              {varient === 'LOGIN' ? 'Create an Account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
