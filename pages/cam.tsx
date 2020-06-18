import { useCallback, useMemo, useEffect, useState, useRef } from "react";
import { Button } from "notion-ui";
import styled from "@emotion/styled";
import { detect } from "detect-browser";

const useDetectDevice = () => {
  const [isPortrait, setPortrait] = useState(true);
  const [browserWidth, setBrowserWidth] = useState(0);
  const [browserHeight, setBrowserHeight] = useState(0);

  useEffect(() => {
    const handleOrientation = () => {
      const beforeOrientation = window.matchMedia("(orientation: portrait)")
        .matches;
      setPortrait(!beforeOrientation);
      setBrowserWidth(window.innerWidth);
      setBrowserHeight(window.innerHeight);
    };
    setPortrait(window.matchMedia("(orientation: portrait)").matches);
    setBrowserWidth(window.innerWidth);
    setBrowserHeight(window.innerHeight);
    window.addEventListener("orientationchange", handleOrientation, true);
    return () => {
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  return {
    isPortrait,
    browserWidth,
    browserHeight,
  };
};

const useIsSupport = () => {
  const { os, name } = detect();
  const [isSupport, setIsSupport] = useState(true);
  const isMobile = useMemo(() => {
    return ["iOS", "Android OS", "BlackBerry OS"].includes(os);
  }, [os]);

  useEffect(() => {
    setIsSupport(isMobile && !["safari"].includes(name));
  }, [os, name]);
  return isSupport;
};

export default function CamPage() {
  const IsSupport = useIsSupport();
  const { isPortrait, browserWidth, browserHeight } = useDetectDevice();
  const canvasRef = useRef<HTMLCanvasElement>();
  const videoRef = useRef<HTMLVideoElement>();

  /**
   * 카메라의 width height는 가로모드가 기준입니다.
   * 브라우저는 세로모드가 기준이기 때문에 카메라의 값을 반대로 사용하여 계산하였습니다.
   * video.height -> 비디오의 가로
   */
  const constraints = {
    audio: false,
    video: {
      height: browserWidth,
      width: browserHeight,
      facingMode: { exact: "environment" },
    },
  };

  useEffect(() => {
    const renderCamera = () => {
      window.navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const video = videoRef.current;
          if (video && "srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }
          video.onloadedmetadata = function (e) {
            video.play();
          };
        })
        .catch((err) => {
          console.log(err.name);
        });
    };
    const timeout = setTimeout(() => {
      renderCamera();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClickTakePhoto = useCallback(() => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const video = videoRef.current;
      const videoHeight = video.videoHeight;
      const videoWidth = video.videoWidth;
      ctx.drawImage(
        video,
        0,
        0,
        videoWidth,
        videoHeight,
        0,
        0,
        videoWidth / 10,
        videoHeight / 10
      );
    }
  }, []);

  return (
    <Page>
      {!IsSupport && <NotSupport>Not Support Desktop Browser...</NotSupport>}
      {IsSupport && isPortrait ? (
        <>
          <Video ref={videoRef} />
          <TakePhotoButton buttonType="Primary" onClick={handleClickTakePhoto}>
            촬영
          </TakePhotoButton>
          <Preview ref={canvasRef} />
        </>
      ) : (
        <NotSupport>Not Support Landscape Mode...</NotSupport>
      )}
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

const Preview = styled.canvas`
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 16vw;
  height: 26vw;
  background-color: grey;
`;

const NotSupport = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
`;
