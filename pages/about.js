import Head from 'next/head'
import { 
  Container,
  Stack,
  Flex,
  Image,
  Heading,
  Text,
  HStack,
  Tag
} from '@chakra-ui/react'
import styles from '../styles/About.module.scss'

export default function About() {
  return (
    <Container maxW='container.md'>
        <Head>
            <title>Daniel Baier | Full-stack Web Developer & Consulting - About</title>
        </Head>
        <main id="avatar" className={styles.container}>
            <Heading as="h2" mb={10}>
                Career
            </Heading>
            <Stack direction={'column'} spacing={5}>
                <Flex w={'100%'} p={4} direction={['column', 'row']} className={styles.item} >
                    <Flex w={['1oo%', '10%']}>
                        Logo
                    </Flex>
                    <Flex w={['1oo%', '70%']} direction={'column'}>
                        <Heading as="h3">
                            Streamline AG
                        </Heading>
                        <Text mt={3}>
                            Full-Stack Web Developer
                        </Text>
                        <HStack spacing={2} mt={3}>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            C#
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Umbraco
                            </Tag>
                        </HStack>
                    </Flex>
                    <Flex w={['1oo%', '20%']} mt={[3, 0]} justifyContent={['flex-start', 'flex-end']}>
                        2022 - Present
                    </Flex>
                </Flex>
                <Flex w={'100%'} p={4} direction={['column', 'row']} className={styles.item}>
                    <Flex w={['1oo%', '10%']}>
                        Logo
                    </Flex>
                    <Flex w={['1oo%', '70%']} direction={'column'}>
                        <Heading as="h3">
                            Alltitude SA
                        </Heading>
                        <Text mt={3}>
                            Full-Stack Web Developer
                        </Text>
                        <HStack spacing={2} mt={3}>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Laravel
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Vue.js
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            MySQL
                            </Tag>
                        </HStack>
                    </Flex>
                    <Flex w={['1oo%', '20%']} mt={[3, 0]} justifyContent={['flex-start', 'flex-end']}>
                        2021 - 2022
                    </Flex>
                </Flex>
                <Flex w={'100%'} p={4} direction={['column', 'row']} className={styles.item}>
                    <Flex w={['1oo%', '10%']}>
                        Logo
                    </Flex>
                    <Flex w={['1oo%', '70%']} direction={'column'}>
                        <Heading as="h3">
                            Digicom Academy AG
                        </Heading>
                        <Text mt={3}>
                            Full-Stack Web Developer
                        </Text>
                        <HStack spacing={2} mt={3}>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Laravel
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Vue.js
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            MySQL
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            AWS
                            </Tag>
                        </HStack>
                    </Flex>
                    <Flex w={['1oo%', '20%']} mt={[3, 0]} justifyContent={['flex-start', 'flex-end']}>
                        2018 - 2020
                    </Flex>
                </Flex>
            </Stack>
            <Heading as="h2" mt={10} mb={10}>
                Education
            </Heading>
            <Stack direction={'column'} spacing={5}>
                <Flex w={'100%'} p={4} direction={['column', 'row']} className={styles.item}>
                    <Flex w={['1oo%', '10%']}>
                            Logo
                    </Flex>
                    <Flex w={['1oo%', '70%']} direction={'column'}>
                        <Heading as="h3">
                            Ecoles des Arches
                        </Heading>
                        <Text mt={3}>
                            CFC Infromaticien
                        </Text>
                        <HStack spacing={2} mt={3}>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Support
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Web
                            </Tag>
                            <Tag size={'sm'} variant='solid' colorScheme='twitter'>
                            Network
                            </Tag>
                        </HStack>
                    </Flex>
                    <Flex w={['1oo%', '20%']} mt={[3, 0]} justifyContent={['flex-start', 'flex-end']}>
                        2018 - 2020
                    </Flex>
                </Flex>
            </Stack>
        </main>
    </Container>
  )
}