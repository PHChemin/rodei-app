import { isAxiosError } from "axios";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Log } from "../logger";

export const handleFormErrors = <T extends FieldValues>(
  error: any,
  setError: UseFormReturn<T>["setError"]
) => {
  if (isAxiosError(error)) {
    if (error.response?.data.errors) {
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        setError(key as Path<T>, { message: value as string });
      }
    }
  } else {
    Log.e(error as string);
  }
};
