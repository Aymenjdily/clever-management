"use client";

import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React from "react";
import { AdminLinks } from '../constants/index';
import Link from "next/link";

const SideBar = () => {
  const { data: session } = useSession();

  return (
    <Flex p="6" px="9" direction={"column"} gap="9">
      <Flex direction={"column"} className="text-center">
        <h1 className="font-bold text-xl text-blueColor">
          Cl<span className="text-yellowColor">e</span>ver
        </h1>
        <p className="text-gray-500">Management</p>
      </Flex>
      <Flex direction={"column"} gap="4">
        {/* @ts-ignore */}
        { session?.user?.role === "admin" && ( 
            AdminLinks.map((link) => (
                <Link key={link.href} href={link.href} >
                    <Flex align={"center"} gap="5">
                        <link.icon />
                        {link.label}
                    </Flex>
                </Link>
            ))
        )}
      </Flex>
    </Flex>
  );
};

export default SideBar;
