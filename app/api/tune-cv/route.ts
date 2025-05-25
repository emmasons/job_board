export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import puppeteer from 'puppeteer';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function scrapeJobDescription(url: string): Promise<string> {
  let browser;
  try {
    console.log('Starting Puppeteer fetch for URL:', url);

    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://google.com',
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
      console.warn('Primary load failed, retrying with domcontentloaded...');
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    }

    const visibleText = await page.evaluate(() => {
      return document.body.innerText || '';
    });

    console.log('Extracted all text length:', visibleText.length);

    const sections = [
      'Responsibilities',
      'Requirements',
      'Job Description',
      'Full job description',
      'What You’ll Do',
      'What We’re Looking For',
      'About the Role'
    ];

    const matches = sections.map(keyword => {
      const regex = new RegExp(`${keyword}[^.]{0,300}(.{100,2000})`, 'i');
      const match = visibleText.match(regex)?.[1];
      console.log(`Keyword "${keyword}" match length:`, match ? match.length : 0);
      return match;
    }).filter(Boolean) as string[];

    const focusedText = matches.join('\n').trim();
    console.log('Focused text length:', focusedText.length);

    const finalText = focusedText.length > 100 ? focusedText : visibleText.trim();

    if (!finalText || finalText.length < 200) {
      throw new Error('Insufficient job description content scraped.');
    }

    console.log('Returning job description text, length:', finalText.length);
    return finalText;
  } catch (err) {
    console.error('Scraping error:', err);
    throw new Error('Failed to scrape job description.');
  } finally {
    if (browser) await browser.close();
  }
}

export async function POST(req: Request) {
  try {
    const { cvData, jobLink, jobTitle, jobDescription } = await req.json();

    if (!cvData || typeof cvData !== 'object') {
      return NextResponse.json({ success: false, error: 'Missing or invalid CV data' }, { status: 400 });
    }

    let finalJobDescription = '';

    if (jobDescription && jobDescription.length > 100) {
      // Manual fallback provided by user
      finalJobDescription = `${jobTitle ? jobTitle + '\n\n' : ''}${jobDescription}`.trim();
    } else if (jobLink && jobLink.startsWith('http')) {
      // Attempt to scrape
      try {
        finalJobDescription = await scrapeJobDescription(jobLink);
      } catch (e) {
        return NextResponse.json({
          success: false,
          tooShort: true,
          error: 'Failed to extract enough content from the job link. Please paste the job title and description manually.',
        });
      }
    } else {
      return NextResponse.json({ success: false, error: 'Invalid input. Please provide a valid job link or description.' }, { status: 400 });
    }

    const prompt = `
You are a professional CV writer. Your task is to take the following CV data and tailor it to the given job description.

Job Description:
${finalJobDescription}

CV Data (in JSON format):
${JSON.stringify(cvData, null, 2)}

Please enhance the CV by:
- Aligning skills and experiences with the job description.
- Change one experience role to match the job description.
- Use my workplace names not from the description.
- Improving the summary to reflect role relevance.
- Expanding each responsibility to be detailed and results-oriented (8-10 responsibilities per role).
- Prioritizing job-related skills and achievements.
- Maintaining the same field structure and names.

Return the updated CV JSON only. No additional text, no explanations.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional CV writer.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 3000,
      temperature: 0,
    });

    const rawResponse = completion.choices[0].message.content ?? '{}';

    let parsed;
    try {
      parsed = JSON.parse(rawResponse);
    } catch {
      const cleaned = rawResponse.replace(/```json|```/g, '').trim();
      try {
        parsed = JSON.parse(cleaned);
      } catch (err) {
        return NextResponse.json({ success: false, error: 'Failed to parse AI JSON response.' });
      }
    }

    return NextResponse.json({ success: true, tunedCV: parsed });
  } catch (error) {
    console.error('Error in /api/tune-cv:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
