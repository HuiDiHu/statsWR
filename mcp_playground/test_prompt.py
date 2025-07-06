"""
Setup Instructions:
    1) create .env file within mcp_playground
        ```
        OPENAI_API_KEY = <your openai api key>
        ```
    2) create virtual environment: "python -m venv .venv"
    3) activate .venv
    4) install dependencies: "pip install -r requirements.txt"
    5) run playground: "python test_prompt.py"
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'), timeout=60.0)

message_history = [
    {
        "role": "system",
        "content": [
            {
                "type": "input_text",
                "text": "You are a helpful chatbot that's very knowledgable about WildRift, a game made by Riot Games. Your name is 'Scuttle Crab'.",
            },
        ]
    }
]

def update_message_history(isUser:bool, message:str, msg_id:str = None):
    if not message:
        return

    message_obj = {
        "type": "message",
        "role": "user" if isUser else "assistant",
        "content": [
            {
                "type": "input_text" if isUser else "output_text",
                "text": message,
            },
        ]
    }

    if msg_id is not None:
        message_obj["id"] = msg_id

    message_history.append(message_obj)

def get_response_from_input(prompt:str) -> str:
    if not prompt:
        return

    update_message_history(True, prompt)

    resp = client.responses.create(
        model="o3-mini",
        tools=[
            {
                "type": "mcp",
                "server_label": "statsWR_mcp_server_test",
                "server_url": os.getenv('MCP_SERVER_URL'),
                "require_approval": "never",
            },
        ],
        input=message_history,
        timeout=120
    )

    if resp.output_text:
        update_message_history(False, resp.output_text, resp.output[-1].id)

        return resp.output_text
    return "ERROR: response output_text is empty/null"

model_response = ""
while not model_response.startswith("ERROR:"):
    print("----- USER -----")
    user_prompt = input("%: ")
    print("----------------")

    model_response = get_response_from_input(user_prompt)
    print("----- SCUTTLE CRAB -----")
    print(model_response)
    print("------------------------")
