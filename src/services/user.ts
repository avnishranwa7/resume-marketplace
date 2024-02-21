export class UserService {
  static readonly baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://backend.resume-marketplace.com";

  static readonly getUser = (data: { userId: string; token: string }) => {
    return fetch(
      this.baseUrl + `/user?userId=${data.userId}&token=${data.token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  static readonly saveProfile = (data: {
    userId: string;
    token: string;
    name: string;
    title: string;
    city: string;
    state: string;
    country: string;
  }) => {
    return fetch(this.baseUrl + `/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: data.token,
        userId: data.userId,
        name: data.name,
        title: data.title,
        city: data.city,
        state: data.state,
        country: data.country,
      }),
    });
  };
}
