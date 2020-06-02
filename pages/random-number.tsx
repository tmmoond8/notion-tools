import styled from '@emotion/styled';
import { Button, colors } from 'notion-ui';

export default function TestPage() {
  return (
    <EmbedLayout>
      <p>This is test page</p>
    </EmbedLayout>
  )
}

const EmbedLayout = styled.div`
  padding: 32px;
  background: ${colors.R08};
`;