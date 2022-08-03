import { FiClock } from 'react-icons/fi'

import styles from './styles.module.scss'

export function CardVip() {
  return (
    <div className={styles.container}>
      <strong>Obrigado por apoiar esse projeto.</strong>
      <div>
        <FiClock />
        <time>Ultima doação há 3 dias.</time>
      </div>
    </div>
  )
}
