import { createGlobalStyle } from 'styled-components';
import { ITheme } from './theme';

export default createGlobalStyle<{ theme: ITheme }>`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Titillium Web', sans-serif;
  }

  main {
    padding: 0 100px;
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;

    @media (max-width: ${(props) => props.theme.devices.phone}) {
      padding: 1rem;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2 {
    margin: 0;
    color: ${(props) => props.theme.colors.headline}
  }

  button {
    background-color: ${(props) => props.theme.colors.button};
    border: 1px solid ${(props) => props.theme.colors.button};
    color: ${(props) => props.theme.colors.stroke};
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;
