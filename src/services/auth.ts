export class AuthService {
  static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "http://backend.resume-marketplace.com";

  static login = (data: any) => {
    return fetch(this.baseUrl + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  static signup = (data: any) => {
    return fetch(this.baseUrl + "/auth/signup", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
}
