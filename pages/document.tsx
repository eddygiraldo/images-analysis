import React from 'react';
import type { NextPage } from 'next';
import Tesseract from 'tesseract.js';
import Webcam from 'react-webcam';
import { ImageContainer, InputContainer } from '../styles/home.styles';

const Document: NextPage = () => {
  const webcamRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [extractedText, setExtractedText] = React.useState<string>('');

  const handleInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const url = window.URL.createObjectURL(file);
    setImageUrl(url);
  };

  const validateImage = async () => {
    console.log('validating image');

    Tesseract.recognize(imageUrl, 'spa', {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      console.log(text);
      setExtractedText(text);
    });
  };

  const capture = React.useCallback(() => {
    if (!webcamRef.current) return;
    //@ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
    setImageUrl(imageSrc);
  }, [webcamRef, imageUrl]);

  return (
    <div>
      <main>
        <h1>Document detection</h1>
        <Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' />
        <InputContainer>
          <button onClick={capture}>Capture</button>
          <input
            type='file'
            accept='image/png, image/jpeg'
            onChange={(event) => handleInputFile(event)}
          />
        </InputContainer>
        <ImageContainer>
          <img ref={imageRef} src={imageUrl} onLoad={() => validateImage()} />
        </ImageContainer>
        <p>{extractedText}</p>
      </main>
    </div>
  );
};

export default Document;
