// "use client";
// import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
// import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import * as Yup from "yup";
interface LoginFormValues {
  emp_id: string;
  emp_key: string;
}
const LoginPage = () => {
  // const router = useRouter();

  // const validationSchema = Yup.object().shape({
  //   emp_id: Yup.string().required("Employee ID is required"),
  //   emp_key: Yup.string().required("Employee Key is required"),
  // });

  // const handleFormSubmit = async (
  //   values: LoginFormValues,
  //   { setSubmitting }: FormikHelpers<LoginFormValues>
  // ) => {
  //   try {
  //     await signIn("credentials", {
  //       emp_id: values.emp_id,
  //       emp_key: values.emp_key,
  //       redirect: true,
  //       callbackUrl: "/",
  //     });
  //   } catch (error) {
  //     console.log("Login error:", error);
  //   }
  //   setSubmitting(false);
  // };

  const handleBitrixSignIn = () => {
    // const clientId = "local.674e7e4d5f4a02.57385705"; // Use your actual client ID
    // const redirectUri = encodeURIComponent('https://project-cost-monitoring.vercel.app/bitrix/callback');
    // const portalDomain = 'syntactics.bitrix24.com';
    // const bitrixAuthUrl = `https://oauth.bitrix.info/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&domain=${portalDomain}`;
    // router.push(bitrixAuthUrl);
  };
  

  // console.log("TCL: LoginPage -> error", error);

  return (
    <div className='m-0 overflow-hidden  bg-gray-100 bg-gradient-to-br from-orange-400 via-orange-500  to-yellow-600'>
      <div className='relative'>
        {/* <Image
          src='/images/background.svg'
          alt=''
          height={500}
          width={500}
          className='absolute z-0  m-0  w-screen'
        /> */}
      </div>
      <div className='relative mx-auto flex h-screen items-center justify-center '>
        <div className='px-5 w-1/4 rounded-3xl bg-slate-50/25 p-2 shadow-xl outline outline-2 outline-white backdrop-blur-sm backdrop-filter'>
          <div className='top-1/8 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
            {/* <Image
              src='/images/logo.svg'
              width={100}
              height={50}
              alt='Picture of the author'
              className='mx-auto'
            /> */}
          </div>
          <div className='py-3 text-center'>
            <div className='mb-10'></div>
            <div className='p-5'>
              <h1 className='text-center text-2xl font-semibold'>Welcome!</h1>
              <h1 className='my-2 text-center'>
                Project Cost Monitoring System
              </h1>
            </div>
            {/* <Formik
              initialValues={{ emp_id: "", emp_key: "" }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              <Form className='my-5'>
                <div className='mb-4'>
                  <Field
                    placeholder='Employee ID'
                    type='text'
                    id='emp_id'
                    name='emp_id'
                    autoComplete='off'
                    className='w-full rounded-full border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
                  />
                  <ErrorMessage
                    name='emp_id'
                    component='div'
                    className='text-red-500'
                  />
                </div>
                <div className='mb-4'>
                  <Field
                    placeholder='Employee Key'
                    type='password'
                    id='emp_key'
                    name='emp_key'
                    autoComplete='new-password'
                    className='w-full rounded-full border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
                  />
                  <ErrorMessage
                    name='emp_key'
                    component='div'
                    className='text-red-500'
                  />
                </div>
                <div className="flex flex-col space-y-5">
                  <button
                    type='submit'
                    className='w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                  >
                    Log In
                  </button>
                  
                </div>
              </Form>
              
            </Formik> */}
            <button
                className='flex flex-row justify-center items-center space-x-5 w-full rounded-full py-2 border font-semibold'
                onClick={()=>handleBitrixSignIn()}
              >
                {/* <img src="/images/bitrix-logo.svg" alt="" /> */}
                <p>Log In With Bitrix</p>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
