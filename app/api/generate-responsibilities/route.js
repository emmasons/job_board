// app/api/generate-responsibilities/route.js
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const role = body.role;

    if (!role || role.trim() === '') {
      return new Response(JSON.stringify({ success: false, error: 'Role is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional CV writer. Only list the responsibilities in plain text with no extra text, no hyphens, and no formatting. Each responsibility should be a single sentence with around 15–20 words.',
        },
        {
          role: 'user',
          content: `List 7 key responsibilities for a ${role} without adding introductory text, hyphens, or explanations.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content.trim();
    const cleaned = content
      .split('\n')
      .map(line => line.replace(/^[-•\d.]+\s*/, '').trim())
      .filter(line => line.length > 0)
      .join('\n');

    return new Response(JSON.stringify({ success: true, content: cleaned }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('OpenAI Error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Failed to generate responsibilities' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
