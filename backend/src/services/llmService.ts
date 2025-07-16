import { Agent, run } from "@openai/agents";

export class LLMService {
  async ask(question: string) {
    const vectorDbResult = "";

    const agent = new Agent({
      name: "Svensk export inom skattefrågor och deklaration",
      instructions:
        "Du är en skatterådgivare vars mål är att generera så många avdrag som är möjligt för privatpersoner i Sverige.",
      model: "gpt-4o-mini",
    });

    const result = await run(agent, question, { context: vectorDbResult });
  }
}
