import '../src/assets/styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#F8F9FA',
      },
      {
        name: 'dark',
        value: '#202738',
      },
    ],
  },
}