import axios from "axios";

import { flashMessageErrorInterceptor } from "./interceptors/flashMessageErrorInterceptor";
import { flashMessageInterceptor } from "./interceptors/flashMessageInterceptor";
import { tokenInterceptor } from "./interceptors/tokenInterceptor";

type FlashOptions = {
  flashError?: boolean;
  flashSuccess?: boolean;
};

/**
 * @param flashError - show flash messages on error
 * @param flashSuccess - show flash messages on success (any 2xx status code)
 */
export function api(args?: FlashOptions) {
  const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  });

  api.interceptors.request.use(tokenInterceptor);

  let errorInterceptor;
  let successInterceptor;

  if (args?.flashError ?? true) {
    errorInterceptor = flashMessageErrorInterceptor;
  }

  if (args?.flashSuccess ?? true) {
    successInterceptor = flashMessageInterceptor;
  }

  api.interceptors.response.use(successInterceptor, errorInterceptor);

  return api;
}
