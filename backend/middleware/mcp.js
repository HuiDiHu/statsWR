const { StreamableHTTPClientTransport } = require('@modelcontextprotocol/sdk/client/streamableHttp.js')
const { experimental_createMCPClient } = require('ai')

const { BadRequestError, UnauthenticatedError } = require('../errors')

let mcpClient = null;
let mcpTools = null;
let lastRefresh = 0;
const REFRESH_INTERVAL = parseInt(process.env.MCP_CLIENT_REFRESH_INTERVAL || 300000);

const getMCPClientWithRefresh = async () => {
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

const cleanup = async () => {
    if (mcpClient) {
        try {
            await mcpClient.close();
        } catch (error) {
            console.error('Error closing MCP Client:', error);
        }
        mcpClient = null;
        mcpTools = null;
    }
};

const GetMcpClientAndToolsMiddleware = async (req, res, next) => {
    try {
        const { client, tools } = await getMCPClientWithRefresh();

        req.mcp = {}
        req.mcp.client = client;
        req.mcp.tools = tools;

        req.resetMCPClient = async () => {
            await cleanup();
        };
        
        next()
    } catch (error) {
        console.error('MCP Middleware Error:', error);
    
        await cleanup();
        
        req.mcp = null
        req.resetMCPClient = async () => {};
        
        next();
    }
}

module.exports = GetMcpClientAndToolsMiddleware