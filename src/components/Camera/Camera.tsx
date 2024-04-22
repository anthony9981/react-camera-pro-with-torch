import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import {
  CameraProps,
  FacingMode,
  Stream,
  SetStream,
  SetNotSupported,
  SetPermissionDenied,
  SetTorchSupported,
  SetTorchOnOff,
  SetFrontCameras,
  SetBackCameras,
  SetNumberOfFrontCameras,
  SetNumberOfBackCameras,
  PictureQuality
} from './types';
import { createPictureQuality } from './utils';
import { Container, Wrapper, Canvas, Cam, ErrorMsg } from './styles';

export const Camera = React.forwardRef<unknown, CameraProps>(
  (
    {
      facingMode = 'front',
      aspectRatio = 'cover',
      // numberOfCamerasCallback = () => null,
      numberOfFrontCamerasCallback = () => null,
      numberOfBackCamerasCallback = () => null,
      pictureQuality = 0.9,
      errorMessages = {
        noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
        permissionDenied: 'Permission denied. Please refresh and give camera permission.',
        switchCamera:
          'It is not possible to switch camera to different one because there is only one video device accessible.',
        canvas: 'Canvas is not supported.',
      },
      videoReadyCallback = () => null,
    },
    ref,
  ) => {
    const player = useRef<HTMLVideoElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const container = useRef<HTMLDivElement>(null);
    // const [numberOfCameras, setNumberOfCameras] = useState<number>(0);
    const [numberOffrontCameras, setNumberOfFrontCameras] = useState<number>(0);
    const [numberOfbackCameras, setNumberOfBackCameras] = useState<number>(0);
    const [stream, setStream] = useState<Stream>(null);
    const [currentFacingMode, setFacingMode] = useState<FacingMode>(facingMode);
    const [notSupported, setNotSupported] = useState<boolean>(false);
    const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
    const [torchsupported, setTorchSupported] = useState<boolean>(false);
    const [isTorchOn, setTorchOnOff] = useState<boolean>(false);
    const [frontCameras, setFrontCameras] = useState<MediaDeviceInfo[]>([]);
    const [backCameras, setBackCameras] = useState<MediaDeviceInfo[]>([]);
    const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
    const torchSupportedRef = useRef<boolean>(false);


    useEffect(() => {
      numberOfFrontCamerasCallback(numberOffrontCameras);
    }, [numberOffrontCameras]);

    useEffect(() => {
      numberOfBackCamerasCallback(numberOfbackCameras);
    }, [numberOfbackCameras]);

    useImperativeHandle(ref, () => ({
      takePhoto: () => {
        if (facingMode==='front'){
          if (numberOffrontCameras < 1) {
            throw new Error(errorMessages.noCameraAccessible);
          }
  
          if (canvas?.current) {
            const playerWidth = player?.current?.videoWidth || 1280;
            const playerHeight = player?.current?.videoHeight || 720;
            const playerAR = playerWidth / playerHeight;
  
            const canvasWidth = container?.current?.offsetWidth || 1280;
            const canvasHeight = container?.current?.offsetHeight || 1280;
            const canvasAR = canvasWidth / canvasHeight;
  
            let sX, sY, sW, sH;
  
            if (playerAR > canvasAR) {
              sH = playerHeight;
              sW = playerHeight * canvasAR;
              sX = (playerWidth - sW) / 2;
              sY = 0;
            } else {
              sW = playerWidth;
              sH = playerWidth / canvasAR;
              sX = 0;
              sY = (playerHeight - sH) / 2;
            }
  
            canvas.current.width = sW;
            canvas.current.height = sH;
  
            const context = canvas.current.getContext('2d');
            if (context && player?.current) {
              context.drawImage(player.current, sX, sY, sW, sH, 0, 0, sW, sH);
            }

            const quality: PictureQuality = createPictureQuality(0.8);
            const imgData = canvas.current.toDataURL('image/jpeg', quality);
            return imgData;
          } else {
            throw new Error(errorMessages.canvas);
          }
        }else{
          if (numberOfbackCameras < 1) {
            throw new Error(errorMessages.noCameraAccessible);
          }
  
          if (canvas?.current) {
            const playerWidth = player?.current?.videoWidth || 1280;
            const playerHeight = player?.current?.videoHeight || 720;
            const playerAR = playerWidth / playerHeight;
  
            const canvasWidth = container?.current?.offsetWidth || 1280;
            const canvasHeight = container?.current?.offsetHeight || 1280;
            const canvasAR = canvasWidth / canvasHeight;
  
            let sX, sY, sW, sH;
  
            if (playerAR > canvasAR) {
              sH = playerHeight;
              sW = playerHeight * canvasAR;
              sX = (playerWidth - sW) / 2;
              sY = 0;
            } else {
              sW = playerWidth;
              sH = playerWidth / canvasAR;
              sX = 0;
              sY = (playerHeight - sH) / 2;
            }
  
            canvas.current.width = sW;
            canvas.current.height = sH;
  
            const context = canvas.current.getContext('2d');
            if (context && player?.current) {
              context.drawImage(player.current, sX, sY, sW, sH, 0, 0, sW, sH);
            }
  
            const quality: PictureQuality = createPictureQuality(pictureQuality);
            const imgData = canvas.current.toDataURL('image/jpeg', quality);
            return imgData;
          } else {
            throw new Error(errorMessages.canvas);
          }
        }
      },
      switchCamera: () => {
        if (facingMode === 'front') {
          if (numberOffrontCameras < 1) {
            throw new Error(errorMessages.noCameraAccessible);
          } else if (numberOffrontCameras < 2) {
            console.error('Error: Unable to switch camera. Only one device is accessible.'); // console only
          }
          togglebetweencameras('front');
          console.log('Is Torch supported?: ', torchSupportedRef.current);
          return torchsupported;
        } else {
          if (numberOfbackCameras < 1) {
            throw new Error(errorMessages.noCameraAccessible);
          } else if (numberOfbackCameras < 2) {
            console.error('Error: Unable to switch camera. Only one device is accessible.'); // console only
          }
          togglebetweencameras('back');
          console.log('Is Torch supported?: ', torchSupportedRef.current);
          return torchsupported;
        }
      },
      toggleTorch: () => {
        const currentTrack = stream?.getVideoTracks()[0] || stream?.getTracks()[0];

        if (torchsupported) {
          const torchValue = isTorchOn ? false : true;

          currentTrack?.applyConstraints({
            advanced: [{ torch: torchValue }],
          } as MediaTrackConstraintSet);

          setTorchOnOff(torchValue);
        } else {
          console.log('Torch not supported');
        }
      },
      flashStatus: ()=>{
        return torchsupported;
      },
    }));

    function togglebetweencameras(frontback: string) {
      if (frontback === 'front') {
        console.log('Hello! I am in front.');
        setActiveDeviceId((prevCameraId) => {
          const currentIndex = frontCameras.findIndex((device) => device.deviceId === prevCameraId);
          console.log(currentIndex);
          console.log(frontCameras);
          if (currentIndex < 0) {
            let nextIndex = Math.abs(currentIndex);
            return frontCameras[nextIndex]?.deviceId || '';
          } else {
            let nextIndex = (currentIndex + 1) % frontCameras.length;
            return frontCameras[nextIndex]?.deviceId || '';
          }
        });
      } else {
        console.log('Hello! I am in back.');
        setActiveDeviceId((prevCameraId) => {
          const currentIndex = backCameras.findIndex((device) => device.deviceId === prevCameraId);
          console.log(currentIndex);
          console.log(backCameras);
          if (currentIndex < 0) {
            let nextIndex = Math.abs(currentIndex);
            return backCameras[nextIndex]?.deviceId || '';
          } else {
            let nextIndex = (currentIndex + 1) % backCameras.length;
            return backCameras[nextIndex]?.deviceId || '';
          }
        });
      }
    }
    
    useEffect(()=>{
      torchSupportedRef.current = torchsupported;
    },[torchsupported])

    useEffect(() => {
      initCameraStream(
        stream,
        setStream,
        facingMode,
        activeDeviceId,
        setNumberOfFrontCameras,
        setNumberOfBackCameras,
        setNotSupported,
        setPermissionDenied,
        setTorchSupported,
        setTorchOnOff,
        setFrontCameras,
        setBackCameras,
      );
    }, [facingMode, activeDeviceId]);

    useEffect(() => {
      if (stream && player && player.current) {
        player.current.srcObject = stream;
      }
      return () => {
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      };
    }, [stream]);

    return (
      <Container ref={container} aspectRatio={aspectRatio}>
        <Wrapper>
          {notSupported ? <ErrorMsg>{errorMessages.noCameraAccessible}</ErrorMsg> : null}
          {permissionDenied ? <ErrorMsg>{errorMessages.permissionDenied}</ErrorMsg> : null}
          <Cam
            ref={player}
            id="video"
            muted={true}
            autoPlay={true}
            playsInline={true}
            mirrored={currentFacingMode === 'front' ? true : false}
            onLoadedData={() => {
              videoReadyCallback();
            }}
          ></Cam>
          <Canvas ref={canvas} />
        </Wrapper>
      </Container>
    );
  },
);

