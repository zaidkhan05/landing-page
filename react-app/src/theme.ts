import { createTheme } from '@mui/material/styles';

export const minimalistTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0a0a0a',
    },
    secondary: {
      main: '#ff4757',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Manrope", "SF Pro Display", -apple-system, sans-serif',
    h1: {
      fontSize: '9rem',
      fontWeight: 800,
      lineHeight: 0.85,
      letterSpacing: '-0.06em',
    },
    h2: {
      fontSize: '5rem',
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '-0.04em',
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.1,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 700,
          fontSize: '0.75rem',
          padding: '18px 36px',
        },
      },
    },
  },
});
