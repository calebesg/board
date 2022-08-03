import Head from 'next/head'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { CardVip } from '../../components/CardVip'
import { SupportButton } from '../../components/SupportButton'
import { List, Task } from '../../components/Task'

import styles from './styles.module.scss'

export default function Board() {
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

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <form>
            <input type="text" placeholder="Digite sua tarefa..." />

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
