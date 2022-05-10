import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
        font-weight: 400;
        background-color: #1b2021;

    }
    a, li, ul, p, h1 {
        color: white !important;
    }
    h1 {
        font-size: 2rem;
    }
    body { 
        display: flex;
        height: 100vh;
    }
`

export { GlobalStyle }
