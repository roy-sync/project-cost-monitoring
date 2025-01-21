"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.target as HTMLFormElement;
    try {
      await signIn("credentials", {
        email: email.value,
        password: password.value,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className='m-0 overflow-hidden  bg-gray-100 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 to-yellow-600'>
      <div className='relative'>
        <Image
          src='/images/background.svg'
          alt=''
          height={500}
          width={500}
          className='absolute z-0  m-0  w-screen'
        />
      </div>
      
    </div>
  );
};

// LoginPage.excludeLayout();

export default LoginPage;
