import moment from 'moment';

export default class Sessions {
  static setCachedDBexpiration() {
    debugger;
    this.deleteCookie("compass_reviews_cachedDB");
    this.setCookie('compass_reviews_cachedDB');
  }
  static isDBcacheValid() {
    return /compass_reviews_cachedDB/.test(document.cookie);
  }
  static deleteCookie(name) {
    window.document.cookie = `${name}=;`;
  }
  static setCookie(name, value) {
    value = value || true;
    window.document.cookie = `${name}=${value};`;
  }
}
