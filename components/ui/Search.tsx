import { Flex, TextField } from '@radix-ui/themes';
import React from 'react'
import { FaSearch } from 'react-icons/fa';

interface Props {
    search: string;
    setSearch: (search: string) => void
}

const Search = ({ search, setSearch }: Props) => {
  return (
    <Flex align={"center"} gap="3">
        <TextField.Root size="3">
            <TextField.Slot>
                <FaSearch />
            </TextField.Slot>
            <TextField.Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
        </TextField.Root>
    </Flex>
  )
}

export default Search