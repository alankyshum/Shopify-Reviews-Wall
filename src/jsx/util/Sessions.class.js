import moment from 'moment';

export default class Sessions {
  static setCachedDBexpiration() {
    this.deleteCookie("compass_reviews_cachedDB");
    this.setCookie('compass_reviews_cachedDB');
  }
  static isDBcacheValid() {
    return /compass_reviews_cachedDB/.test(document.cookies);
  }
  static deleteCookie(name) {
    window.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  static setCookie(name, value, expires) {
    value = value || true;
    expires = expires || moment().subtract(1, 'day').toString();

    window.document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
}
