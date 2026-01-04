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
      - IMPORTANT: This is a JSON response. You MUST escape all backslashes in LaTeX commands. For example, use "\\frac" instead of "\frac" and "\\sqrt" instead of "\sqrt".
      - Do NOT use plain text for math.

      Return the response in valid JSON format with the following structure:
      {
        "question": "The problem text...",
        "answer": "The final answer",
        "explanation": "Detailed step-by-step solution",
        "intuitiveIdea": "Key concept or hint to start",
        "isPastOlympiad": boolean,
        "olympiadSource": "Name of Olympiad (or null)"
      }
      Strictly return ONLY the JSON object. No markdown wrapping.
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
    console.log("Raw text from Gemini:", text);

    // Clean up potential markdown formatting and hidden characters
    let jsonString = text.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.substring(7);
    }
    if (jsonString.startsWith('```')) {
      jsonString = jsonString.substring(3);
    }
    if (jsonString.endsWith('```')) {
      jsonString = jsonString.substring(0, jsonString.length - 3);
    }
    jsonString = jsonString.trim();

    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Standard JSON parse failed, attempting fallback cleanup...", parseError);

      // Fallback: If AI still failed to escape backslashes, try to escape them manually for common LaTeX commands
      // This is risky but helps as a last resort
      const cleaned = jsonString
        .replace(/\\(?=[^"\\\/bfnrtu])/g, '\\\\') // Escape backslashes that aren't already part of a valid escape sequence
        .replace(/\n/g, '\\n') // Escape newlines within strings
        .replace(/\r/g, '\\r');

      try {
        return JSON.parse(cleaned);
      } catch (secondError) {
        console.error("Critical: Failed to parse Gemini response even with fallback.", secondError);
        throw new Error("Could not parse AI response as valid JSON.");
      }
    }
  } catch (error) {
    console.error("Error generating question:", error);
    throw error;
  }
};
