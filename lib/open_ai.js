const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

async function callOpenAI() {
	const completion = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{ role: "system", content: "You are a helpful assistant." },
			{
				role: "user",
				content: "Write a haiku about recursion in programming.",
			},
		],
	});
	return completion;
}

(async () => {
	// Wrap in an async IIFE (Immediately Invoked Function Expression)
	const result = await callOpenAI();
	console.log(result.choices[0].message); // Add closing parenthesis here
})();
// Add another closing parenthesis for the IIFE
