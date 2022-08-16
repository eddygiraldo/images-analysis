import styled from 'styled-components';
import { ITheme } from './theme';

export const MainContainer = styled.div<{ theme: ITheme }>`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.paragraph};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
`;

export const ImageContainer = styled.div`
  position: relative;

  & canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const InputContainer = styled.div`
  display: flex;

  button {
    margin-right: 1rem;
  }

  input::-webkit-file-upload-button {
    background-color: ${(props) => props.theme.colors.button};
    border: 1px solid ${(props) => props.theme.colors.button};
    color: ${(props) => props.theme.colors.stroke};
    padding: 0.25rem 0.75rem;
    cursor: pointer;
  }

  input::-webkit-file-upload-button:hover {
    background: #fff;
    border: 2px solid #535353;
    color: #000;
  }

  input:active {
    all: none;
  }

  input:hover {
    all: none !important;
    border: none;
  }
`;
