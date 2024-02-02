export class MarketplaceService {
  static readonly baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://backend.resume-marketplace.com";

  static readonly getMarketplaces = (data: {
    userId: string;
    token: string;
  }) => {
    return fetch(this.baseUrl + `/marketplaces?userId=${data.userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };

  static readonly createMarketplace = (formData: any) => {
    return fetch(this.baseUrl + "/marketplace", {
      method: "POST",
      body: formData,
    });
  };
}
