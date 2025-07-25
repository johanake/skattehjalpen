import { Agent, run } from "@openai/agents";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { env } from "../config/env.js";
import { DeductionEntry, DeductionResult } from "../models/Tax.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class LLMService {
  async askOpenAi(question: string) {
    const vectorDbResult = "";

    const agent = new Agent({
      name: "Svensk export inom skattefrågor och deklaration",
      instructions:
        "Du är en skatterådgivare vars mål är att generera så många avdrag som är möjligt för privatpersoner i Sverige.",
      model: "gpt-4o-mini",
    });

    const result = await run(agent, question, { context: vectorDbResult });
    return result;
  }

  async analyseTaxDeclaration(
    taxDeclarationJson: string,
    declarationYear: number
  ): Promise<DeductionResult> {
    console.log("tax declaration", taxDeclarationJson);

    // Load Skatteverket deduction rules
    let skatteverketContext = "";
    try {
      // Try multiple possible paths for the Skatteverket summary file
      const possiblePaths = [
        join(process.cwd(), "skatteverket_summary.md"), // Backend directory (Railway production)
        join(process.cwd(), "..", "skatteverket_summary.md"), // Root directory (local dev)
        "/skatteverket_summary.md", // Absolute root path
        join(__dirname, "..", "..", "skatteverket_summary.md"), // Relative to built file
      ];

      for (const path of possiblePaths) {
        try {
          skatteverketContext = readFileSync(path, "utf-8");
          console.log(`Successfully loaded Skatteverket context from: ${path}`);
          break;
        } catch {
          // Continue to next path
        }
      }

      if (!skatteverketContext) {
        console.warn(
          "Could not find skatteverket_summary.md in any expected location"
        );
      }
    } catch (error) {
      console.warn(
        "Could not load Skatteverket summary, proceeding without context:",
        error
      );
    }

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            deductions: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  title: { type: SchemaType.STRING },
                  amount: { type: SchemaType.STRING },
                  motivation: { type: SchemaType.STRING },
                  calculation: { type: SchemaType.STRING },
                  where: { type: SchemaType.STRING },
                  potentialSaving: { type: SchemaType.STRING },
                },
                required: [
                  "title",
                  "amount",
                  "motivation",
                  "calculation",
                  "where",
                  "potentialSaving",
                ],
              },
            },
          },
          required: ["deductions"],
        },
      },
    });

    const prompt =
      "Du är en skatterådgivare i Sverige vars mål är att generera så många avdrag som är möjligt för " +
      "privatpersoner i Sverige. Just nu ska du göra en analys för inkomståret " +
      declarationYear +
      "Använd följande officiella information från Skatteverket för att säkerställa korrekt rådgivning:\n\n" +
      "=== SKATTEVERKETS AVDRAGSREGLER ===\n" +
      skatteverketContext +
      "\n=== SLUT PÅ SKATTEVERKETS REGLER ===\n\n" +
      "I ditt svar ska det framgå hur mycket avdrag personen i fråga får göra, samt var i sin inkomstdeklaration till " +
      "Skatteverket dom ska göra avdragen. Var tydlig men kort i dina svar. Ditt mål är att hitta så många avdrag som möjligt " +
      "till användaren, men endast de som är lagligt korrekta enligt Skatteverkets regler ovan. " +
      "Returnera ditt svar som ett JSON-objekt med en 'deductions' array som innehåller DeductionEntry objekt. " +
      "Varje DeductionEntry ska ha: title (string), amount (string), potentialSaving (string), motivation (string), calculation (string), where (string). " +
      "Ett exempel på motivation kan vara: Du har ett bolån och betalt 100'000 kronor. Amount bör då vara 100'000kr och potentialSaving bör vara 30'000 kronor då avdraget gäller på 30% av beloppen man betalt i ränta." +
      "Här är ett formulär användaren har svarat på, i JSON-format som du ska analysera: " +
      taxDeclarationJson;

    try {
      const result = await model.generateContent(prompt);
      console.log(
        "Token count: ",
        result.response.usageMetadata?.totalTokenCount
      );
      const response = await result.response;
      const jsonString = response.text();

      // Parse the structured JSON response
      const structuredResponse = JSON.parse(jsonString);
      const deducationEntries: DeductionEntry[] =
        structuredResponse.deductions || [];

      console.log("Structured content:", deducationEntries);
      const totalDeductions = deducationEntries.reduce((sum, entry) => {
        const amount = parseFloat(entry.amount.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

      const returnResult: DeductionResult = {
        deductions: deducationEntries,
        totalDeductions,
      };
      return returnResult;
    } catch (error) {
      console.error("Error generating structured content:", error);
      throw new Error("Error generating structured content");
    }
  }
}
