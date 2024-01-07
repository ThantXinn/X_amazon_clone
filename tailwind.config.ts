import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        "wide": "1440px"
      },
      colors: {
        amazon_blue: "#131921",
        amazon_light: "#232F3E",
        amazon_yellow: "#FF9900",
        amazon_search: "#F3A846",
        amazon_button: "#F7CA00",
        lightText: "#ccc",
      },
      fontFamily: {
        bodyFont:["Poppins","sans-serif"]
      }
    },
  },
  plugins: [],
}
export default config
