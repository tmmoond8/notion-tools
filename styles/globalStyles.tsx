import { Global } from "@emotion/core";
import emotionReset from "emotion-reset";
import { colorCss } from "notion-ui";

export default function GlobalStyles(): JSX.Element {
  return <Global styles={[emotionReset, colorCss]} />;
}
