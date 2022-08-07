import { Item } from '../Item'
import { Task } from '../types'

import styles from './styles.module.scss'

interface Props {
  items: Task[]
  vip: boolean
  onDeleteItem: (itemId: string) => void
  onChangeItem: (task: Task) => void
}

export function List({ items, vip, onDeleteItem, onChangeItem }: Props) {
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
          vip={vip}
          data={item}
          onDelete={onDeleteItem}
          onChange={onChangeItem}
        />
      ))}
    </ul>
  )
}
