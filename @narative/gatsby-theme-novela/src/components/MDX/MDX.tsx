import React from "react";

import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useColorMode } from "theme-ui";

import Anchor from "@components/Anchor";
import Blockquote from "@components/Blockquote";
import Code from "@components/Code";
import Figcaption from "@components/Figcaption"
import Headings from "@components/Headings";
import HorizontalRule from "@components/HorizontalRule";
import Lists from "@components/Lists";
import Paragraph from "@components/Paragraph";
import Tables from "@components/Tables";
import { ImageZoom } from "@components/Image";
// import Grid from "@components/Grid";

import mediaqueries from "@styles/media";
import { toKebabCase } from "@utils";

const components = {
  img: ImageZoom,
  a: Anchor,
  blockquote: Blockquote,
  figcaption: Figcaption,
  h1: Headings.h2, // h1 reserved article title
  h2: Headings.h2,
  h3: Headings.h3,
  h4: Headings.h4,
  h5: Headings.h5,
  h6: Headings.h6,
  hr: HorizontalRule,
  ul: Lists.ul,
  ol: Lists.ol,
  p: Paragraph,
  code: Code.Prism,
  pre: Code.Pre,
  table: Tables.Table,
  thead: Tables.Head,
  th: Tables.HeadCell,
  td: Tables.Cell,
};

interface MDXProps {
  content: React.ReactNode;
}

const MDX: React.FC<MDXProps> = ({ content, children, ...props }) => {
  const [colorMode] = useColorMode();

  return (
    <MDXProvider components={components}>
      <MDXBody>
        <MDXRenderer isDark={colorMode === "dark"} {...props}>
          {content}
        </MDXRenderer>
        {children}
      </MDXBody>
    </MDXProvider>
  );
};

export default MDX;

const IMAGE_WIDTHS = {
  regular: "680px",
  large: "1004px",
  full: "100vw"
};

const ARTICLE_WIDTH = css`
  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;

const HeadingsCSS = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 auto;
  }

  h1,
  h1 *,
  h2,
  h2 * {
    margin: 25px auto 18px;

    ${mediaqueries.tablet`
      margin: 30px auto 18px;
    `};
  }

  h3,
  h3 * {
    margin: 20px auto 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${ARTICLE_WIDTH};
  }
`;

const PrismCSS = p => css`
  .prism-code {
    overflow: auto;
    width: 100%;
    max-width: 744px;
    margin: 0 auto;
    padding: 32px;
    font-size: 13px;
    margin: 15px auto 50px;
    border-radius: 5px;
    font-family: ${p.theme.fonts.monospace};
    background: ${p.theme.colors.prism.background};

    .token-line {
      border-left: 3px solid transparent;

      ${Object.keys(p.theme.colors.prism)
        .map(key => {
          return `.${toKebabCase(key)}{color:${p.theme.colors.prism[key]};}`;
        })
        .reduce((curr, next) => curr + next, ``)};

      & > span {
      }
    }

    .number-line {
      display: inline-block;
      width: 32px;
      user-select: none;
      opacity: 0.3;
      color: #dcd9e6;

      ${mediaqueries.tablet`
        opacity: 0;
        width: 0;
      `};
    }

    .token-line.highlight-line {
      margin: 0 -32px;
      padding: 0 32px;
      background: ${p.theme.colors.prism.highlight};
      border-left: 3px solid ${p.theme.colors.prism.highlightBorder};

      ${mediaqueries.tablet`
        margin: 0 -20px;
        padding: 0 20px;
      `};
    }

    .operator + .maybe-class-name {
      color: #ffcf74 !important;
    }

    .plain ~ .operator {
      color: #5fa8aa !important;
    }

    ${mediaqueries.desktop`
      left: -26px;
    `};

    ${mediaqueries.tablet`
      max-width: 526px;
      padding: 20px 20px;
      left: 0;
    `};

    ${mediaqueries.phablet`
      text-size-adjust: none;
      border-radius: 0;
      margin: 0 auto 25px;
      padding: 25px 20px;
      overflow: initial;
      width: unset;
      max-width: unset;
      float: left;
      min-width: 100%;
      overflow: initial;
      position: relative;
    `};
  }
`;

