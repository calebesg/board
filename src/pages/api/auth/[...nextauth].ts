import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import firebase from '../../../services/firebaseConfig'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        const snapshot = await firebase
          .firestore()
          .collection('users')
          .doc(token.sub)
          .get()

        const lastDonate = snapshot.exists
          ? snapshot.data()?.lastDonate.toDate()
          : null

        return {
          ...session,
          id: token.sub,
          vip: lastDonate ? true : false,
          lastDonate,
        }
      } catch (err) {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null,
        }
      }
    },

    async signIn({ email }) {
      try {
        return true
      } catch (err) {
        return false
      }
    },
  },
})
