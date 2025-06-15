// app/api/generate-cover-letterbody/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const job_title = (data.job_title || '').trim();
    const company_name = (data.company_name || '').trim();
    const job_applied = (data.job_applied || '').trim();
    const full_name = (data.full_name || '').trim();
    const hiring_manager_name = (data.hiring_manager_name || '').trim();

    if (!job_title || !job_applied) {
      return NextResponse.json(
        { success: false, error: 'Job title and job applied fields cannot be empty.' },
        { status: 400 }
      );
    }

    // Construct greeting and personalization
    const greeting_line = hiring_manager_name
      ? `Dear ${hiring_manager_name},`
      : 'To whom it may concern,';

    const personalization = full_name
      ? `My name is ${full_name}, and I am excited to apply for the ${job_applied} role.`
      : `I am excited to apply for the ${job_applied} role.`;

    const company_context = company_name ? `at ${company_name}` : '';

    const prompt = `${greeting_line}\n\n` +
      `${personalization} I am passionate about contributing to your organization ${company_context}. ` +
      `Please create a compelling cover letter for this context.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional cover letter writer. Generate a concise and professional cover letter body. ' +
            'The tone should be formal and personalized when provided details about the applicant and company. ' +
            'Only return the body of the letter and closing lines, with no headers.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const coverLetterBody = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ success: true, content: coverLetterBody });
  } catch (error: any) {
    console.error('Error generating cover letter body:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Something went wrong.' },
      { status: 500 }
    );
  }
}
