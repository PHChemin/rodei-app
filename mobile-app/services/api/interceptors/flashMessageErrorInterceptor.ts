import { t } from "i18next";
import { router } from "expo-router";

import { useToken } from "@/hooks/use-token";
import useFlashMessages from "@/hooks/use-flash-messages";
import { Log } from "@/services/logger";

/**
 * Errors on axios requests ALWAYS trigger flashMessages. No skip.
 *
 * Response message text is prorized;
 * Exception Error message is used when no message is found in response;
 * A default message is dispatched when nothing is found.
 */
export const flashMessageErrorInterceptor = (error: any) => {
  const text =
    error?.response?.data?.message?.text || t("flash-messages.server-error");

  // display a flash message if exists on error response data
  const type = "error";

  if (error?.response?.status !== 422 && text && type) {
    useFlashMessages.getState().showFlashMessage({
      message: text,
      type,
      autoClose: false,
    });
  }

  // check for unauthenticated errors and remove invalid token if exists
  if (error.response?.status === 401) {
    if (useToken.getState().token) {
      useToken.setState({
        token: null,
        user: null,
      });

      // redirect to login if router is available
      try {
        router.replace("/");
      } catch (error) {
        Log.e(error + "");
      }
    }
  }

  // debug
  if (process.env.EXPO_PUBLIC_LOG_AXIOS_REQUESTS === "true") {
    console.log(
      "LOG : flashMessageErrorInterceptor : ",
      JSON.stringify(error, null, 2)
    );
  }

  return Promise.reject(error);
};
