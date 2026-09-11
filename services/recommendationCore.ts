import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Flower } from "../types";
import { getCuratedFlowers } from "../data/curatedFlowers";

export const flowerSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      rank: { type: Type.INTEGER },
      name: { type: Type.STRING },
      englishName: {
        type: Type.STRING,
        description: "Scientific or common English name of the flower for image generation",
      },
      plantingPeriod: {
        type: Type.STRING,
        description: "When to sow seeds or plant seedlings",
      },
      bloomingPeriod: {
        type: Type.STRING,
        description: "When the flower blooms",
      },
      characteristics: {
        type: Type.STRING,
        description: "Key features of the flower",
      },
      caution: {
        type: Type.STRING,
        description: "Care instructions or warnings",
      },
      relatedFlowers: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "5 specific varieties of this flower ranked by popularity",
      },
    },
    required: [
      "rank",
      "name",
      "englishName",
      "plantingPeriod",
      "bloomingPeriod",
      "characteristics",
      "caution",
      "relatedFlowers",
    ],
  },
};

let aiClient: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export async function fetchFlowerRecommendations(userQuery?: string): Promise<Flower[]> {
  const date = new Date();
  const currentMonth = date.toLocaleString("ko-KR", { month: "long" });

  let context = typeof userQuery === "string" ? userQuery.trim() : "";
  if (!context || context === "지금" || context === "지금 심기 좋은 꽃") {
    context = currentMonth;
  }

  // If no Gemini API Key is configured, immediately return curated data without delay
  if (!process.env.GEMINI_API_KEY) {
    return getCuratedFlowers(context);
  }

  const prompt = `
사용자 입력: "${context}"

당신은 한국의 가드닝 전문가 AI입니다. 
사용자의 입력이 '특정 꽃 이름'인지 아니면 '시기, 계절, 장소'인지 판단하여 아래 규칙에 따라 꽃 추천 리스트를 JSON으로 작성하세요.

[판단 로직 및 생성 규칙]

CASE 1: 사용자가 "특정 꽃 이름"을 입력한 경우 (예: 수국, 튤립, 장미, 라벤더 등)
1. **이 경우 오직 해당 꽃 1개만 리스트에 포함하세요.** (다른 추천 꽃 절대 금지)
2. Rank는 1로 설정하세요.
3. 'plantingPeriod'는 해당 꽃을 한국에서 심기에 가장 적합한 시기를 정확히 기재하세요.
4. 사용자가 입력한 이름과 정확히 일치하는 꽃 정보를 제공해야 합니다.

CASE 2: 사용자가 "시기(월), 계절, 장소"를 입력한 경우 (예: 8월, 가을, 베란다, 그늘 등)
1. 해당 시기나 환경에 **씨앗을 심거나(파종) 모종을 심기에(식재)** 가장 적합하고 인기 있는 꽃 10가지를 추천하세요.
2. (중요) 사용자가 입력한 월은 '꽃이 피는 시기'가 아니라 **'심는 시기'**를 의미합니다. (예: "12월" 입력 시 -> 12월에 심어야 하는 구근이나 실내 파종 꽃 추천)

[공통 작성 상세 가이드]
1. 언어: 한국어
2. 기후 기준: 대한민국 기후
3. 데이터 필드 설명:
   - name: 꽃 이름 (한글)
   - englishName: 이미지 생성을 위한 정확한 영문명 (예: Hydrangea, Rose, Marigold)
   - plantingPeriod: 파종 또는 모종 식재 시기 (구체적인 월 표시)
   - bloomingPeriod: 개화 시기
   - characteristics: 매력적인 특징 1~2문장
   - caution: 키울 때 주의할 점 및 관리법
   - relatedFlowers: 해당 꽃의 가장 인기 있는 세부 품종 5가지를 인기순으로 나열

응답은 반드시 JSON 형식이어야 합니다.
`;

  // Try top-speed lightweight models with a strict 4.5s timeout each to prevent serverless freeze
  const modelsToTry = [
    "gemini-2.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-2.5-flash",
  ];

  for (const modelName of modelsToTry) {
    try {
      const ai = getAIClient();
      
      const generatePromise = ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: flowerSchema,
          temperature: 0.4,
        },
      });

      // 4500ms timeout per model attempt
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 4500)
      );

      const response: any = await Promise.race([generatePromise, timeoutPromise]);

      const text = response?.text;
      if (text) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.sort((a: any, b: any) => (a.rank || 0) - (b.rank || 0));
          return parsed;
        }
      }
    } catch (err: any) {
      console.warn(`Model ${modelName} did not respond quickly or failed:`, err?.message);
    }
  }

  // Gracefully fallback to high quality curated dataset
  return getCuratedFlowers(context);
}
