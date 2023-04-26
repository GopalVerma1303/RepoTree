import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "ee2db5a9c8b7e213538e",
      clientSecret: "7bb2e7b37925b4c44097c51441efca7453cebb52",
    }),
    // ...add more providers here
  ],
  secret: 'abc',
  session: {
    strategy: 'jwt',
},
jwt: {
    secret: 'abc'
},
callbacks: {
  async jwt({ token, account }) {
    // Persist the OAuth access_token to the token right after signin
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  },
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token from a provider.
    session.accessToken = token.accessToken
    return session
  }
}
}

export default NextAuth(authOptions)