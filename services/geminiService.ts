import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getBusinessAdvice = async (topic: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key no configurada. Por favor configura process.env.API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Proporciona un consejo breve, impactante y accionable para un emprendedor sobre el tema: "${topic}". 
      El tono debe ser motivacional pero realista. Máximo 40 palabras.`,
    });
    return response.text || "No se pudo generar el consejo.";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "El oráculo de negocios está meditando. Intenta más tarde.";
  }
};

export const analyzeTrend = async (): Promise<string> => {
    if (!apiKey) return "API Key faltante.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Dame una predicción de tendencia de negocios corta (una frase) para el próximo año.",
        });
        return response.text || "Tendencia no disponible.";
    } catch (e) {
        return "Error analizando tendencias.";
    }
}
