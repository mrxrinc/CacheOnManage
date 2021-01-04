import ImagePicker from "react-native-image-crop-picker";

export type ModalType = {
  visibility: boolean;
  title: string;
  activeContent: string | null;
};

export const OFFLOAD_MODAL = {
  visibility: false,
  title: "",
  activeContent: "",
};

const CAMERA_OPTIONS = {
  width: 400,
  height: 400,
  cropping: true,
  includeBase64: true,
};

export function handleCamera(
  setAvatar: (T: string) => void,
  handleSetSettingData: any
) {
  ImagePicker.openCamera(CAMERA_OPTIONS).then((image: any) => {
    console.log(image);
    setAvatar(image.data);
    handleSetSettingData(image.data);
  });
}

export function handleImagePicker(
  setAvatar: (T: string) => void,
  handleSetSettingData: any
) {
  ImagePicker.openPicker(CAMERA_OPTIONS).then((image: any) => {
    console.log(image);
    setAvatar(image.data);
    handleSetSettingData(image.data);
  });
}
