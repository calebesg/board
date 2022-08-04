import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { FormEvent, useState } from 'react'
import { getSession } from 'next-auth/react'
import { FiPlus } from 'react-icons/fi'

import { CardVip } from '../../components/CardVip'
import { SupportButton } from '../../components/SupportButton'
import { List, Task } from '../../components/Task'

import firebase from '../../services/firebaseConfig'

import styles from './styles.module.scss'

interface BoardProps {
  user: {
    id: string
    name: string
  }
}

export default function Board({ user }: BoardProps) {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      date: '17 Julho 2022',
      title:
        'Aprenda criar projetos usando Next JS e aplicando firebase como back.',
    },
    {
      id: '1',
      date: '17 Julho 2022',
      title:
        'Aprenda criar projetos usando Next JS e aplicando firebase como back.',
    },
  ])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (taskName === '') return

    firebase
      .firestore()
      .collection('tasks')
      .add({
        name: user.name,
        userId: user.id,
        task: taskName,
        created: new Date(),
      })
      .then(res => console.log('success'))
      .catch(err => console.error(err))
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="Digite sua tarefa..."
            />

            <button type="submit">
              <FiPlus />
            </button>
          </form>

          <List items={tasks} />
        </div>

        <CardVip />
      </main>

      <SupportButton />
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
        id: session?.id,
        name: session.user?.name,
      },
    },
  }
}
