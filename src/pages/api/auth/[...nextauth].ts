import { config } from "@/pages/config/config"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: config.githubId,
      clientSecret: config.githubSecret
    }),
    GoogleProvider({
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret
    })
  ],
})