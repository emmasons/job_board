import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const chat = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
        You are a helpful immigration assistant helping users assess visa eligibility.
        Respond in clean HTML using Tailwind CSS classes. Use:

        - <h3 class="text-lg font-semibold text-gray-800"> for headings
        - <ul class="list-disc pl-5 space-y-1"> and <li> for bullet points
        - <p class="text-gray-700"> for paragraphs
        Wrap the entire content in a <div class='space-y-4'>...</div>.
        Avoid markdown. Use only well-formatted HTML. dont include anything extra like the word html with backticks
        `,
        },

      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return NextResponse.json({ response: chat.choices[0].message.content });
}
