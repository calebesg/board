import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'

import firebase from '../../services/firebaseConfig'

import styles from './styles.module.scss'

interface DonateProps {
  user: {
    name: string
    image: string
    id: string
  }
}

export default function Donate({ user }: DonateProps) {
  const [approved, setApproved] = useState(false)

  async function handleSaveDonate() {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: user.image,
      })
      .then(() => setApproved(true))
  }

  const Congratulate = () => (
    <div className={styles.congratulation}>
      <img src={user.image} alt={user.name} />
      <span>Parabéns, agora você é um membro apoiador!</span>
    </div>
  )

  return (
    <>
      <Head>
        <title>Ajude a plataforma board ficar online</title>
      </Head>

      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Seja apoiador" />

        {approved && <Congratulate />}

        <h1>Seja um apoiador desse projeto 🏆</h1>

        <p>
          Contribua com apenas <span>R$ 1,00</span>
        </p>

        <strong>Apareça na nossa home tenha funcionalidades exclusivas!</strong>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1',
                  },
                },
              ],
            })
          }}
          onApprove={(data, actions) => {
            return actions.order?.capture().then(function (detail) {
              console.log('Compra aprovada: ' + detail.payer.name?.given_name)
              handleSaveDonate()
            }) as Promise<void>
          }}
        />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: {
        name: session.user?.name,
        image: session.user?.image,
        id: session?.id,
      },
    },
  }
}
