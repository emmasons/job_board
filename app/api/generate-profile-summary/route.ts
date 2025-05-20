// app/api/generate-profile-summary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, 
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const profession = (data.profession || '').trim();
    const experiences = (data.experiences || '').trim();

    if (!profession || !experiences) {
      return NextResponse.json(
        { success: false, error: 'Profession and experiences fields cannot be empty.' },
        { status: 400 }
      );
    }

    const prompt = `Create a concise and professional profile summary for a ${profession} based on the following experiences:\n\n` +
      `Experiences:\n${experiences}\n\n` +
      `The summary should be naturally flowing and no more than 90 words, written in full sentences without cutting off mid-sentence. ` +
      `Provide only the summary with no extra words or formatting.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional CV writer.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 120,
      temperature: 0.7,
    });

    const profileSummary = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ success: true, content: profileSummary });
  } catch (error: any) {
    console.error('Error generating profile summary:', error);
    return NextResponse.json({ success: false, error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}
