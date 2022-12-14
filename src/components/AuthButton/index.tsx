import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function AuthButton() {
  const { data: session } = useSession()

  function auth() {
    session ? signOut() : signIn()
  }

  function renderContentUnLogged() {
    return (
      <>
        <FaGithub color="#FFBB00" />
        <span className={styles.label}>Entrar com GitHub</span>
      </>
    )
  }

  function renderContentLogged() {
    return (
      <>
        <Image
          width={36}
          height={36}
          src={`${session?.user?.image}`}
          alt={`${session?.user?.name}`}
        />
        <span className={styles.label}>{session?.user?.name}</span>
        <FiX color="#737380" />
      </>
    )
  }

  return (
    <button type="button" className={styles.authButton} onClick={auth}>
      {session ? renderContentLogged() : renderContentUnLogged()}
    </button>
  )
}
