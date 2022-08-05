import { Item } from '../Item'
import { Task } from '../types'

import styles from './styles.module.scss'

interface Props {
  items: Task[]
}

export function List({ items }: Props) {
  return (
    <ul className={styles.container}>
      <legend>
        {items.length > 0
          ? `Tarefas restantes: ${items.length}`
          : 'Nenhuma tarefa disponível'}
      </legend>

      {items.map((item, i) => (
        <Item key={i} data={item} />
      ))}
    </ul>
  )
}
