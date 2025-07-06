const { streamText, smoothStream } = require('ai')
const { openai } = require('@ai-sdk/openai')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const test_chat = async (req, res) => {

    return res.status(StatusCodes.OK).json({
        status: "SUCCESS",
        message: "Successfully connected to test_chat route controller"
    })
}

const get_response = async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }

    try {
        const result = streamText({
            apiKey: process.env.OPENAI_API_KEY,
            model: openai("o3-mini"),
            system: "You are a helpful chatbot that's very knowledgable about WildRift, a game made by Riot Games. Your name is 'Scuttle Crab'. You can use markdown formatting in your responses including **bold text**, *italic text*, `inline code`, code blocks with ```language, lists, links, and other markdown features to make your responses more readable and well-formatted (except for images).",
            messages,
            tools: req.mcp?.tools || [],
            experimental_transform: smoothStream({
                delayInMs: 20, // default 10
                chunking: 'word', // default word
            }),
            onError({ error }) {
                console.error("!!! streamText error:", error);
            },
        })

        result.pipeDataStreamToResponse(res, {
            getErrorMessage: (error) => {
                console.error("!!! piped error:", error);
                return error instanceof Error
                ? error.message
                : String(error);
            },
        });
    } catch (error) {
        console.error('Chat API Error:', error.message);

        await req.resetMCPClient();

        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = {
    test_chat,
    get_response
}