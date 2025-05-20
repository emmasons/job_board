// app/api/generate_skills/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set this in your .env file
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const profession = (body.profession || '').trim();
    const experiences = (body.experiences || '').trim();

    if (!profession || !experiences) {
      return NextResponse.json(
        { success: false, error: 'Profession and experiences fields cannot be empty.' },
        { status: 400 }
      );
    }

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional CV writer. Generate a list of key skills relevant to a given profession and based on provided experience descriptions. Skills should be concise, industry-relevant, and focus on both technical and soft skills. Only list the skills in plain text with no extra text, no hyphens or numbers, and no formatting.',
        },
        {
          role: 'user',
          content: `Generate a list of 9 key skills for a ${profession}. The skills should be based on these experiences:\n${experiences}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const rawSkills = chatCompletion.choices[0]?.message?.content?.trim() || '';

    const cleanedSkills = rawSkills
      .split('\n')
      .map(line => line.replace(/^[-•\d.]*\s*/, '').trim())
      .filter(Boolean)
      .join('\n');

    return NextResponse.json({ success: true, content: cleanedSkills });
  } catch (error: any) {
    console.error('Error generating skills:', error);
    return NextResponse.json({ success: false, error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}
