import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { FormEvent, useState } from 'react'
import { getSession } from 'next-auth/react'
import { format } from 'date-fns'
import { FiPlus, FiX } from 'react-icons/fi'

import { CardVip } from '../../components/CardVip'
import { SupportButton } from '../../components/SupportButton'
import { List, Task } from '../../components/Task'

import firebase from '../../services/firebaseConfig'

import styles from './styles.module.scss'

interface BoardProps {
  user: {
    id: string
    name: string
    vip: boolean
    lastDonate: string | Date
  }
  tasks: string
}

export default function Board({ user, tasks }: BoardProps) {
  const [taskName, setTaskName] = useState('')
  const [taskList, setTaskList] = useState<Task[]>(JSON.parse(tasks))

  const [taskEdited, setTaskEdited] = useState<Task | null>(null)

  async function save() {
    const data = {
      username: user.name,
      userId: user.id,
      task: taskName,
      created: new Date(),
    }

    const doc = await firebase.firestore().collection('tasks').add(data)

    const task: Task = {
      ...data,
      id: doc.id,
      createdFormatted: format(data.created, 'dd MMM yyyy'),
    }

    setTaskList([...taskList, task])
    setTaskName('')
  }

  async function update() {
    try {
      await firebase
        .firestore()
        .collection('tasks')
        .doc(taskEdited?.id)
        .update({ task: taskName })

      const updatedTaskList = taskList.map(item => {
        if (item.id === taskEdited?.id) {
          return {
            ...item,
            task: taskName,
          }
        }

        return item
      })

      setTaskList(updatedTaskList)
      setTaskEdited(null)
      setTaskName('')
    } catch (err) {
      console.error(err)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (taskName === '') return

    return taskEdited ? update() : save()
  }

  async function handleDeleteTask(id: string) {
    try {
      await firebase.firestore().collection('tasks').doc(id).delete()

      const updatedTaskList = taskList.filter(item => item.id !== id)

      setTaskList(updatedTaskList)
    } catch (err) {
      console.error(err)
    }
  }

  function handleChangeFormMode(task: Task | null = null) {
    setTaskEdited(task)
    setTaskName(task ? task?.task : '')
  }

  async function handleEditTask(task: Task) {
    handleChangeFormMode(task)
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          {taskEdited && (
            <div className={styles.message}>
              <button onClick={() => handleChangeFormMode()}>
                <FiX />
              </button>
              <span>Voc?? est?? editando uma tarefa</span>
            </div>
          )}
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

          <List
            items={taskList}
            vip={user.vip}
            onDeleteItem={handleDeleteTask}
            onChangeItem={handleEditTask}
          />
        </div>

        {user.vip && <CardVip lastDonate={user.lastDonate} />}
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

  const collections = await firebase
    .firestore()
    .collection('tasks')
    .where('userId', '==', session?.id)
    .orderBy('created', 'asc')
    .get()

  const tasks = collections.docs.map(collection => {
    return {
      id: collection.id,
      createdFormatted: format(
        collection.data().created.toDate(),
        'dd MMM yyyy'
      ),
      ...collection.data(),
    }
  })

  return {
    props: {
      user: {
        id: session?.id,
        name: session.user?.name,
        vip: session?.vip,
        lastDonate: session?.lastDonate,
      },
      tasks: JSON.stringify(tasks),
    },
  }
}
