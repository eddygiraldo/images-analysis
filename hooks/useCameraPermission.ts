import React from 'react';
export enum CAMERA_PERMISSION {
  DENIED = 'denied',
  PROMPT = 'prompt',
  GRANTED = 'granted',
}

export interface useCameraPermissionProps {
  permission: PermissionState;
  isPermissionDenied: Boolean;
  handlePermissionOnUserMedia: () => void;
  handlePermissionOnUserMediaError: (error?: string | DOMException | Error) => void;
}

export const useCameraPermission = (): useCameraPermissionProps => {
  const [permission, setPermission] = React.useState<PermissionState>('prompt');
  const [isPermissionDenied, setIsPermissionDenied] = React.useState<Boolean>(false);

  React.useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'camera' as PermissionName })
        .then((cameraPermissions) => {
          setPermission(cameraPermissions.state);

          cameraPermissions.onchange = () => {
            setPermission(cameraPermissions.state);
          };
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  React.useEffect(() => {
    setIsPermissionDenied(permission === CAMERA_PERMISSION.DENIED);
  }, [permission]);

  const handlePermissionOnUserMedia = React.useCallback(() => {
    // everything is fine and the camera initialized correctly.
    setIsPermissionDenied(false);
  }, []);

  const handlePermissionOnUserMediaError = React.useCallback(() => {
    // here we can handle other errors too, but for the sake of simplicity we will treat all of them as camera denied.
    setIsPermissionDenied(true);
  }, []);

  return {
    permission,
    isPermissionDenied,
    handlePermissionOnUserMedia,
    handlePermissionOnUserMediaError,
  };
};
