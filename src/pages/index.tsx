import Head from 'next/head'

import styles from '../styles/home.module.scss'

export default function Home() {
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
            <img
              src="https://avatars.githubusercontent.com/u/36782514?v=4"
              alt="Calebe"
            />
          </div>
        </div>
      </main>
    </>
  )
}
