import Link from 'next/link'
import { AuthButton } from '../AuthButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <img src="/images/logo.svg" alt="B" />
        </Link>

        <nav>
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
          <Link href="/board" passHref>
            <a>Meu board</a>
          </Link>
        </nav>

        <AuthButton />
      </div>
    </header>
  )
}
