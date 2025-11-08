import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#e3f2f9',
      100: '#c5e4f3',
      500: '#2b6cb0',
      900: '#1a365d',
    },
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Arial, sans-serif',
  },
});

export default theme;
