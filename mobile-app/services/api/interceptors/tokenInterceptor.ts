import { useToken } from "@/hooks/use-token";
import { InternalAxiosRequestConfig } from "axios";

export const tokenInterceptor = (request: InternalAxiosRequestConfig<any>) => {
  const token = useToken.getState().token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};
