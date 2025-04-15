import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const prompt = `Generate SEO-friendly YouTube tags (separated by commas) for the following video title:\n"${title}"`;

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const tags = chat.choices[0].message.content;
    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
