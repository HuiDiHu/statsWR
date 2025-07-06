import { createContext, useContext, useState } from "react"
import clsx from 'clsx'

const ChatTooltipContext = createContext({})

export function ChatTooltipProvider({ children, delayDuration = 700 }) {
  return <ChatTooltipContext.Provider value={{ delayDuration }}>{children}</ChatTooltipContext.Provider>
}

export function ChatTooltip({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <ChatTooltipContext.Provider value={{ open, setOpen }}>{children}</ChatTooltipContext.Provider>
    </div>
  )
}

export function ChatTooltipTrigger({ children, asChild, ...props }) {
  const { setOpen } = useContext(ChatTooltipContext)

  const handleMouseEnter = () => setOpen(true)
  const handleMouseLeave = () => setOpen(false)

  if (asChild) {
    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        {children}
      </div>
    )
  }

  return (
    <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      {children}
    </button>
  )
}

export function ChatTooltipContent({ children, className, sideOffset = 4, ...props }) {
  const { open } = useContext(ChatTooltipContext)

  if (!open) return null

  return (
    <div
      className={clsx(
        "absolute z-50 overflow-hidden rounded-md border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-gray-200 shadow-md animate-in fade-in-0 zoom-in-95",
        "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        className,
      )}
      style={{ marginBottom: sideOffset }}
      {...props}
    >
      {children}
    </div>
  )
}
