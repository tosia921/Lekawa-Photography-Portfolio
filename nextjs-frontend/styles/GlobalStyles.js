import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --PageBackground: #000814;
    --MainTextColor: #ECECEC;
    --SecondaryTextColor: #FFC300;
    --TextShadowLarge: 10px 10px 10px rgba(0,0,0,0.5);
    --TextShadowMedium: 5px 5px 5px rgba(0,0,0,0.5);
    --TextShadowSmall: 2px 2px 2px rgba(0,0,0,0.3);
    --BoxBackground: #343333;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-Regular.ttf);
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-Medium.ttf);
    font-style: medium;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-SemiBold.ttf);
    font-style: normal;
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-ExtraBold.ttf);
    font-style: bold;
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-BoldItalic.ttf);
    font-style: bold italic;
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-MediumItalic.ttf);
    font-style: medium italic;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'caveat';
    src: url(fonts/Caveat/Caveat-Regular.ttf);
    font-style: regular;
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-ExtraLightItalic.ttf);
    font-style: italic;
    font-weight: 300;
    font-display: swap;
  }
  @font-face {
    font-family: 'kanit';
    src: url(fonts/Kanit/Kanit-Light.ttf);
    font-style: normal;
    font-weight: 300;
    font-display: swap;
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
    background: var(--PageBackground);
  }  
`;

export default GlobalStyles;
