export type FacingMode = 'front' | 'back';
export type AspectRatio = 'cover' | number; // for example 16/9, 4/3, 1/1
export type PictureQuality = number;
export type Stream = MediaStream | null;
export type SetStream = React.Dispatch<React.SetStateAction<Stream>>;
export type SetNumberOfFrontCameras = React.Dispatch<React.SetStateAction<number>>;
export type SetNumberOfBackCameras = React.Dispatch<React.SetStateAction<number>>;
export type SetNotSupported = React.Dispatch<React.SetStateAction<boolean>>;
export type SetPermissionDenied = React.Dispatch<React.SetStateAction<boolean>>;
export type SetTorchSupported = React.Dispatch<React.SetStateAction<boolean>>;
export type SetTorchOnOff = React.Dispatch<React.SetStateAction<boolean>>;
export type SetFrontCameras = React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
export type SetBackCameras = React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;

export interface CameraProps {
  facingMode?: FacingMode;
  aspectRatio?: AspectRatio;
  pictureQuality?:PictureQuality;
  numberOfFrontCamerasCallback?(numberOffrontCameras: number): void;
  numberOfBackCamerasCallback?(numberOfbackCameras: number): void;
  errorMessages: {
    noCameraAccessible?: string;
    permissionDenied?: string;
    switchCamera?: string;
    canvas?: string;
  };
  videoReadyCallback?(): void;
}

export type CameraType = React.ForwardRefExoticComponent<CameraProps & React.RefAttributes<unknown>> & {
  takePhoto(): string;
  switchCamera(): Boolean;
  toggleTorch(): void;
  flashStatus(): Boolean;
};
