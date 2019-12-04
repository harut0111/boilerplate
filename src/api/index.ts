const API_URL: string = "http://35.195.25.70/api.php";

export default class API {
  static signIn(login: string, password: string): Promise<any> {
    return fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        login,
        password
      })
    });
  }

  static getQuote(): Promise<any> {
    return fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "quote"
      })
    });
  }

  static getHistory(): Promise<any> {
    return fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "history"
      })
    });
  }
}
