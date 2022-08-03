import { Item } from '../Item'
import { Task } from '../types'

import styles from './styles.module.scss'

interface Props {
  items: Task[]
}

export function List({ items }: Props) {
  return (
    <ul className={styles.container}>
      <legend>Voçê tem {items.length} tarefas</legend>

      {items.map((item, i) => (
        <Item key={i} data={item} />
      ))}
    </ul>
  )
}
