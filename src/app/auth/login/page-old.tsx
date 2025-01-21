"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { emp_id, emp_key } = e.target as HTMLFormElement;
    try {
      await signIn("credentials", {
        emp_id: emp_id.value,
        emp_key: emp_key.value,
        redirect: true,
        callbackUrl: `/`,
      });
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className='m-0 overflow-hidden  bg-gray-100 bg-gradient-to-br from-orange-400 via-orange-500  to-yellow-600'>
      <div className='relative'>
        <Image
          src='/images/background.svg'
          alt=''
          height={500}
          width={500}
          className='absolute z-0  m-0  w-screen'
        />
      </div>
      <div className='relative mx-auto flex h-screen items-center justify-center '>
        <div className='w-1/4 rounded-3xl bg-slate-50/25 p-2 shadow-xl outline outline-2 outline-white backdrop-blur-sm backdrop-filter'>
          <div className='top-1/8 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
            <Image
              src='/images/logo.svg'
              width={100}
              height={50}
              alt='Picture of the author'
              className='mx-auto'
            />
          </div>
          <div className='py-3 text-center'>
            <div className='mb-10'></div>
            <div className='p-5'>
              <h1 className='text-center text-2xl font-semibold'>Welcome!</h1>
              <h1 className='my-2 text-center'>
                Project Cost Monitoring System
              </h1>
            </div>

            <form onSubmit={handleSubmit} className='mx-5 my-5'>
              <div className='mb-4'>
                <input
                  placeholder='Employee ID'
                  type='text'
                  id='emp_id'
                  name='emp_id'
                  required
                  className='w-full rounded-full border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
                />
              </div>
              <div className='mb-4'>
                <input
                  placeholder='Employee Key'
                  type='password'
                  id='emp_key'
                  name='emp_key'
                  required
                  className='w-full rounded-full border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
                />
              </div>
              <button
                type='submit'
                className='w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                Log In
              </button>
            </form>
          </div>
          {/* <div className='relative h-64 w-64 overflow-hidden border border-black'>
            <div className='border-b-16 border-r-16 absolute left-0 top-0 h-0 w-0 border-l-0 border-t-0 border-solid border-black border-transparent'></div>
            <div className='p-4'>Content goes here</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// LoginPage.excludeLayout();

export default LoginPage;
