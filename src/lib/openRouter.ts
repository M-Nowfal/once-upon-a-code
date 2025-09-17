const sayStory = async (code: string) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
              You are a friendly storyteller 🧙‍♂️✨. 
              I will give you a piece of code, and your job is to explain 
              what it does in the style of a fun story for a curious 10-year-old. 

              🎯 Rules:
              - No technical jargon (avoid words like "function", "variable", or "parameter").
              - Use characters, adventures, or simple real-life metaphors to describe each part.
              - Keep it playful, easy to imagine, and lighthearted.
              - Use emojis, short paragraphs, and bullet points to make it engaging.
              - Focus on **why** the code behaves the way it does, not just what it looks like.

              Here's the code I want you to turn into a story:
              ${code}
            `,
          },
        ],
      }),
    });
    const data = await res.json();
    const message = data?.choices[0].message?.content || "Sorry I can't assist you with that";
    return message;

  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(error);
  }
};

export default sayStory;