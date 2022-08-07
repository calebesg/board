import { GetStaticProps } from 'next'
import Head from 'next/head'

import firebase from '../services/firebaseConfig'

import styles from '../styles/home.module.scss'

type Donate = {
  id: string
  image: string
  donate: boolean
  lastDonate: string
}

interface HomeProps {
  data: string
}

export default function Home({ data }: HomeProps) {
  const donaters = JSON.parse(data) as Donate[]

  return (
    <>
      <Head>
        <title>Board - Organize seu dia</title>
      </Head>

      <main className={styles.content}>
        <img src="/images/board-user.svg" alt="Ferramenta board" />

        <section className={styles.banner}>
          <h1>
            Uma ferramenta para seu dia a dia, Escreva, planeje e organize-se...
          </h1>

          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>

        <div className={styles.donates}>
          <span>Apoiadores</span>

          <div className={styles.listDonates}>
            {donaters.map((donate, index) => (
              <img key={index} src={donate.image} alt={donate.lastDonate} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const donates = await firebase.firestore().collection('users').get()

  const data = JSON.stringify(
    donates.docs.map(donate => ({ id: donate.id, ...donate.data() }))
  )

  return {
    props: {
      data,
    },
    revalidate: 60 * 60, // 1h
  }
}
