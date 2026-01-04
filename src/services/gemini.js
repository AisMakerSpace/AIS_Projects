const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

export const generateMathQuestion = async (topic, difficulty = "Intermediate") => {
  try {
    // Debug logging
    console.log("Generating question for:", topic, difficulty);
    console.log("API Key present:", !!API_KEY);
    if (API_KEY) console.log("API Key length:", API_KEY.length);

    if (!API_KEY) {
      console.error("Missing VITE_GEMINI_API_KEY. Please check your .env file and RESTART the dev server.");
      throw new Error("Missing VITE_GEMINI_API_KEY. Please check .env and restart server.");
    }

    const prompt = `
      You are an expert Math Olympiad coach. 
      Generate a unique, challenging Math Olympiad problem for the topic: "${topic}".
      The difficulty level should be: ${difficulty}.
      
      Also, provide an "Intuitive Idea" (a hint or concept breakdown) to help solve it.
      
      IMPORTANT: Check if this type of problem has appeared in actual previous Math Olympiads (like IMO, USAMO, RMO, etc.). 
      If it's very similar to a known past problem, set "isPastOlympiad" to true and "olympiadSource" to the name/year (e.g., "IMO 2005").
      If it's original or a standard type, set it to false.

      FORMATTING INSTRUCTIONS:
      - Use LaTeX for ALL mathematical expressions.
      - Wrap inline math in single dollar signs, e.g., $x^2$.
      - Wrap block equations in double dollar signs, e.g., $$ \int f(x) dx $$.
      - Do NOT use plain text for math (e.g., avoid "x^2", use "$x^2$").

      Return the response in valid JSON format with the following structure:
      {
        "question": "The problem text...",
        "answer": "The final answer",
        "explanation": "Detailed step-by-step solution",
        "intuitiveIdea": "Key concept or hint to start",
        "isPastOlympiad": boolean,
        "olympiadSource": "Name of Olympiad (or null)"
      }
      ensure the JSON is pure and not wrapped in markdown code blocks.
    `;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error details:", response.status, errorText);
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Invalid response structure from Gemini API");
    }

    const text = data.candidates[0].content.parts[0].text;

    // Clean up potential markdown formatting
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error generating question:", error);
    throw error;
  }
};