Camera.displayName = 'Camera';

const initCameraStream = (
  stream: Stream,
  setStream: SetStream,
  currentFacingMode: FacingMode,
  videoSourceDeviceId: string | undefined,
  setNumberOfFrontCameras:SetNumberOfFrontCameras,
  setNumberOfBackCameras: SetNumberOfBackCameras, 
  setNotSupported: SetNotSupported,
  setPermissionDenied: SetPermissionDenied,
  setTorchSupported: SetTorchSupported,
  setTorchOnOff: SetTorchOnOff,
  setFrontCameras: SetFrontCameras,
  setBackCameras: SetBackCameras,
) => {
  // stop any active streams in the window
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  const constraints = {
    audio: false,
    video: {
      deviceId: videoSourceDeviceId ? { exact: videoSourceDeviceId } : undefined,
      facingMode: currentFacingMode==='front'?'user':'environment',
      width: { ideal: 1920 },
      height: { ideal: 1920 },
    },
  };

  if (navigator?.mediaDevices?.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(async stream => {
        const result = await checkTorchExists(navigator?.mediaDevices, stream)
        setTorchSupported(result);
        setTorchOnOff(result);
        setStream(await handleSuccess(stream, setNumberOfFrontCameras, setNumberOfBackCameras, setFrontCameras, setBackCameras));
      })
      .catch((err) => {
        handleError(err, setNotSupported, setPermissionDenied);
      });
  } else {
    const getWebcam =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
     
    if (getWebcam) {
      getWebcam(
        constraints,
        async stream => {
          const result = await checkTorchExists(getWebcam, stream)
          setTorchSupported(result);
          setTorchOnOff(result);
          setStream(await handleSuccess(stream, setNumberOfFrontCameras, setNumberOfBackCameras, setFrontCameras, setBackCameras));
        },
        (err) => {
          handleError(err as Error, setNotSupported, setPermissionDenied);
        },
      );
    } else {
      setNotSupported(true);
    }
  }
};

