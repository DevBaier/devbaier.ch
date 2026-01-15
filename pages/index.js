import { useState } from 'react'
import Head from 'next/head'
import FullScreenTerminal from '../components/Terminal/FullScreenTerminal'
import LoadingSequence from '../components/Terminal/LoadingSequence'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Head>
        <title>Daniel Baier | Full-stack Web Developer</title>
        <meta name="description" content="Interactive terminal portfolio of Daniel Baier - Full-stack Web Developer & Consultant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLoading && <LoadingSequence onComplete={() => setIsLoading(false)} />}
      {!isLoading && <FullScreenTerminal />}
    </>
  )
}
