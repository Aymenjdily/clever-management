"use client";

import { LoginSchema } from "@/app/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginForm = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  return (
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
            />
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
            />
          </Flex>
          <Button className="bg-yellowColor text-blueColor hover:bg-blueColor hover:text-yellowColor duration-200 font-medium">
            Log In
          </Button>
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
  );
};

export default LoginForm;
