import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .container {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }

  .MuiSnackbarContent-message {
    width: 100%;
    text-align: center;
  }

  @media (max-width: 500px) {
    .container {
      padding: 0 5px;
    }
  }
`;

export default GlobalStyle;
