export class AuthService {
  static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://backend.resume-marketplace.com";

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

  static verify = (email: string) => {
    return fetch(this.baseUrl + "/auth/verify", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  static completeVerification = (email: string, token: string) => {
    return fetch(this.baseUrl + "/auth/complete-verification", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    });
  };
}
