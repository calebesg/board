import Link from 'next/link'
import { FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi'
import { Task } from '../types'

import styles from './styles.module.scss'

interface Props {
  data: Task
  vip: boolean
  onDelete: (id: string) => void
  onChange: (task: Task) => void
}

export function Item({ data, onDelete, vip, onChange }: Props) {
  return (
    <li className={styles.container}>
      <Link href={`/board/${data.id}`}>
        <strong>{data.task}</strong>
      </Link>

      <footer>
        <div className={styles.date}>
          <FiCalendar />
          <time>{data.createdFormatted}</time>
        </div>

        <div className={styles.actionButtons}>
          {vip && (
            <button
              className={styles.btn__edit}
              type="button"
              onClick={() => onChange(data)}
            >
              <FiEdit2 />
              <span>Editar</span>
            </button>
          )}
          <button
            className={styles.btn__delete}
            type="button"
            onClick={() => onDelete(data.id)}
          >
            <FiTrash />
            <span>Excluir</span>
          </button>
        </div>
      </footer>
    </li>
  )
}
