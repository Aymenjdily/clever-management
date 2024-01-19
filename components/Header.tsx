"use client"

import { Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react';
import React from 'react'
import { MdOutlineNotifications } from "react-icons/md";
import Image from 'next/image';

const Header = () => {
    const { data:session } = useSession()
  return (
    <Flex p="5" align={"center"} justify={"between"}>
        <h1 className='text-xl font-bold'>
            Welcome back,
        </h1>
        <Flex align={"center"} gap="6">
            <MdOutlineNotifications className='text-xl' />
            <Flex align={"center"} gap="4">
                <Flex direction={"column"} className='text-right'>
                    <h1 className='font-semibold text-sm'>
                        {session?.user?.name}
                    </h1>
                    <p className='text-sm text-gray-600 capitalize'>
                        {/* @ts-ignore */}
                        {session?.user?.role}
                    </p>
                </Flex>
                <Flex className='relative w-10 h-10 rounded-full'>
                    <Image src={session?.user?.image || "/user.png"} alt={session?.user?.name!} fill quality={100} className='rounded-full object-cover' />
                </Flex>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default Header