import { createGlobalStyle } from 'styled-components'

export const StyledGlobal = createGlobalStyle`
  body {
    font: 12px sans-serif;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  button {
    border-radius: 5px;
    background: white;
    color: black;
    border: none;
    padding: 8px 15px;
    margin: 0 5px;
    box-shadow: inset 0 0 0 1px black;
    outline: none;
  }
`
