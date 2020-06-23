import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  margin: 40px auto 56px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.title};

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    font-family: ${p => p.theme.fonts.title};
    max-width: 880px !important;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 72px;
    line-height: 1.2;
    font-weight: ${p => p.theme.fontsWeight.bold};
    color: ${p => p.theme.colors.accent};
    text-align: center;

    ${mediaqueries.tablet`
      font-size: 56px;
      padding: 0;
    `};

    ${mediaqueries.phablet`
      font-size: 48px;
    `};
  }

  cite {
    display: block;
    font-size: 20px;
    margin-top: 8px;
    font-weight: ${p => p.theme.fontsWeight.light};
    
    ${mediaqueries.tablet`
      padding-left: 180px;
      font-size: 16px;
    `};

    ${mediaqueries.phablet`
      padding-left: 40px;
    `};

  }
`;

export default Blockquote;
