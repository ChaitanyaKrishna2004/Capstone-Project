export async function callGeminiAPI(prompt) {
  const apiKey = "YOUR_API_KEY_HERE"; // REPLACE WITH YOUR ACTUAL API KEY
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`API call failed: ${response.status}`);
    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Sorry, I couldn't come up with a description right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! Something went wrong while contacting the AI.";
  }
}