const ImageCSS = css`
  .gatsby-resp-image-background-image {
    display: none !important;
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    filter: saturate(80%) contrast(85%);
    
    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `};
  }

  div.Image__Small {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    width: 100%;
    max-width: 680px;


    padding: 16px;
    background-color: white;
    
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 2;
      background-repeat: no-repeat;
      background-image: linear-gradient(to right, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(to bottom, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(to bottom, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(265deg, rgba(0,0,0,0.2), transparent 10%), linear-gradient(5deg, rgba(0,0,0,0.2), transparent 15%), linear-gradient(-5deg, rgba(0,0,0,0.1), transparent 10%), linear-gradient(5deg, rgba(0,0,0,0.1), transparent 10%), linear-gradient(-265deg, rgba(0,0,0,0.2), transparent 10%), linear-gradient(-5deg, rgba(0,0,0,0.2), transparent 15%), linear-gradient(266deg, rgba(0,0,0,0.2), transparent 10%);
      background-size: 50% 100%, 100% 33.3333%, 100% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%;
      background-position: right top, left center, left bottom, left top, left top, right top, left center, right center, right center, left bottom;
    }

    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `};

    ${mediaqueries.desktop`
      max-width: 507px;
    `}

    ${mediaqueries.tablet`
      max-width: 486px;
      margin: 0 auto 25px;
    `};

    ${mediaqueries.phablet`
      padding: 0 20px;
    `};
  }

  .Image__Container {
    text-align: center;
  }

  img.Image__With-Shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  div.Image__Medium {
    position: relative;
    margin: 15px auto 50px;
    width: 100%;
    max-width: ${IMAGE_WIDTHS.large};


    padding: 16px;
    background-color: white;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 2;
      background-repeat: no-repeat;
      background-image: linear-gradient(to right, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(to bottom, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(to bottom, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(265deg, rgba(0,0,0,0.2), transparent 10%), linear-gradient(5deg, rgba(0,0,0,0.2), transparent 15%), linear-gradient(-5deg, rgba(0,0,0,0.1), transparent 10%), linear-gradient(5deg, rgba(0,0,0,0.1), transparent 10%), linear-gradient(-265deg, rgba(0,0,0,0.2), transparent 10%), linear-gradient(-5deg, rgba(0,0,0,0.2), transparent 15%), linear-gradient(266deg, rgba(0,0,0,0.2), transparent 10%);
      background-size: 50% 100%, 100% 33.3333%, 100% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%;
      background-position: right top, left center, left bottom, left top, left top, right top, left center, right center, right center, left bottom;
    }

    ${mediaqueries.desktop_medium`
      left: -34px;
    `};

    ${mediaqueries.desktop`
      left: -26px;
    `};

    ${mediaqueries.tablet`
      border-radius: 0;
      left: 0;
      margin: 0 auto 25px;

      img {
        border-radius: 0;
      }
    `};
  }

  div.Image__Large {
    position: relative;
    width: ${IMAGE_WIDTHS.full};
    margin: 25px auto 60px;
    pointer-events: none;

    img {
      border-radius: 0;
    }
 
    ${mediaqueries.desktop`
      left: -53px;
    `};

    ${mediaqueries.tablet`
      left: 0;
      margin: 0 auto 25px;
    `};
  }
`;

const Grid = css`
  .Grid {
    display: grid;
    grid-gap: 8px;
    position: relative;
    margin: 15px auto 50px;
    
    &.Col2 {
      grid-template-columns: 1fr 1fr;
      
      ${mediaqueries.phone`
        grid-template-columns: 1fr;
      `};
    }
    
    &.Col3 {
      grid-template-columns: 1fr 1fr 1fr;
      
      ${mediaqueries.phone`
        grid-template-columns: 1fr;
      `};
    }


    &.Small {
      max-width: ${IMAGE_WIDTHS.regular};
    }
    
    &.Medium {
      max-width: ${IMAGE_WIDTHS.large};
    }
    
    &.Large {
      width: ${IMAGE_WIDTHS.full};
    }
  }
`;

/**
 * MDXBody
 * Here we're applying "global" selectors to make sure we maintain an article
 * body type feel. We're also applying all the Prism selecotors and styles within
 * the MDXBody.
 */
const MDXBody = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${HeadingsCSS}
  ${PrismCSS}
  ${ImageCSS}
  ${Grid}
`;
