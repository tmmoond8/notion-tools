import styled from "@emotion/styled";
import { useState, useCallback, useEffect } from "react";
import { TextFiled, Content, Button, Layout, colors } from "notion-ui";

export default function RadixConverterPage() {
  const [result, setResult] = useState({
    "2to8": "",
    "2to10": "",
    "2to16": "",
    "8to2": "",
    "8to10": "",
    "8to16": "",
    "10to2": "",
    "10to8": "",
    "10to16": "",
    "16to2": "",
    "16to8": "",
    "16to10": "",
  });
  const [input, setInput] = useState({
    "2": "",
    "8": "",
    "10": "",
    "16": "",
  });

  const [errorMessage, setErrorMessage] = useState({
    "2": "",
    "8": "",
    "10": "",
    "16": "",
  });
  const handleChagneInput = useCallback(
    (e) => {
      setErrorMessage({
        ...errorMessage,
        [e.target.id.split("to")[0]]: "",
      });
      setInput({
        ...input,
        [e.target.id]: e.target.value,
      });
    },
    [input]
  );

  const handleConvert = useCallback(
    (inputRadix, outputRadix) => {
      const parseNumber = parseInt(input[inputRadix], inputRadix);
      if (Number.isNaN(parseNumber)) {
        setErrorMessage({
          ...errorMessage,
          [inputRadix]: "올바른 값을 입력해주세요.",
        });
        return;
      }
      setResult({
        ...result,
        [`${inputRadix}to${outputRadix}`]: parseNumber.toString(outputRadix),
      });
    },
    [result, input]
  );

  const model = Object.keys(result).reduce((accum, key) => {
    const [inputRadix, outputRadix] = key.split("to");
    if (inputRadix in accum) {
      accum[inputRadix].push(outputRadix);
    } else {
      accum[inputRadix] = [outputRadix];
    }
    return accum;
  }, {});

  return (
    <RadixConverterLayout>
      <ContentWrapper>
        {Object.keys(model).map((inputRadix) => {
          return (
            <Row key={inputRadix}>
              <div>
                <Row>
                  <InputLabel as="P">{`${inputRadix}진수`}</InputLabel>
                  <TextFiled
                    id={inputRadix}
                    value={input[inputRadix]}
                    onChange={handleChagneInput}
                  />
                </Row>
                <ErrorMessage>{`${errorMessage[inputRadix]} `}</ErrorMessage>
              </div>
              <div>
                {model[inputRadix].map((outputRadix) => (
                  <Row key={`${inputRadix}to${outputRadix}`}>
                    <ConvetButton
                      buttonType="Primary"
                      onClick={() => handleConvert(inputRadix, outputRadix)}
                    >
                      {`${outputRadix} 진수로`}
                    </ConvetButton>
                    <ResultNumber as="P">
                      {``}
                      {result[`${inputRadix}to${outputRadix}`]}
                    </ResultNumber>
                  </Row>
                ))}
              </div>
            </Row>
          );
        })}
      </ContentWrapper>
    </RadixConverterLayout>
  );
}

const RadixConverterLayout = styled(Layout.Embed)``;

const ContentWrapper = styled.div`
  width: 100%;

  div + div {
    margin-top: 24px;
  }
`;

const InputLabel = styled(Content.Text)`
  &.Text {
    margin-right: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 500px;
  margin: 0 auto;

  & + & {
    margin-top: 8px;
  }
`;

const ResultNumber = styled(Content.Text)`
  display: block;
  margin-left: 16px;
  width: 60px;
  text-align: right;
`;

const ConvetButton = styled(Button)`
  width: 90px;
`;

const ErrorMessage = styled.h4`
  margin-top: 16px;
  height: 20px;
  color: ${colors.grey32};
`;
