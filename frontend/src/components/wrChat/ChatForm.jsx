import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { useChat } from "@ai-sdk/react"
import { ArrowUpIcon, User, Bot } from "lucide-react"

import 'src/style/wrChat/global.css'
import ChatButton from "./ChatButton"
import { ChatTooltip, ChatTooltipContent, ChatTooltipTrigger, ChatTooltipProvider } from "./ChatTooltip"
import AutoResizeTextarea from "./AutoResizeTextArea"
import Markdown from "./Markdown"
import Header from "./ui/Header"
import { LoadingResponse, RetrievingToolResult, ReadyState, ErrorResponseState } from "./ui/LoadingStates"

const ChatForm = ({ className, setLoginModal, setLogged, props }) => {
  const navigate = useNavigate()

  const scrollContainerRef = useRef(null)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const [isStreamingTool, setIsStreamingTool] = useState(false)
  const [chatId, setChatId] = useState(1)

  const { messages, setMessages, input, status, setInput, append } = useChat({
    api: `${import.meta.env.VITE_SERVER_URL}/api/v1/chat/response`,

    onFinish: (message) => {
      const result_ids = []
      message.parts.forEach((part) => {
        if (part.type !== 'tool-invocation') return
        const call = part.toolInvocation
        const callId = call.toolCallId

        if (call.state !== 'result' || call.result.isError === true) return
        result_ids.push(callId)
      })

      if (result_ids.length > 0) {
        const options = {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
          },
        }
        const message = { 
          role: "system",
          content: `You've just made tool invocation(s), here are the successful toolCallIds: ${result_ids.toString()}`,
        }
    
        void append(message, options)
      }
    },

    onError: (err) => {
      if (err.toString().includes("Authentication invalid")) {
        setMessages([])
        window.sessionStorage.removeItem('token'); window.sessionStorage.removeItem('username'); window.sessionStorage.removeItem('profile'); window.sessionStorage.removeItem('userID'); 
        setLoginModal(true); setLogged(false);
      }
    }
  })

  const autoScroll = () => {
    const el = scrollContainerRef.current
    if (el) {
      // push scroll to bottom
      el.scrollTop = el.scrollHeight
    }
  }

  useEffect(() => {
    if (!autoScrollEnabled) return
    const role = messages.length > 0 ? messages[messages.length - 1].role : null

    if (role == null) return
    if (role == 'assistant' && status !== 'streaming' && status !== 'ready') return

    autoScroll()
  }, [messages, status, autoScrollEnabled])

  useEffect(() => {
    if (messages.length === 0) return;
    if (status === 'streaming') {
      const lastMsg = messages[messages.length - 1]
      let containsTool = lastMsg.parts.some(part => part.type === 'tool-invocation')
      if (containsTool != isStreamingTool)
        containsTool ? setIsStreamingTool(true) : setIsStreamingTool(false)
    }
  }, [status, messages])

  const handleSubmit = (e) => {
    e.preventDefault()

    const options = {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
      },
    }
    const message = {
      content: input, 
      role: "user" 
    }

    void append(message, options)
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const loadingUIStates = () => {
    if (messages.length === 0) return;

    if (status === 'submitted' || messages[messages.length - 1].role === 'system') {
      return <LoadingResponse />
    } else if (status === 'ready') {
      isStreamingTool && setIsStreamingTool(false)
      return <ReadyState />
    } else if (status === 'error') {
      isStreamingTool && setIsStreamingTool(false)
      return <ErrorResponseState />
    } else if (isStreamingTool) {
      return <RetrievingToolResult />
    }
  }

  const messageList = (
    <div className="mb-4 mt-10 flex flex-col gap-4 grow max-h-[60vh]">
      {messages.map((message, index) => {
        if (message.role !== 'assistant' && message.role !== 'user') return;

        const isToolMsg = message.parts.some(p => p.type === 'tool-invocation');
        if (!isToolMsg) {
          return (<div
            key={index}
            className={clsx(
              "flex items-start gap-3 w-full lg:max-w-[80%]",
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
              <Markdown className={message.role === "user" ? "text-white" : "text-gray-200"} navigate={navigate}>{message.content}</Markdown>
            </div>
          </div>)
        }
      })}
      {loadingUIStates()}
    </div>
  )

  return (
    <div
      className={clsx(
        "mx-[5%] sm:mx-[10%] lg:mx-[20%] min-w-[60%] flex h-full min-h-full flex-col items-stretch",
        className,
      )}
      {...props}
    >
      <div
        ref={scrollContainerRef}
        className={`flex-1 ${ messages.length ? 'justify-start items-center' : 'content-center' } px-6`}
        style={{
          overflowY: "auto",
          scrollbarGutter: "stable",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
        onScroll={() => {
          const el = scrollContainerRef.current;
          // consider "at bottom" if within 5px
          const isAtBottom =
            Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 5
          setAutoScrollEnabled(isAtBottom)
        }}
        onMouseEnter={(e) => {
          e.target.style.scrollbarColor = "#6b7280 #374151"
        }}
        onMouseLeave={(e) => {
          e.target.style.scrollbarColor = "transparent transparent"
        }}
      >
        {messages.length ? messageList : <Header />}
      </div>
      <ChatTooltipProvider>
        <form
          onSubmit={handleSubmit}
          className="mx-6 mb-10 mt-5 flex items-center rounded-2xl border border-gray-600 bg-gray-800 px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500"
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

export default ChatForm