import { GoogleGenerativeAI } from "@google/generative-ai";
//import { Request, Response } from 'express';
import type { Request } from 'express';
import type { Response } from 'express';
import { config } from 'dotenv';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
 
export async function handleCodeCompletion(req: Request, res: Response) {
    console.log("Request received");
    console.log(req);

    try {
        const { prefix, suffix } = req.body; // Code context from frontend
 
        // Basic prompt structure - refine this
        const prompt = `Given the code context, provide a code completion suggestion.
        Prefix:
        \`\`\`
        ${prefix}
        \`\`\`
        Suffix:
        \`\`\`
        ${suffix}
        \`\`\`
        Suggestion:`;
 
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("RESPONSE");
        console.log(text);
        res.json({ suggestions: [{ label: text.trim(), type: "variable" }] }); // Format for CodeMirror
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to get suggestions" });
    }
}