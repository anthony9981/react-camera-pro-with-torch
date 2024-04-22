/// <reference types="react" />
export declare type FacingMode = 'front' | 'back';
export declare type AspectRatio = 'cover' | number;
export declare type PictureQuality = number;
export declare type Stream = MediaStream | null;
export declare type SetStream = React.Dispatch<React.SetStateAction<Stream>>;
export declare type SetNumberOfFrontCameras = React.Dispatch<React.SetStateAction<number>>;
export declare type SetNumberOfBackCameras = React.Dispatch<React.SetStateAction<number>>;
export declare type SetNotSupported = React.Dispatch<React.SetStateAction<boolean>>;
export declare type SetPermissionDenied = React.Dispatch<React.SetStateAction<boolean>>;
export declare type SetTorchSupported = React.Dispatch<React.SetStateAction<boolean>>;
export declare type SetTorchOnOff = React.Dispatch<React.SetStateAction<boolean>>;
export declare type SetFrontCameras = React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
export declare type SetBackCameras = React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
export interface CameraProps {
    facingMode?: FacingMode;
    aspectRatio?: AspectRatio;
    pictureQuality?: PictureQuality;
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
export declare type CameraType = React.ForwardRefExoticComponent<CameraProps & React.RefAttributes<unknown>> & {
    takePhoto(): string;
    switchCamera(): Boolean;
    toggleTorch(): void;
    flashStatus(): Boolean;
};
