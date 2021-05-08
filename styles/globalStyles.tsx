import { Global, css } from "@emotion/core";
import emotionReset from "emotion-reset";
import { colorCss, colors } from "notion-ui";

export default function GlobalStyles(): JSX.Element {
  return <Global styles={[emotionReset, colorCss, baseStyles]} />;
}

const baseStyles = css`
  html, body, #__next {
    background-color: ${colors.backgroundEmbed};
    height: 100%;
  }
`;