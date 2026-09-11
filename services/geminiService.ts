import { Flower } from "../types";
import { getCuratedFlowers } from "../data/curatedFlowers";

export const getFlowerRecommendations = async (userQuery?: string): Promise<Flower[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout for mobile resilience

    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: userQuery }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data as Flower[];
      }
    }
    
    console.warn("API returned non-ok or empty response. Using curated backup database.");
    return getCuratedFlowers(userQuery);
  } catch (error) {
    console.warn("Network or API timeout encountered. Falling back gracefully to curated database:", error);
    // Never fail the user experience - seamlessly return top-tier curated recommendations
    return getCuratedFlowers(userQuery);
  }
};
