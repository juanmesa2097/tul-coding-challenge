module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Oswald', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor',

        gray: {
          100: 'var(--tui-base-01)',
          200: 'var(--tui-base-02)',
          300: 'var(--tui-base-03)',
          400: 'var(--tui-base-04)',
          500: 'var(--tui-base-05)',
          600: 'var(--tui-base-06)',
          700: 'var(--tui-base-07)',
          800: 'var(--tui-base-08)',
          900: 'var(--tui-base-09)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
