import '@/styles/globals.css'

import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../styles/theme'

import Header from '@/components/menu';
export default function App({ Component, pageProps }) {
  return (
    
    <ThemeProvider theme={theme}>
    <Header />
    <Component {...pageProps} />
    </ThemeProvider>
    

  )
}
