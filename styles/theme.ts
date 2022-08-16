export interface ITheme {
  colors: {
    background: string;
    paragraph: string;
    headline: string;
    button: string;
    stroke: string;
    main: string;
    highlight: string;
    secondary: string;
    tertiary: string;
  };
  devices: {
    phone: string;
  };
}

export const theme: ITheme = {
  colors: {
    background: '#eff0f3',
    paragraph: '#2a2a2a',
    headline: '#0d0d0d',
    button: '#ff8e3c',
    stroke: '#0d0d0d',
    main: '#fffffe',
    highlight: '#ff8906',
    secondary: '#f25f4c',
    tertiary: '#e53170',
  },
  devices: {
    phone: '480px',
  },
};
