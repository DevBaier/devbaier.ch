import Head from 'next/head'
import { 
  Container,
  Stack,
  Flex,
  Text,
  Heading
} from '@chakra-ui/react'
import styles from '../styles/Projects.module.scss'

export default function Projects() {
  return (
    <Container maxW='container.md'>
      <Head>
        <title>Daniel Baier | Full-stack Web Developer & Consulting - Projects</title>
      </Head>
      <main id="avatar" className={styles.container}>
        <Flex direction={'row'}>
            <Flex w={'50%'} direction={'column'}>
                <Flex p={5} direction={'column'} className={styles.item}>
                    <Text>
                        Project 1
                    </Text>
                    <Text>
                        Where
                    </Text>
                    <Text mb={'auto'}>
                        Date
                    </Text>
                    <Heading as="h2">
                        Website
                        Development
                        with Vue.js
                    </Heading>
                </Flex>
                <Flex p={5} direction={'column'} className={styles.item}>
                    <Text>
                        Project 1
                    </Text>
                    <Text>
                        Where
                    </Text>
                    <Text mb={'auto'}>
                        Date
                    </Text>
                    <Heading>
                        Website
                    </Heading>
                </Flex>
            </Flex>
            <Flex w={'50%'} direction={'column'} >
                <Flex p={5} mt={'100px'} direction={'column'} className={styles.item}>
                    <Text>
                        Project 2
                    </Text>
                    <Text>
                        Where
                    </Text>
                    <Text mb={'auto'}>
                        Date
                    </Text>
                    <Heading>
                        Website
                    </Heading>
                </Flex>
                
                <Flex p={5} direction={'column'} className={styles.item}>
                    <Text>
                        Project 2
                    </Text>
                    <Text>
                        Where
                    </Text>
                    <Text mb={'auto'}>
                        Date
                    </Text>
                    <Heading>
                        Website
                    </Heading>
                </Flex>
            </Flex>
        </Flex>         
      </main>
    </Container>
  )
}