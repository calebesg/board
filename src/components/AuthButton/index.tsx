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
        Entrar com GitHub
      </>
    )
  }

  function renderContentLogged() {
    return (
      <>
        <img
          src="https://avatars.githubusercontent.com/u/36782514?v=4"
          alt="avatar"
        />
        Calebe Souza
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
