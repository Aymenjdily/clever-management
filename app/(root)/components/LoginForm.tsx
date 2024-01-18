"use client";

import { LoginSchema } from "@/app/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type LoginForm = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = handleSubmit(async (data) => {
    try {
      setIsLogin(true);
      await signIn("credentials", {
        ...data,
        redirect: false,
      });
      setSuccess(true);
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Something wrong, try again");
      setIsLogin(false);
    }
  });

  return (
    <form onSubmit={handleLogin}>
      <Flex
        className="bg-white rounded-r-2xl "
        direction={"column"}
        justify={"between"}
        p={{ md: "9", initial: "6" }}
        gap="9"
      >
        <Flex direction={"column"} gap="5">
          <Flex direction={"column"} className="text-center">
            <h1 className="font-bold text-xl text-blueColor">
              Cl<span className="text-yellowColor">e</span>ver
            </h1>
            <p className="text-gray-500">Management</p>
          </Flex>
          <h1 className="text-xl font-semibold text-center text-blueColor">
            Login with your Account
          </h1>
          <Flex direction={"column"} gap="5">
            <Flex direction={"column"} gap="1">
              <label htmlFor="email" className="text-sm text-gray-500">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                id="email"
                className="bg-gray-200 outline-none md:w-[300px]"
                {...register("email")}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </Flex>
            <Flex direction={"column"} gap="1">
              <label htmlFor="password" className="text-sm text-gray-500">
                Password
              </label>
              <Input
                placeholder="Enter your password"
                type="password"
                id="password"
                className="bg-gray-200 outline-none md:w-[300px]"
                {...register("password")}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </Flex>
            <Button
              type="submit"
              disabled={isLogin}
              className="bg-yellowColor text-blueColor hover:bg-blueColor hover:text-yellowColor duration-200 font-medium flex items-center gap-3"
            >
              Log In{" "}
              {isLogin && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
            {success && <Text color="green">Login Successfully !</Text>}
          </Flex>
          <p className="text-gray-500 text-sm">
            Don't you have an Account ?{" "}
            <Link
              href="/Signup"
              className="underline underline-offset-8 text-yellowColor font-medium"
            >
              Sign up
            </Link>
          </p>
        </Flex>
        <p className="text-sm text-gray-500 text-center">
          &copy; 2024 All rights Reserved, Clever & Aymen Js
        </p>
      </Flex>
    </form>
  );
};

export default LoginForm;