const handleSuccess = async (stream: MediaStream, setNumberOfFrontCameras: SetNumberOfFrontCameras, setNumberOfBackCameras: SetNumberOfBackCameras, setFrontCameras: SetFrontCameras, setBackCameras: SetBackCameras) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput' || 'video');
    const numberOfCameras = videoDevices.length;
    const frontDevices = videoDevices.filter(device =>
      device.label.toLowerCase().includes('front')
    );
    if (numberOfCameras > 0 && frontDevices.length === 0) {
      frontDevices.push(videoDevices[0]);
    }
    setFrontCameras(frontDevices);
    setNumberOfFrontCameras(frontDevices.length);

    const backDevices = videoDevices.filter(device =>
      device.label.toLowerCase().includes('back')
    );
    if (numberOfCameras > 0 && backDevices.length === 0) {
      backDevices.push(videoDevices[1]);
    }
    setBackCameras(backDevices);
    setNumberOfBackCameras(backDevices.length);
  } catch (error) {
    console.error('Error enumerating devices:', error);
  }

  return stream;
};

async function checkTorchExists(device: any, stream: MediaStream){
  const supportedConstraints = device?.getSupportedConstraints() ;
  let track = stream.getTracks()[0];
  try{
    if (supportedConstraints && 'torch' in supportedConstraints && track && track.applyConstraints) {
      try {
        await track.applyConstraints({ advanced: [{ torch: false }] } as MediaTrackConstraintSet);
        console.log("Torch constraint is supported.");
        return true;
      } catch (error) {
        console.log("Torch constraint is not supported.");
        return false;
      }
    } else {
      console.log("Torch constraint is not supported.");
      return false;
    }
  }catch{
    console.log("Torch constraint is not supported.");
    return false;
  }
};

const handleError = (error: Error, setNotSupported: SetNotSupported, setPermissionDenied: SetPermissionDenied) => {
  console.error(error);

  //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  if (error.name === 'PermissionDeniedError') {
    setPermissionDenied(true);
  } else {
    setNotSupported(true);
  }
};
