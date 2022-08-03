import Link from 'next/link'

import styles from './styles.module.scss'

export function SupportButton() {
  return (
    <div className={styles.container}>
      <Link href="/donates">
        <button>Apoie</button>
      </Link>
    </div>
  )
}
