/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        dark: {
          css: {
            '--tw-prose-headings': theme('colors.red[500]'),
            '--tw-prose-body': theme('colors.white'),
             '--tw-prose-bold': theme('colors.white'),
          },
        },
        light: {
          css: {
            '--tw-prose-headings': theme('colors.red[900]'),
          },
        },
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
