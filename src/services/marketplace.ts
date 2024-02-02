export class MarketplaceService {
  static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://backend.resume-marketplace.com";

  static getMarketplaces = (data: { email: string; token: string }) => {
    return fetch(this.baseUrl + `/marketplaces?email=${data.email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };

  static createMarketplace = (formData: any) => {
    return fetch(this.baseUrl + "/marketplace", {
      method: "POST",
      body: formData,
    });
  };
}
