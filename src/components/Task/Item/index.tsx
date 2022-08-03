import { FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi'
import { Task } from '../types'

import styles from './styles.module.scss'

interface Props {
  data: Task
}

export function Item({ data }: Props) {
  return (
    <li className={styles.container}>
      <strong>{data.title}</strong>

      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.date}>
            <FiCalendar />
            <time>{data.date}</time>
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
    </li>
  )
}
