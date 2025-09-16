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
              I will give you a piece of code. 
              Your job is to explain what it does as if you're telling 
              a fun story to a 10-year-old kid. Avoid technical jargon. 
              Use simple words, metaphors, and storytelling 
              (like characters, actions, or adventures) to explain 
              each part of the code. Keep it engaging and easy to imagine. 

              Here is the code:
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