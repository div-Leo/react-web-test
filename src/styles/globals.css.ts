import { createGlobalStyle } from 'styled-components'
import { SemanticColors } from './colors';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color:${SemanticColors.background.secondary};
    padding: 0;
    margin: 0;
    font-family: Avenir, Lato, "Nunito Sans", apple-system, BlinkMacSystemFont, arial, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
        display: none;
    }
  }
`

