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

    const prompt = `Create a list of 3 achievements for a ${profession} based on the following experiences:\n\n` +
      `Experiences:\n${experiences}\n\n` +
      `Provide only the achievements in plain text with no extra commentary. Return each achievement on a new line without numbering or bullets. Write full, grammatically correct sentences.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional CV writer.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    let rawText = response.choices[0]?.message?.content?.trim() || '';

    // Ensure line breaks by splitting on sentence ends or existing newlines
    const sentences = rawText
      .split(/(?<=[.?!])\s+(?=[A-Z])|[\n\r]+/)
      .map(line => line.replace(/^[-•\d.]+/, '').trim())
      .filter(line => line.length > 0);

    const cleanedAchievements = sentences.join('\n');

    return NextResponse.json({ success: true, content: cleanedAchievements });
  } catch (error: any) {
    console.error('Error generating achievements:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Something went wrong.' },
      { status: 500 }
    );
  }
}
