"use client";

import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React from "react";
import { AdminLinks } from '../constants/index';
import Link from "next/link";
import classnames from 'classnames'
import { usePathname } from "next/navigation";

const SideBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname()

  return (
    <Flex p="6" px="9" direction={"column"} gap="9">
      <Flex direction={"column"} className="text-center">
        <h1 className="font-bold text-xl text-blueColor">
          Cl<span className="text-yellowColor">e</span>ver
        </h1>
        <p className="text-gray-500">Management</p>
      </Flex>
      <Flex direction={"column"} gap="5">
        {/* @ts-ignore */}
        { session?.user?.role === "admin" && ( 
            AdminLinks.map((link) => (
                <Link key={link.href} href={link.href} className={classnames({
                  "pl-4 pr-9 py-4 w-full rounded-2xl duration-200" : true,
                  "bg-black text-white font-medium" : pathname === link.href,
                  "text-gray-500" : pathname !== link.href
                })}>
                    <Flex align={"center"} gap="3" className=" capitalize">
                        <link.icon className={classnames({
                          "text-lg" : true,
                          "text-yellowColor" : pathname === link.href
                        })} />
                        <span className="text-sm">
                          {link.label}
                        </span>
                    </Flex>
                </Link>
            ))
        )}
      </Flex>
    </Flex>
  );
};

export default SideBar;
