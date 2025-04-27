const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callOpenAI(userContent) {
  if (!userContent) {
    throw new Error('User content is required');
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview", // Make sure this is a valid model name
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userContent },
    ],
  });
  return completion;
}

// (async () => {
//   // Wrap in an async IIFE (Immediately Invoked Function Expression)
//   const result = await callOpenAI();
//   console.log(result.choices[0].message); // Add closing parenthesis here
// })();
// // Add another closing parenthesis for the IIFE
