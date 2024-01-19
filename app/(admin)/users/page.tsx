import { Button } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import UsersTable from "./components/Table";
import prisma from "@/prisma/client";
import UsersHeader from "./components/UsersHeader";

const UsersPage = async () => {
  const users = await prisma.user.count();
  const allUsers = await prisma.user.findMany()

  return (
    <Flex direction={"column"} gap="6">
      <Flex align={"center"} justify={"between"}>
        <h1 className="text-md font-bold">List of Users ({users})</h1>
        <Link href="/users/new">
          <Button className=" capitalize">new user</Button>
        </Link>
      </Flex>
      <UsersHeader users={allUsers!} />
    </Flex>
  );
};

export default UsersPage;
