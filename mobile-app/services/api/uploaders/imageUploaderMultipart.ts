import * as FileSystem from "expo-file-system";
import { useToken } from "@/hooks/use-token";
import { flashMessageErrorInterceptor } from "@/services/api/interceptors/flashMessageErrorInterceptor";
import { flashMessageInterceptor } from "@/services/api/interceptors/flashMessageInterceptor";

type UploaderProps = {
  url: string;
  fieldName: string;
  imageUri: string;
  httpMethod?: FileSystem.FileSystemAcceptedUploadHttpMethod;
};

export const uploadMultipartImage = async ({
  url,
  fieldName,
  imageUri,
  httpMethod = "POST",
}: UploaderProps) => {
  try {
    const data = await FileSystem.uploadAsync(url, imageUri, {
      httpMethod,
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName,
      headers: {
        Authorization: `Bearer ${useToken.getState().token}`,
      },
    });

    const result: any = {
      data: JSON.parse(data.body),
    };

    flashMessageInterceptor(result);
    return true;
  } catch (error) {
    flashMessageErrorInterceptor(error);
    return false;
  }
};
