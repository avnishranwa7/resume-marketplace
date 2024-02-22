export class MarketplaceService {
  static readonly baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://backend.resume-marketplace.com";

  static readonly getMarketplaces = (data: {
    userId: string;
    token: string;
  }) => {
    return fetch(
      this.baseUrl + `/marketplaces?userId=${data.userId}&token=${data.token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  static readonly createMarketplace = (formData: any) => {
    return fetch(this.baseUrl + "/marketplace", {
      method: "POST",
      body: formData,
    });
  };

  static readonly getResumes = (data: {
    tags: Array<string>;
    page: number;
    city?: string;
    state?: string;
    country?: string;
    yeo?: string;
    offset?: number;
  }) => {
    return fetch(this.baseUrl + `/get-resumes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tags: data.tags,
        page: data.page,
        ...(data.city && { city: data.city }),
        ...(data.state && { state: data.state }),
        ...(data.country && { country: data.country }),
        ...(data.yeo && { yeo: data.yeo }),
        ...(data.offset && { offset: data.offset }),
      }),
    });
  };

  static readonly getResume = (data: { filename: string }) => {
    return fetch(this.baseUrl + `/get-resume?filename=${data.filename}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };
}
