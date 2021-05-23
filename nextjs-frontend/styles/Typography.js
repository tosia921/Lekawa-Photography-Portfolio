import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`
  html {
    font-family: 'DM Sans', sans-serif; 
  }
  p {
      font-size: 1.6rem;
  }
  a {
    font-size: 1.6rem;
    color: var(--MainTextColor);
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
  
  h1 {
    font-size: 4rem;
    font-weight: 600;
    font-style: bold italic;
    text-align: center;
    text-shadow: var(--TextShadowLarge);
    line-height: 3.6rem;
    }
  h2 {
    font-size: 4rem;
    font-weight: 600;
    font-style: medium italic;
    text-shadow: var(--TextShadowMedium);
    line-height: 3.5rem;
    text-align: center;
  }
  h3 {
    font-size: 3.5rem;
    font-weight: 500;
    font-style: medium italic;
    text-shadow: var(--TextShadowMedium);
    line-height: 3.5rem;
    text-align: center;
  }
  .highlighted-text {
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    text-shadow: inherit;
    line-height: inherit;
    color: var(--SecondaryTextColor);
  }
  span {
    font-family: inherit;
    font-weight: inherit;
    font-style: inherit;
  }
`;

export default Typography;
