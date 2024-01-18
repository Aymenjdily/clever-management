"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserSchema } from "../../validations";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import axios from "axios";

type UserForm = z.infer<typeof UserSchema>;

interface CloudinaryResult {
  secure_url: string;
}

const SignupForm = () => {
  const [image, setImage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [passwordConf, setpasswordConf] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
  });

  const handleCreate = handleSubmit(async (data) => {
    const { password } = data;

    setIsCreating(true);

    if (passwordConf !== password) {
      setError("Password not matched");
      setIsCreating(false);
      return null;
    }

    try {
      const response = await axios.post("/api/auth/user", {
        ...data,
        image: image,
        role: "user",
      });

      if (response.status === 201) {
        setSuccess(true);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setIsCreating(false);
      setError("Something wrong, try again");
    }
  });

  return (
    <form onSubmit={handleCreate}>
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
            Create your free Account
          </h1>
          <Flex direction={"column"} gap="5">
            <Flex className="w-full" align={"center"} justify={"center"}>
              <Flex className="relative w-32 h-32 rounded-full">
                <Image
                  src={image || "/upload.png"}
                  alt="image"
                  fill
                  quality={100}
                  className="rounded-full shadow-sm object-cover border"
                />
              </Flex>
            </Flex>
            <CldUploadWidget
              uploadPreset="recruiters"
              onUpload={(Result, widget) => {
                if (Result.event !== "success") return;
                const url = Result.info as CloudinaryResult;
                setImage(url.secure_url);
              }}
            >
              {({ open }) => (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="bg-black text-white"
                >
                  Upload Image{" "}
                </Button>
              )}
            </CldUploadWidget>
            <Flex direction={"column"} gap="1">
              <label htmlFor="name" className="text-sm text-gray-500">
                Name
              </label>
              <Input
                type="text"
                placeholder="Enter your name"
                id="name"
                className="bg-gray-200 outline-none md:w-[300px]"
                {...register("name")}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </Flex>
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
            <Flex direction={"column"} gap="1">
              <label htmlFor="passwordConf" className="text-sm text-gray-500">
                Password Confirmation
              </label>
              <Input
                placeholder="Enter your password"
                type="password"
                id="passwordConf"
                className="bg-gray-200 outline-none md:w-[300px]"
                onChange={(e) => setpasswordConf(e.target.value)}
              />
            </Flex>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-yellowColor text-blueColor hover:bg-blueColor hover:text-yellowColor duration-200 font-medium flex items-center gap-3"
            >
              Sign Up{" "}
              {isCreating && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
            {success && <Text color="green">Sign up Successfully !</Text>}
          </Flex>
          <p className="text-gray-500 text-sm">
            Alreadt have an Account ?{" "}
            <Link
              href="/"
              className="underline underline-offset-8 text-yellowColor font-medium"
            >
              Log in
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

export default SignupForm;
