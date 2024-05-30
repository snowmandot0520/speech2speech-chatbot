import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const { message, language } = await request.json();
        // Add a system message to instruct the model to focus on providing SQL queries
        const newMessages = [
            {role: 'system', content: `You have to answer in ${language}`},
            message
        ];

        // Ask OpenAI for a streaming chat completion given the prompt
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: newMessages,
        });
        const response = {
            answer: chatCompletion?.choices[0].message.content?.trim(),
        };

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.error();
    }
    

    // // Convert the response into a friendly text-stream
    // const stream = OpenAIStream(response);
    // // Respond with the stream
    // return new StreamingTextResponse(stream);
}
