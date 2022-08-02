import Head from 'next/head'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'

import styles from './styles.module.scss'

export default function Board() {
  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>

      <main className={styles.container}>
        <form>
          <input type="text" placeholder="Digite sua tarefa..." />

          <button type="submit">
            <FiPlus />
          </button>
        </form>

        <div>
          <span className={styles.amount}>Voçê tem 2 tarefas</span>

          <article className={styles.taskItem}>
            <strong>
              Aprenda criar projetos usando Next JS e aplicando firebase como
              back.
            </strong>

            <div className={styles.wrapper}>
              <div className={styles.left}>
                <div className={styles.date}>
                  <FiCalendar />
                  <time>17 Julho 2022</time>
                </div>

                <button>
                  <FiEdit2 />
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
