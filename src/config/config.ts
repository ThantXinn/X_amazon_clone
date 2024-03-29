interface Config{
    apiBaseUrl: string,
    googleClientId: string,
    googleClientSecret: string,
    githubId: string,
    githubSecret: string,
    stripeSecretKey: string,
    nextPublicStripePublishableKey: string
}

export const config: Config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    githubId: process.env.GITHUB_ID || "",
    githubSecret: process.env.GITHUB_SECRET || "",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    nextPublicStripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
}