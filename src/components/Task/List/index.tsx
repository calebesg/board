import { Item } from '../Item'
import { Task } from '../types'

import styles from './styles.module.scss'

interface Props {
  items: Task[]
  onDeleteItem: (itemId: string) => void
  onChangeItem: (task: Task) => void
}

export function List({ items, onDeleteItem, onChangeItem }: Props) {
  return (
    <ul className={styles.container}>
      <legend>
        {items.length > 0
          ? `Tarefas restantes: ${items.length}`
          : 'Nenhuma tarefa disponível'}
      </legend>

      {items.map((item, i) => (
        <Item
          key={i}
          data={item}
          onDelete={onDeleteItem}
          onChange={onChangeItem}
        />
      ))}
    </ul>
  )
}
