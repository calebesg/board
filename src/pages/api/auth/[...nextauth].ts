import NextAuth, { Account, Profile, Session, User } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

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
        return {
          ...session,
          id: token.sub,
        }
      } catch (err) {
        return {
          ...session,
          id: null,
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
