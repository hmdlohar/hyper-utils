export class LocalStorageUtilsService {
  static maxExpiryDate = new Date(2100, 0, 1, 0, 0, 0); // By Default It will expire on Year 2100
  lsGetObject(key: string) {
    try {
      if (typeof localStorage === "undefined") return null;
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return null;
    } catch (ex) {
      return new LocalStorageObject(localStorage.getItem(key));
    }
  }

  lsDelete(key: string) {
    return localStorage.removeItem(key);
  }

  lsGet(key: string) {
    try {
      if (typeof localStorage === "undefined") return null;
      const str = localStorage.getItem(key);
      if (!str) return null;
      const lsValue = JSON.parse(str);
      if (!lsValue) return null;

      const lso = new LocalStorageObject(lsValue.value, lsValue.expireDateTime);
      if (lso.isExpired()) {
        localStorage.removeItem(key);
        return null;
      }

      try {
        return JSON.parse(lso.value as any);
      } catch (ex) {
        return lso.value;
      }
    } catch (ex: any) {
      return localStorage.getItem(key);
    }
  }

  lsSet(key: string, item: any, expireDateOrExpireAfterInMinutes = null) {
    let expiryDate: any = new Date(2100, 0, 1, 0, 0, 0); // By Default It will expire on Year 2100
    if (typeof expireDateOrExpireAfterInMinutes === "number")
      expiryDate = new Date(
        Date.now() + expireDateOrExpireAfterInMinutes * 60 * 1000
      );
    else if (typeof expireDateOrExpireAfterInMinutes === "object")
      expiryDate = expireDateOrExpireAfterInMinutes;
    else if (typeof expireDateOrExpireAfterInMinutes === "string") {
      try {
        expiryDate = new Date(expireDateOrExpireAfterInMinutes || "");
      } catch (ex) {
        // Do Nothing
      }
    }
    const lso = new LocalStorageObject(item, expiryDate);

    localStorage.setItem(key, lso.toObject());
  }
}

export class LocalStorageObject {
  value?: string;
  expireDateTime?: string | number | Date;

  constructor(value: string | null, expireDateTime = null) {
    this.setValue(value as any);
    this.setExpiryDateTime(expireDateTime);
  }

  setValue(value: string) {
    try {
      this.value = JSON.parse(value);
    } catch (ex) {
      this.value = value;
    }
  }

  setExpiryDateTime(expireDateTime: Date | null) {
    this.expireDateTime =
      expireDateTime || LocalStorageUtilsService.maxExpiryDate;
  }

  isExpired() {
    if (new Date() > new Date(this.expireDateTime as any)) return true;
    return false;
  }

  toObject() {
    try {
      return JSON.stringify(this);
    } catch (ex) {
      return "";
    }
  }
}

const lsu = new LocalStorageUtilsService();
export default lsu;
