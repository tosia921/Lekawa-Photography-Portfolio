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
    --PricingCardBackground: #575757;
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
