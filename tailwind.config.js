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
          100: 'var(--tui-base-09)',
          200: 'var(--tui-base-08)',
          300: 'var(--tui-base-07)',
          400: 'var(--tui-base-06)',
          500: 'var(--tui-base-05)',
          600: 'var(--tui-base-04)',
          700: 'var(--tui-base-03)',
          800: 'var(--tui-base-02)',
          900: 'var(--tui-base-01)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
