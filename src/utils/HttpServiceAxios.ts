import parseErrorString from "./parseErrorString";
import qs from "querystring";

class HttpServiceFetch {
  static createJqReq(
    url: string,
    headers: any,
    type: string,
    data = undefined
  ) {
    const objReq: any = {
      url,
      method: type,
      headers,
      data,
    };
    if (headers["Content-Type"] === "application/json" && type !== "GET") {
      objReq.data = JSON.stringify(data);
      objReq.processData = false;
    }

    if (
      headers["Content-Type"] === "application/x-www-form-urlencoded" &&
      type !== "GET"
    ) {
      objReq.data = qs.stringify(data);
    }

    return objReq;
  }

  static handleError(ex: any) {
    // const newEx = new Error(parseErrorString(ex));
    // //@ts-ignore
    // newEx.ex = ex;
    // throw newEx;
    throw ex;
  }

  static handleSuccess(data: any) {
    try {
      return data;
    } catch (ex) {
      return data;
    }
  }
  static async get(url: string, headers = {}) {
    try {
      const axios = (await import("axios")).default;
      const data = await axios(this.createJqReq(url, headers, "GET"));
      return this.handleSuccess(data);
    } catch (ex) {
      this.handleError(ex);
    }
  }

  static async post(url: string, data: any, headers = {}) {
    headers = { "Content-Type": "application/json", ...headers };
    try {
      const axios = (await import("axios")).default;
      const responseData = await axios(
        this.createJqReq(url, headers, "POST", data)
      );
      return this.handleSuccess(responseData);
    } catch (ex) {
      this.handleError(ex);
    }
  }

  static async put(url: string, data: any, headers = {}) {
    headers = { "Content-Type": "application/json", ...headers };
    try {
      const axios = (await import("axios")).default;
      const responseData = await axios(
        this.createJqReq(url, headers, "PUT", data)
      );
      return this.handleSuccess(responseData);
    } catch (ex) {
      this.handleError(ex);
    }
  }

  static async delete(url: string, data: any, headers = {}) {
    headers = { "Content-Type": "application/json", ...headers };
    try {
      const axios = (await import("axios")).default;
      const responseData = await axios(
        this.createJqReq(url, headers, "DELETE", data)
      );
      return this.handleSuccess(responseData);
    } catch (ex) {
      this.handleError(ex);
    }
  }
}

export default HttpServiceFetch;
