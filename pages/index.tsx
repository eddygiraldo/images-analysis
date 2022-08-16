import React from 'react';
import type { NextPage } from 'next';
import * as faceApi from 'face-api.js';
import Webcam from 'react-webcam';
import { ImageContainer, InputContainer } from '../styles/home.styles';

const Home: NextPage = () => {
  const MODEL_URL = '/models';
  const webcamRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [imageUrl, setImageUrl] = React.useState<string>('');

  React.useEffect(() => {
    const loadFaceModels = async () => {
      await faceApi.loadSsdMobilenetv1Model(MODEL_URL);
      await faceApi.loadFaceLandmarkModel(MODEL_URL);
      await faceApi.loadFaceRecognitionModel(MODEL_URL);
    };

    loadFaceModels();
  }, []);

  const handleInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const url = window.URL.createObjectURL(file);
    setImageUrl(url);
  };

  const validateImage = async () => {
    console.log('validating image');
    if (!imageRef.current) return;
    if (!canvasRef.current) return;
    const input = imageRef.current;
    let fullFaceDescriptions = await faceApi
      .detectAllFaces(input)
      .withFaceLandmarks()
      .withFaceDescriptors();
    console.log({ fullFaceDescriptions });

    faceApi.draw.drawFaceLandmarks(canvasRef.current, fullFaceDescriptions);
  };

  const capture = React.useCallback(() => {
    if (!webcamRef.current) return;
    //@ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
    setImageUrl(imageSrc);
  }, [webcamRef, imageUrl]);

  const videoConstraints = {
    facingMode: 'user',
  };

  return (
    <div>
      <main>
        <h1>Face detection</h1>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          videoConstraints={videoConstraints}
        />
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
          <canvas ref={canvasRef} width={640} height={480} />
        </ImageContainer>
      </main>
    </div>
  );
};

export default Home;
