import { Box, Flex, Grid } from '@radix-ui/themes'
import Image from 'next/image'
import LoginForm from './components/LoginForm'

export default function Home() {
  return (
    <Flex className='min-h-screen bg-gradient-to-r from-yellowColor/60 to-yellowColor' align={"center"} justify={"center"} p="6">
      <Flex className='shadow-xl rounded-2xl'>
        <Box className='relative w-96 h-100 lg:flex hidden'>
          <Image src="/login.jpg" alt="art-image" quality={100} fill className='object-cover rounded-l-2xl' />
        </Box>
        <LoginForm />
      </Flex>
    </Flex>
  )
}
