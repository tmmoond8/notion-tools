import styled from "@emotion/styled";
import { useState, useCallback } from "react";
import { TextField, Content, Button, Layout, colors } from "notion-ui";

const radixMap = {
  Binary: 2,
  Octal: 8,
  Decimal: 10,
  Hexa: 16,
};

export default function RadixConverterPage() {
  const [result, setResult] = useState({
    BinaryToOctal: "",
    BinaryToDecimal: "",
    BinaryToHexa: "",
    OctalToBinary: "",
    OctalToDecimal: "",
    OctalToHexa: "",
    DecimalToBinary: "",
    DecimalToOctal: "",
    DecimalToHexa: "",
    HexaToBinary: "",
    HexaToOctal: "",
    HexaToDecimal: "",
  });
  const [input, setInput] = useState({
    Binary: "",
    Octal: "",
    Decimal: "",
    Hexa: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    Binary: "",
    Octal: "",
    Decimal: "",
    Hexa: "",
  });
  const handleChagneInput = useCallback(
    (e) => {
      setErrorMessage({
        ...errorMessage,
        [e.target.id.split("To")[0]]: "",
      });
      setInput({
        ...input,
        [e.target.id.split("To")[0]]: e.target.value,
      });
    },
    [input]
  );

  const handleConvert = useCallback(
    (inputRadix, outputRadix) => {
      const parseNumber = parseInt(input[inputRadix], radixMap[inputRadix]);
      if (Number.isNaN(parseNumber)) {
        setErrorMessage({
          ...errorMessage,
          [inputRadix]: "invalid input. ",
        });
        return;
      }
      setResult({
        ...result,
        [`${inputRadix}To${outputRadix}`]: parseNumber.toString(
          radixMap[outputRadix]
        ),
      });
    },
    [result, input]
  );

  const model = Object.keys(result).reduce((accum, key) => {
    const [inputRadix, outputRadix] = key.split("To");
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
                  <InputLabel as="P">{`${inputRadix}`}</InputLabel>
                  <TextField
                    id={inputRadix}
                    value={input[inputRadix]}
                    onChange={handleChagneInput}
                  />
                </Row>
                <ErrorMessage>{`${errorMessage[inputRadix]} `}</ErrorMessage>
              </div>
              <div>
                {model[inputRadix].map((outputRadix) => (
                  <Row key={`${inputRadix}To${outputRadix}`}>
                    <ConvetButton
                      buttonType="Primary"
                      onClick={() => handleConvert(inputRadix, outputRadix)}
                    >
                      {`To ${outputRadix}`}
                    </ConvetButton>
                    <ResultNumber as="P">
                      {``}
                      {result[`${inputRadix}To${outputRadix}`]}
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
