import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

const pick = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    allowsMultipleSelection: false,
  });

  if (!result.canceled) {
    const image = result.assets[0];
    return image;
  }

  return null;
};

const resize = async (uri: string, width: number, height: number) => {
  const resizedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width, height } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );

  return resizedImage;
};

const uriToReactNativeFormData = (uri: string, type: string, name: string) => {
  const formData = new FormData();

  // React Native FormData != Web FormData: https://github.com/pocketbase/pocketbase/discussions/2002#discussioncomment-5254168
  // @ts-ignore
  formData.append("avatar", {
    uri,
    type,
    name,
  });

  return formData;
};

const PhotoService = {
  pick,
  resize,
  uriToReactNativeFormData,
};

export default PhotoService;
