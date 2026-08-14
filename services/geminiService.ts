import { Flower } from "../types";

export const getFlowerRecommendations = async (userQuery?: string): Promise<Flower[]> => {
  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: userQuery }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Flower[];
  } catch (error) {
    console.error("Error fetching flower data:", error);
    throw error;
  }
};
