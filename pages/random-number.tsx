import styled from "@emotion/styled";
import { useState, useCallback, useEffect } from "react";
import { TextField, Content, Button, Layout } from "notion-ui";
import { useRouter } from "next/router";

export default function RandomNumberPage() {
  const {
    query: { min = "0", max = "100" },
  } = useRouter();
  const [minValue, setMinValue] = useState<string>(
    typeof min === "string" ? min : min[0]
  );
  const [maxValue, setMaxValue] = useState<string>(
    typeof max === "string" ? max : max[0]
  );

  useEffect(() => {
    setMinValue(minValue);
    setMaxValue(maxValue);
  }, [minValue, maxValue]);

  const [randomNumber, setRandomNumber] = useState("ㅤ");

  const handleChangeMin = useCallback((e) => {
    setMinValue(e.target.value);
  }, []);

  const handleChangeMax = useCallback((e) => {
    setMaxValue(e.target.value);
  }, []);

  const handleGenerateNumber = useCallback(
    (e) => {
      const range = Number(maxValue) - Number(minValue);
      if (range < 0) {
        return;
      }
      setRandomNumber(
        Math.floor(Math.random() * range + Number(minValue)).toString()
      );
    },
    [minValue, maxValue]
  );

  return (
    <RandomNumberLayout>
      <ContentWrapper>
        <Row>
          <TextField id="min" value={minValue} onChange={handleChangeMin} />
          <Content.Text as="P">to</Content.Text>
          <TextField id="max" value={maxValue} onChange={handleChangeMax} />
          <Button buttonType="Primary" onClick={handleGenerateNumber}>
            Generate
          </Button>
        </Row>
        <RandomNumber as="H3" marginTop={16}>
          {randomNumber}
        </RandomNumber>
      </ContentWrapper>
    </RandomNumberLayout>
  );
}

const RandomNumberLayout = styled(Layout.Embed)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 500px;
  margin: 0 auto;
`;

const RandomNumber = styled(Content.Text)`
  justify-content: center;
`;
