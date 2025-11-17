import Image from "next/image";
import AuthForm from "./components/AuthForm";
const Home = () => {
  console.log(globalThis.prisma)
  return (
    <div className='flex min-h-full  bg-gray-100  justify-center flex-col py-12  sm:px-6 lg:px-8'>
      <div className="sm:mx-auto sm:w-full  sm:max-w-md">
        <Image src="/messenger.png" alt="Logo" height={48} width={48} className="mx-auto w-auto" />
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      {/* Auth Form */}
      <AuthForm></AuthForm >
    </div>
  )
}

export default Home;