import Link from 'next/link'

import styles from './styles.module.scss'

export function SupportButton() {
  return (
    <div className={styles.container}>
      <Link href="/donate">
        <button>Apoie</button>
      </Link>
    </div>
  )
}
