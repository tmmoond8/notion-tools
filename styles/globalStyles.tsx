import { Global } from '@emotion/core';
import emotionReset from 'emotion-reset';

export default function GlobalStyles(): JSX.Element {
  return (
    <Global styles={[emotionReset]}/>
  )
}