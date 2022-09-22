class ServerUtils {
  static resError(err: any, message = "") {
    return {
      resType: "THT",
      status: false,
      err: err,
      message: message,
    } as any;
  }

  // function that create success object
  static resSuccess(obj: any, message = "") {
    return {
      resType: "THT",
      status: true,
      data: obj,
      message: message,
    } as any;
  }
}
export default ServerUtils;
