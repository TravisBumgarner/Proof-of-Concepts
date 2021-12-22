import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        font-size: 16px;
        font-weight: 400;
        background-color: lightslategray;
        color: LightPink;
        height: 50vh;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
`

export { GlobalStyle }
