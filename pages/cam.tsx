import { useCallback } from 'react';
import { Button } from 'notion-ui';
import styled from '@emotion/styled';

export default function CamPage() {
  const handleClickTakePhoto = useCallback(() => {}, []);

  return (
    <Page>
      <Video />
      <TakePhotoButton buttonType="Primary" onClick={handleClickTakePhoto}>
        촬영
      </TakePhotoButton>
      <Preview />
    </Page>
  );
}

const Page = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;
const Video = styled.video`
  height: 100%;
  width: 100%;
  background-color: blue;
`;

const TakePhotoButton = styled(Button)`
  &.Button {
    position: fixed;
    bottom: 24px;
    left: 0;
    right: 0;
    width: 86px;
    height: 40px;
    margin: auto;
  }
`;

const Preview = styled.img`
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 26vw;
  height: 16vw;
  background-color: grey;
`;
