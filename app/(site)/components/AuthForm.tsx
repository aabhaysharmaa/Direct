"use client";
import axios from "axios";
import CustomButton from "@/app/components/CustomButton";
import CustomInput from "@/app/components/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import AuthLoader from "@/app/components/AuthLoader";
import { useRouter } from "next/navigation";
type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const router = useRouter();
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [isProviderLoading, setIsProviderLoading] = useState(false);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users")
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("DATA", data)
    if (variant === "REGISTER") {
      axios.post("/api/register", data)
      .then(() => signIn("credentials" , data ))
        .catch(() => toast.error("Something Went Wrong"))
        .finally(() => setIsLoading(false));
    } if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false
      }).then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged In");
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  const socialAction = (action: string) => {
    setIsProviderLoading(true);
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid Credentials");
      }
      if (callback?.ok && !callback.error) {
        toast.success("Logged in")
      router.push("/users")

      }
    })
      .finally(() => {
        setIsProviderLoading(false);
      })
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && <CustomInput label="Name" disabled={isLoading} register={register} errors={errors} type="name" id="name" />}
          <CustomInput label="Email" register={register} errors={errors} type="email" id="email" disabled={isLoading} />
          <CustomInput disabled={isLoading} label="Password" register={register} errors={errors} type="password" id="password" />
          <div className="">
            <CustomButton disabled={isLoading} type="submit" >
              {isLoading ? <AuthLoader /> : <span>
                {variant === "LOGIN" ? "LOGIN" : "REGISTER"}
              </span>}
            </CustomButton>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center  text-sm">
              <span className="bg-white px-2 text-gray-500">
                or  continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex e gap-2 ">
            <div className="w-[50%]">
              {isProviderLoading ? <AuthLoader /> : (<AuthSocialButton className="hover:bg-[#73C2E6]" icon={isProviderLoading ? <AuthLoader classname="w-2 h-2" /> : BsGoogle} onClick={() => socialAction("google")} />)}

            </div>
            <div className="w-[50%]">
              <AuthSocialButton className="hover:bg-[#73C2E6]" icon={BsGithub} onClick={() => socialAction("github")} />
            </div>

          </div>
        </div >
        <div className="flex gap-2 justify-center text-sm mt-6 text-gray-500">
          <div className="cursor-normal">
            {variant === "LOGIN" ? "New to Direct?" : "Already have an account?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>  {variant === "LOGIN" ? "create an account" : "Login"}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm