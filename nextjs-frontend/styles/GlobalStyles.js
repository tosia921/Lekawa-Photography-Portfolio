import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --PageBackground: #000814;
    --MainTextColor: #ECECEC;
    --SecondaryTextColor: #FFC300;
    --TextShadowLarge: 10px 10px 10px rgba(0,0,0,0.5);
    --TextShadowMedium: 5px 5px 5px rgba(0,0,0,0.5);
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-Regular.ttf);
    font-style: regular;
    font-weight: 400;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-BoldItalic.ttf);
    font-style: bold italic;
    font-weight: 600;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-MediumItalic.ttf);
    font-style: medium italic;
    font-weight: 500;
  }
  @font-face {
    font-family: 'caveat';
    src: url(fonts/Caveat/Caveat-Regular.ttf);
    font-style: regular;
    font-weight: 400;
  }
  * {
    font-family: kanit;
    font-weight: 400;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 10px;
    color: var(--MainTextColor);
  }
  
`;

export default GlobalStyles;
