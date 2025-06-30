import { Log } from "../logger";

export function genericRequestErrorHandler(error: any) {
  if (__DEV__) Log.e(error);
}
