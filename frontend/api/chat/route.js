import { experimental_createMCPClient, streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';

let mcpClient = null;
let mcpTools = null;
let lastRefresh = 0;
const REFRESH_INTERVAL = parseInt(process.env.MCP_CLIENT_REFRESH_INTERVAL || 300000);

async function getMCPClientWithRefresh() {
  const now = Date.now();
  
  if (!mcpClient || (now - lastRefresh) > REFRESH_INTERVAL) {
    // Close existing client if it exists
    if (mcpClient) {
      await cleanup()
    }
    
    const transport = new StreamableHTTPClientTransport(
      new URL(process.env.MCP_SERVER_URL)
    );
    
    mcpClient = await experimental_createMCPClient({
      transport,
    });
    
    mcpTools = await mcpClient.tools();
    lastRefresh = now;
  }
  
  return { client: mcpClient, tools: mcpTools };
}

export async function POST(req) {
  const { messages } = await req.json()

  try {
    const { tools } = await getMCPClientWithRefresh();
    
    const result = streamText({
      model: openai("o3-mini"),
      system:
        "You are a helpful chatbot that's very knowledgable about WildRift, a game made by Riot Games. Your name is 'Scuttle Crab'. You can use markdown formatting in your responses including **bold text**, *italic text*, `inline code`, code blocks with ```language, lists, links, and other markdown features to make your responses more readable and well-formatted.",
      messages,
      tools,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('MCP Error:', error);
    
    // Reset client on error
    mcpClient = null;
    mcpTools = null;
    
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function cleanup() {
  if (mcpClient) {
    await mcpClient.close();
    mcpClient = null;
    mcpTools = null;
  }
}