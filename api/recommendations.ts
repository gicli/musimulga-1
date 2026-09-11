import { fetchFlowerRecommendations } from "../services/recommendationCore";
import { getCuratedFlowers } from "../data/curatedFlowers";

export default async function handler(req: any, res: any) {
  // CORS setup
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  let query: string | undefined;

  try {
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          // ignore
        }
      }
      query = body?.query;
    } else if (req.method === "GET") {
      query = req.query?.query;
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const data = await fetchFlowerRecommendations(query);
    return res.status(200).json(data);
  } catch (error: any) {
    console.warn("Vercel API exception encountered. Gracefully providing curated fallback:", error?.message);
    const fallback = getCuratedFlowers(query);
    return res.status(200).json(fallback);
  }
}
