
import Head from 'next/head'
import { 
  Container,
  Image,
  Heading
} from '@chakra-ui/react'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <Container maxW='container.xl'>
      <Head>
        <title>Daniel Baier | Full-stack Web Developer & Consulting</title>
      </Head>
      <section id="avatar" className={styles.container}>
        <Image src='https://res.cloudinary.com/danib/image/upload/v1604996111/Baier/avatar-summer.svg' alt='Avatar' />
      </section>
      <section id="about" className={styles.about}>
        <Heading>Hi 🖖🏻, I&apos;m Daniel Baier</Heading>
      </section>
    </Container>
  )
}
