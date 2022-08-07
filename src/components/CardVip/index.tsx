import { FiClock } from 'react-icons/fi'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import styles from './styles.module.scss'

interface CardVipProps {
  lastDonate: string | Date
}

export function CardVip({ lastDonate }: CardVipProps) {
  const lastDonateFormatted = formatDistance(new Date(lastDonate), new Date(), {
    locale: ptBR,
  })

  return (
    <div className={styles.container}>
      <strong>Obrigado por apoiar esse projeto.</strong>
      <div>
        <FiClock />
        <time>Ultima doação há {lastDonateFormatted}.</time>
      </div>
    </div>
  )
}
