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
        "light": {
          css: {
            '--tw-prose-headings': theme('colors.red[900]'),
            '--tw-prose-bullets': theme('colors.red[900]'),
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-invert-headings': theme('colors.red[500]'),
            '--tw-prose-invert-body': theme('colors.white'),

          }
        }
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
