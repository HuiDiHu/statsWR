import clsx from 'clsx'
import { useChat } from "@ai-sdk/react"
import { ArrowUpIcon, User, Bot } from "lucide-react"
import { ChatButton } from "./ChatButton"
import { ChatTooltip, ChatTooltipContent, ChatTooltipTrigger, ChatTooltipProvider } from "./ChatTooltip"
import { AutoResizeTextarea } from "./AutoResizeTextArea"
import { Markdown } from "./Markdown"

export function ChatForm({ className, ...props }) {
  const { messages, input, setInput, append } = useChat({
    api: `${import.meta.env.VITE_SERVER_URL}/api/v1/chat`,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    void append({ content: input, role: "user" })
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const header = (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
      <h1 className="text-2xl font-semibold leading-none tracking-tight text-white whitespace-pre">
        <span>stats</span>
        <span className='bg-gradient-to-r from-orange-500 to-red-700 text-transparent bg-clip-text'>
            {"WR "}
        </span>
        Chat Assistant
    </h1>
      <p className="text-gray-400 text-sm">
        Powered by <span className="text-orange-400 font-medium">OpenAI</span> and the{" "}
        <span className="text-orange-400 font-medium">Vercel AI SDK</span>
      </p>
      <p className="text-gray-400 text-sm">Start a conversation by typing your message below.</p>
    </header>
  )

  const messageList = (
    <div className="my-4 flex h-fit min-h-full flex-col gap-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-start gap-3 max-w-[80%]",
            message.role === "user" ? "self-end flex-row-reverse" : "self-start",
          )}
        >
          {/* Profile Circle */}
          <div
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              message.role === "user" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300",
            )}
          >
            {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
          </div>

          {/* Message Content */}
          <div
            className={clsx(
              "rounded-xl px-3 py-2 text-sm",
              message.role === "user" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-200",
            )}
          >
            <Markdown className={message.role === "user" ? "text-white" : "text-gray-200"}>{message.content}</Markdown>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={clsx(
        "mx-auto min-w-[60%] flex h-full min-h-full flex-col items-stretch",
        className,
      )}
      {...props}
    >
      <div className="w-full flex-1 content-center overflow-y-auto px-6">{messages.length ? messageList : header}</div>
      <ChatTooltipProvider>
        <form
          onSubmit={handleSubmit}
          className="relative mx-6 mb-10 flex items-center rounded-2xl border border-gray-600 bg-gray-800 px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(v) => setInput(v)}
            value={input}
            placeholder="Enter a message"
            className="flex-1 bg-transparent focus:outline-none placeholder:text-gray-500 text-gray-200 my-1"
          />
          <ChatTooltip>
            <ChatTooltipTrigger asChild>
              <ChatButton
                variant="ghost"
                size="sm"
                className="absolute bottom-1 right-1 w-6 h-6 rounded-full p-0 hover:bg-gray-700 text-gray-400 hover:text-white"
              >
                <ArrowUpIcon size={16} />
              </ChatButton>
            </ChatTooltipTrigger>
            <ChatTooltipContent sideOffset={12}>Submit</ChatTooltipContent>
          </ChatTooltip>
        </form>
      </ChatTooltipProvider>
    </div>
  )
}