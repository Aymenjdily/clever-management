"use client";

import Search from "@/components/ui/Search";
import { Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import UsersTable from "./Table";
import { User } from "@prisma/client";

interface Props {
    users: User[]
}

const UsersHeader = ({ users }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <Flex direction={"column"} gap="5">
      <Flex align={"center"} gap="3">
        <Search search={search} setSearch={setSearch} />
      </Flex>
      <UsersTable />
    </Flex>
  );
};

export default UsersHeader;
