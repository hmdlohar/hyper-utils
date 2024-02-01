import { parseErrorString } from "./parseErrorString";
export const ALERT_TYPE = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  INFO: "INFO",
  WARNING: "WARNING",
};
export class AlertUtils {
  static swal = null;
  static async getSWAL() {
    try {
      if (!this.swal) this.swal = (await import("sweetalert2")).default;
      return this.swal;
    } catch (ex) {
      throw new Error(
        "Error occurred while loading sweetalert2. Error: " +
          parseErrorString(ex)
      );
    }
  }
  static async showAlert(msg: string, type: any, option: any = {}) {
    try {
      const swal = await this.getSWAL();
      if (typeof msg !== "string") {
        msg = parseErrorString(msg);
        if (!msg) msg = "Error: " + JSON.stringify(msg);

        // return swal("Unknown Error: Message must be string", "error")
      }

      const title = "";
      const message = msg;
      let icon = "info";

      if (ALERT_TYPE.SUCCESS === type) icon = "success";
      if (ALERT_TYPE.ERROR === type) icon = "error";
      if (ALERT_TYPE.INFO === type) icon = "info";
      if (ALERT_TYPE.WARNING === type) icon = "warning";
      const options = {
        icon: icon,
        title: title,
        timer: option.timeout,
        html: message,
        ...option,
      };
      return swal.fire(options);
    } catch (ex) {
      console.log(ex, msg, type);
      return new Promise((resolve) => resolve({}));
    }
  }
  static async showInfo(msg: any, options?: any) {
    // this.snackbarError(msg)
    this.showAlert(msg, ALERT_TYPE.INFO, options);
  }

  static async showError(msg: any, options?: any) {
    // this.snackbarError(msg)
    this.showAlert(msg, ALERT_TYPE.ERROR, options);
  }

  static async showWarning(msg: any, options?: any) {
    // this.snackbarWarning(msg)
    this.showAlert(msg, ALERT_TYPE.WARNING, options);
  }

  static async showSuccess(msg: any, options?: any) {
    // this.snackbarSuccess(msg)
    this.showAlert(msg, ALERT_TYPE.SUCCESS, options);
  }

  static async showConfirm(
    title: any,
    description = "",
    icon = "warning",
    dangerMode = false,
    objOptions: any = {}
  ) {
    const swal = await this.getSWAL();
    return new Promise((resolve) => {
      const options = {
        title,
        icon,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Reject`,
        ...objOptions,
      };
      if (description) options.text = description;
      swal.fire(options).then((result: { isConfirmed: any }) => {
        if (!result.isConfirmed) resolve(false);
        resolve(true);
      });
    });
  }
}


