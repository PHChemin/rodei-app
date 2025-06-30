import useFlashMessages from "@/hooks/use-flash-messages";
import { AxiosResponse } from "axios";

/**
 * Triggers flashMessages only when both message text & type exists. Skips otherwise.
 */
export const flashMessageInterceptor = (response: AxiosResponse<any, any>) => {
  const text = response?.data?.message?.text;
  const type = response?.data?.message?.type;

  if (text && type) {
    useFlashMessages.getState().showFlashMessage({
      message: text,
      type,
    });
  }

  if (process.env.EXPO_PUBLIC_LOG_AXIOS_REQUESTS === "true") {
    console.log(
      "LOG : flashMessageInterceptor : ",
      JSON.stringify(response, null, 2)
    );
  }

  return response;
};
