import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      colors: {
        // Extend with all default colors (gray, blue, red, etc.)
        ...colors,
      },
    },
  },
  plugins: [],
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.`,
    `./nuxt.config.ts`,
    `./content/**/*.md`,
  ],
}
