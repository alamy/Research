import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      header: string;
      activeGreen: string;
      text: string;
    };

    fonts: {
      poppins: string;
      roboto: string;
    };
  }
}
