import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Flower } from "../types";

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

// Curated high quality Korean seasonal fallback database for 100% reliable responses
export const seasonalFallbacks: Record<string, Flower[]> = {
  "봄": [
    { rank: 1, name: "팬지", englishName: "Pansy", plantingPeriod: "3월~4월 (모종 식재)", bloomingPeriod: "4월~6월", characteristics: "추위에 강하고 화려한 색감으로 봄 화단을 가장 먼저 밝혀주는 대표적인 봄꽃입니다.", caution: "과습에 약하므로 물빠짐이 좋은 흙에 심고 통풍에 유의하세요.", relatedFlowers: ["비올라", "스위스팬지", "미니팬지", "보라팬지", "노랑팬지"] },
    { rank: 2, name: "데이지", englishName: "English Daisy", plantingPeriod: "3월~4월 (파종/식재)", bloomingPeriod: "4월~7월", characteristics: "순백색과 분홍빛의 사랑스러운 꽃송이가 풍성하게 피어납니다.", caution: "직사광선과 건조에 주의하며 겉흙이 마르면 물을 주세요.", relatedFlowers: ["샤스타데이지", "마가렛", "유리호프스", "블루데이지", "아프리칸데이지"] },
    { rank: 3, name: "수국", englishName: "Hydrangea", plantingPeriod: "3월~5월 (모종 식재)", bloomingPeriod: "6월~8월", characteristics: "풍성하고 탐스러운 꽃송이가 매력적이며 토양 산도에 따라 꽃 색상이 변합니다.", caution: "물을 아주 좋아하므로 흙이 마르지 않게 관리하고 강한 직사광선은 피하세요.", relatedFlowers: ["목수국", "엔드리스썸머", "산수국", "아나벨수국", "떡갈잎수국"] },
    { rank: 4, name: "라벤더", englishName: "Lavender", plantingPeriod: "3월~5월 (모종 식재)", bloomingPeriod: "6월~9월", characteristics: "은은하고 편안한 허브 향기로 힐링을 선사하는 지중해 원산의 다년초입니다.", caution: "고온다습한 환경에 약하므로 배수가 잘되는 마사토 비율을 높여주세요.", relatedFlowers: ["잉글리쉬라벤더", "프렌치라벤더", "스위트라벤더", "피나타라벤더", "스패니쉬라벤더"] },
    { rank: 5, name: "금잔화", englishName: "Calendula", plantingPeriod: "3월~4월 (직접 파종)", bloomingPeriod: "5월~10월", characteristics: "선명한 주황색과 노란색 꽃이 피며 식용 및 약용으로도 인기 있습니다.", caution: "햇빛이 잘 드는 양지에 심어야 꽃이 풍성하게 개화합니다.", relatedFlowers: ["포트마리골드", "오렌지금잔화", "옐로우금잔화", "카렌듈라옵티마", "터치오브레드"] }
  ],
  "여름": [
    { rank: 1, name: "메리골드", englishName: "Marigold", plantingPeriod: "5월~8월 (파종 및 모종 식재)", bloomingPeriod: "6월~10월", characteristics: "더위와 병충해에 매우 강하며 특유의 향으로 해충을 쫓아주는 가드닝 필수 꽃입니다.", caution: "과습을 피하고 햇빛이 하루 5시간 이상 드는 곳에 배치하세요.", relatedFlowers: ["프렌치메리골드", "아프리칸메리골드", "천수국", "만수국", "바닐라메리골드"] },
    { rank: 2, name: "백일홍", englishName: "Zinnia", plantingPeriod: "5월~7월 (직파 및 식재)", bloomingPeriod: "7월~10월", characteristics: "백일 동안 붉게 핀다는 이름처럼 오랜 기간 화려한 색상을 뽐냅니다.", caution: "장마철 곰팡이병 예방을 위해 통풍이 잘 되는 곳에 심으세요.", relatedFlowers: ["미니백일홍", "자이언트백일홍", "프로퓨전지니아", "클래식백일홍", "폼폰백일홍"] },
    { rank: 3, name: "천일홍", englishName: "Globe Amaranth", plantingPeriod: "5월~7월 (파종/식재)", bloomingPeriod: "7월~10월", characteristics: "동글동글한 귀여운 꽃송이가 천 일 동안 색을 잃지 않아 드라이플라워로도 최고입니다.", caution: "건조에는 강하지만 배수가 불량하면 뿌리가 상할 수 있습니다.", relatedFlowers: ["스트로베리필즈", "보라천일홍", "화이트천일홍", "오드리퍼플", "빅핑키"] },
    { rank: 4, name: "해바라기", englishName: "Sunflower", plantingPeriod: "5월~7월 (씨앗 파종)", bloomingPeriod: "7월~9월", characteristics: "태양을 닮은 크고 당당한 황금빛 꽃으로 여름 정원의 주인공이 됩니다.", caution: "충분한 양분과 깊은 흙, 하루 종일 내리쬐는 햇빛이 필수입니다.", relatedFlowers: ["미니해바라기", "테디베어해바라기", "벨벳퀸", "러시안자이언트", "썬리치골드"] },
    { rank: 5, name: "봉선화", englishName: "Garden Balsam", plantingPeriod: "5월~6월 (파종)", bloomingPeriod: "7월~9월", characteristics: "손톱을 물들이는 친근한 전통 꽃으로 척박한 땅에서도 잘 자랍니다.", caution: "어린 모종 시기에 수분이 부족하지 않도록 주의하세요.", relatedFlowers: ["겹봉선화", "아프리카봉선화", "뉴기니아임파첸스", "물봉선", "장미봉선화"] }
  ],
  "가을": [
    { rank: 1, name: "국화", englishName: "Chrysanthemum", plantingPeriod: "8월~9월 (가을 모종 식재)", bloomingPeriod: "9월~11월", characteristics: "가을 정취를 대표하는 그윽한 향기와 다채로운 색감의 꽃입니다.", caution: "개화기에는 겉흙이 마르면 바로 물을 주어 꽃이 마르지 않게 하세요.", relatedFlowers: ["소국", "폼폰국화", "가든멈", "아스터", "구절초"] },
    { rank: 2, name: "코스모스", englishName: "Cosmos", plantingPeriod: "7월~8월 (파종)", bloomingPeriod: "9월~10월", characteristics: "가을바람에 한들거리는 서정적인 꽃으로 초보자도 쉽게 키울 수 있습니다.", caution: "너무 비옥한 흙에서는 잎만 무성해질 수 있으니 척박한 토양이 좋습니다.", relatedFlowers: ["황화코스모스", "초콜릿코스모스", "피코티코스모스", "소나타코스모스", "더블클릭코스모스"] },
    { rank: 3, name: "과꽃", englishName: "China Aster", plantingPeriod: "7월~8월 (파종 및 식재)", bloomingPeriod: "8월~10월", characteristics: "다양한 파스텔톤 꽃송이가 풍성하게 피어나는 가을의 대표 화초입니다.", caution: "연작 장해가 있으므로 작년에 심었던 흙을 피해서 심어주세요.", relatedFlowers: ["마츠모토과꽃", "프린세스과꽃", "폼폰과꽃", "피오니과꽃", "드워프과꽃"] },
    { rank: 4, name: "아네모네", englishName: "Anemone", plantingPeriod: "9월~11월 (추식 구근 식재)", bloomingPeriod: "익년 3월~5월", characteristics: "가을에 심어 이른 봄에 매혹적인 꽃을 피우는 가을 식재 구근식물입니다.", caution: "구근을 심기 전 젖은 수건에 싸서 서서히 불린 후 뾰족한 부분이 아래로 향하게 심으세요.", relatedFlowers: ["코로나리아", "드카엔", "세인트브리지드", "블란다", "모나리자"] },
    { rank: 5, name: "튤립", englishName: "Tulip", plantingPeriod: "10월~11월 (추식 구근 식재)", bloomingPeriod: "익년 4월~5월", characteristics: "가을에 땅에 묻어 겨울의 추위를 겪어야 봄에 가장 아름답게 피어납니다.", caution: "구근 크기의 2~3배 깊이로 심고 배수가 원활해야 구근이 썩지 않습니다.", relatedFlowers: ["망고참", "아펠둔", "퀸오브나이트", "엔젤리크", "스트롱골드"] }
  ],
  "겨울": [
    { rank: 1, name: "튤립", englishName: "Tulip", plantingPeriod: "10월~12월 (추식 구근)", bloomingPeriod: "4월~5월", characteristics: "겨울 동안 저온 처리를 거쳐 봄에 눈부신 꽃을 피우는 대표 구근 꽃입니다.", caution: "반드시 겨울 추위를 겪어야 꽃대가 올라옵니다.", relatedFlowers: ["망고참", "아펠둔", "퀸오브나이트", "엔젤리크", "스트롱골드"] },
    { rank: 2, name: "히야신스", englishName: "Hyacinth", plantingPeriod: "10월~12월 (수경재배/식재)", bloomingPeriod: "2월~4월", characteristics: "실내를 가득 채우는 매혹적이고 달콤한 향기가 일품인 구근식물입니다.", caution: "수경재배 시 구근 밑바닥이 물에 살짝만 닿게 조절하세요.", relatedFlowers: ["델프트블루", "퐁퐁히야신스", "카네기", "잔보스", "시티오브하를렘"] },
    { rank: 3, name: "수선화", englishName: "Daffodil", plantingPeriod: "10월~12월 (구근 식재)", bloomingPeriod: "3월~4월", characteristics: "추위에 매우 강하며 봄의 시작을 알리는 노란 축포 같은 꽃입니다.", caution: "꽃이 진 후에도 잎이 누렇게 마를 때까지 광합성을 시켜주세요.", relatedFlowers: ["떼따떼뜨", "페이퍼화이트", "타히티", "아이스폴리스", "더치마스터"] },
    { rank: 4, name: "시클라멘", englishName: "Cyclamen", plantingPeriod: "11월~1월 (실내 분화)", bloomingPeriod: "12월~3월", characteristics: "서늘한 베란다에서 겨울 내내 꽃을 피우는 겨울 분화의 여왕입니다.", caution: "꽃과 잎에 직접 물이 닿지 않도록 저면관수(받침대에 물 채우기)로 주세요.", relatedFlowers: ["미니시클라멘", "프릴시클라멘", "향기시클라멘", "로코코시클라멘", "빅토리아시클라멘"] },
    { rank: 5, name: "포인세티아", englishName: "Poinsettia", plantingPeriod: "11월~12월 (실내 가드닝)", bloomingPeriod: "12월~2월", characteristics: "크리스마스를 상징하는 강렬한 붉은 잎이 매혹적인 겨울 식물입니다.", caution: "추위에 약하므로 최저 12도 이상의 실내 밝은 곳에 두세요.", relatedFlowers: ["프리미엄레드", "프린세티아핑크", "골든글로우", "아이스크리스탈", "시나몬"] }
  ]
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

export function getFallbackData(query: string): Flower[] {
  const q = (query || "").toLowerCase();
  
  if (q.includes("수국")) {
    return [{
      rank: 1,
      name: "수국",
      englishName: "Hydrangea",
      plantingPeriod: "3월~5월 (봄 모종 식재 권장)",
      bloomingPeriod: "6월~8월",
      characteristics: "풍성하고 화려한 꽃송이가 매력적이며 토양의 산도(pH)에 따라 청색, 분홍색으로 꽃 색이 달라집니다.",
      caution: "물을 매우 좋아하는 식물이므로 흙이 마르지 않게 관리하고, 한여름 강한 직사광선은 잎 화상을 유발할 수 있습니다.",
      relatedFlowers: ["목수국 (라임라이트)", "엔드리스썸머", "산수국", "아나벨수국", "떡갈잎수국"]
    }];
  }

  if (q.includes("장미")) {
    return [{
      rank: 1,
      name: "장미",
      englishName: "Rose",
      plantingPeriod: "3월~4월 또는 10월~11월 (휴면기 묘목 식재)",
      bloomingPeriod: "5월~10월 (품종에 따라 반복 개화)",
      characteristics: "꽃의 여왕이라 불리며 매혹적인 향기와 다채로운 화형을 자랑하는 대표적인 정원 목본식물입니다.",
      caution: "햇빛이 최소 6시간 이상 필요하며 진딧물과 흑점병 예방을 위해 통풍 관리가 필수적입니다.",
      relatedFlowers: ["사계장미", "덩굴장미", "미니장미", "데이비드오스틴 로즈", "하이브리드 티 로즈"]
    }];
  }

  if (q.includes("라벤더")) {
    return [{
      rank: 1,
      name: "라벤더",
      englishName: "Lavender",
      plantingPeriod: "3월~5월 (봄 모종 식재)",
      bloomingPeriod: "6월~9월",
      characteristics: "마음을 편안하게 해주는 그윽한 아로마 향과 보랏빛 꽃대가 매력적인 지중해 허브입니다.",
      caution: "장마철 고온다습에 매우 취약하므로 배수가 뛰어난 흙(마사토 50% 이상)과 뛰어난 통풍이 필수입니다.",
      relatedFlowers: ["잉글리쉬 라벤더", "프렌치 라벤더", "스위트 라벤더", "피나타 라벤더", "스패니쉬 라벤더"]
    }];
  }

  // Month or Season mapping
  const monthMatch = q.match(/(\d{1,2})월/);
  const monthNum = monthMatch ? parseInt(monthMatch[1], 10) : new Date().getMonth() + 1;

  if (monthNum >= 3 && monthNum <= 5) {
    return seasonalFallbacks["봄"];
  } else if (monthNum >= 6 && monthNum <= 8) {
    return seasonalFallbacks["여름"];
  } else if (monthNum >= 9 && monthNum <= 11) {
    return seasonalFallbacks["가을"];
  } else {
    return seasonalFallbacks["겨울"];
  }
}

export async function fetchFlowerRecommendations(userQuery?: string): Promise<Flower[]> {
  const date = new Date();
  const currentMonth = date.toLocaleString("ko-KR", { month: "long" });

  let context = typeof userQuery === "string" ? userQuery.trim() : "";
  if (!context || context === "지금" || context === "지금 심기 좋은 꽃") {
    context = currentMonth;
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

  const modelsToTry = [
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.5-flash",
    "gemini-3.7-flash",
  ];

  if (process.env.GEMINI_API_KEY) {
    for (const modelName of modelsToTry) {
      try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: flowerSchema,
            temperature: 0.4,
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            parsed.sort((a: any, b: any) => (a.rank || 0) - (b.rank || 0));
            return parsed;
          }
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed:`, err?.message);
      }
    }
  }

  // Fallback to curated high-quality data
  return getFallbackData(context);
}
