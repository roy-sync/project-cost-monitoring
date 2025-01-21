import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <h1 className='mb-4 text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='mb-8 text-lg'>
        Oops! The page you are looking for does not exist.
      </p>
      {/* <img
        src='/images/404-error.svg' // Replace with your own image source
        alt='404 Error'
        className='mb-8 h-auto w-64'
      /> */}
      <Link
        href='/'
        className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
      >
        Go back to Home
      </Link>
    </div>
  );
}
