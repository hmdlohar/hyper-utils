import qs from "querystring";

class CommonUtils {
  static isMobile() {
    return window.innerWidth <= 600;
  }

  static isTablet() {
    return window.innerWidth <= 900;
  }

  static isIPhone() {
    if (typeof navigator === "undefined") return false;
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  static parseQueryString(str: string) {
    return qs.parse(str.toString().replace("?", ""));
  }

  static decodeQueryObject(strSearch: string) {
    try {
      const query: any = this.parseQueryString(strSearch);
      return JSON.parse(atob(query.q));
    } catch (ex) {
      return null;
    }
  }

  static getBase64FromDataURI(str = "") {
    let index = str?.indexOf(";base64,");
    return str.substr(index + ";base64,".length);
  }

  static readDataURIFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) resolve(reader.result?.toString());
        else reject("Error occurred while reading file. Empty Result.");
      };
      reader.onerror = () => {
        reject(new Error("Error occurred while reading file"));
      };
      reader.readAsDataURL(file);
    });
  }

  static getPercentage(value: any = 0, percentage: any = 0) {
    value = parseFloat(value) || 0;
    percentage = parseFloat(percentage) || 0;
    return (value / 100) * percentage || 0;
  }

  static convertAryToObj(ary: string[], value: any = "") {
    let obj: any = {};
    ary.forEach((item) => (obj[item] = value));
    return obj;
  }
  static createObject<T extends readonly string[]>(
    steps: T
  ): Record<T[number], object> {
    const typed = {} as Record<string, string>;
    steps.forEach((step) => (typed[step] = step));
    return typed as unknown as Record<T[number], object>;
  }

  static toLowerCaseSafe(str = "") {
    return str ? str.toLowerCase() : "";
  }

  static toUpperCaseSafe(str = "") {
    return str ? str.toUpperCase() : "";
  }

  static getLastChars(str: string, lastDigit: number = 4) {
    return str?.substr(str.length - lastDigit, lastDigit) || "";
  }

  static toFixedNumber(n: any, decimal: number = 3) {
    if (parseFloat(n)) {
      return parseFloat(parseFloat(n).toFixed(decimal));
    }
    return n;
  }

  static tryJSONParse(string: string) {
    try {
      return JSON.parse(string);
    } catch (ex) {
      return null;
    }
  }

  static askForFile(options: {} = {}): Promise<FileList | null> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = () => {
        resolve(input.files);
      };

      input.click();
    });
  }

  static htmlToText(myHTML: string) {
    let strippedHtml = myHTML.replace(/<[^>]+>/g, "");
    return strippedHtml;
  }

  static toUpperUnderscore(str?: any) {
    if (str) return str?.replace(/[^a-zA-Z0-9]/g, "_")?.toUpperCase() || "";
    return "";
  }
}

export default CommonUtils;
