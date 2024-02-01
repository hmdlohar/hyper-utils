import { CommonUtils } from "./CommonUtils";

export function parseErrorString(error: any) {
  if (typeof error === "string") {
    return error;
  }
  if (typeof error?.response?.data?.message === "string")
    return error?.response?.data?.message;

  if (typeof error.message === "string") {
    return error.message;
  }

  if (typeof error.Message === "string") {
    return error.Message;
  }

  if (typeof error.responseText === "string") {
    const obj = CommonUtils.tryJSONParse(error.responseText);
    if (typeof obj?.message === "string") return obj.message;
    if (typeof obj?.Message === "string") return obj.Message;
  }

  if (typeof error.CustomErrorMessage === "string" && error.CustomErrorMessage)
    return error.CustomErrorMessage;

  if (typeof error?.response?.data?.message === "string")
    return error?.response?.data?.message;

  if (typeof error?.ObjException === "object")
    return error.ObjException.Message;

  return error.toString();
}
