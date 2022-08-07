import Head from 'next/head'
import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FiCalendar } from 'react-icons/fi'

import { Task } from '../../../components/Task'
import firebase from '../../../services/firebaseConfig'

import styles from './styles.module.scss'

interface DetailProps {
  data: string
}

export default function Detail({ data }: DetailProps) {
  const task = JSON.parse(data) as Task

  return (
    <>
      <Head>
        <title>Task detail</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.card}>
          <header>
            <FiCalendar />
            <span>
              Tarefa criada: <time>{task.createdFormatted}</time>
            </span>
          </header>
          <p>{task.task}</p>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req })
  const id = params?.id as string

  if (!session?.vip) {
    return {
      redirect: {
        destination: '/board',
        permanent: false,
      },
    }
  }

  const snapshot = await firebase.firestore().collection('tasks').doc(id).get()
  const task = {
    created: snapshot.data()?.created,
    id: snapshot.id,
    task: snapshot.data()?.task,
    createdFormatted: format(snapshot.data()?.created.toDate(), 'dd MMM yyyy'),
    userId: snapshot.data()?.userId,
    username: snapshot.data()?.username,
  }

  return {
    props: {
      data: JSON.stringify(task),
    },
  }
}
