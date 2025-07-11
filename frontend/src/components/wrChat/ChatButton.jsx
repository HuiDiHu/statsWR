import { forwardRef } from "react"
import clsx from 'clsx'

const ChatButton = forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "ghost":
        return "hover:bg-gray-700 hover:text-orange-500 text-gray-300"
      case "outline":
        return "border border-gray-600 bg-gray-800 hover:bg-gray-700 hover:text-orange-500 text-gray-300"
      default:
        return "bg-orange-500 text-white hover:bg-orange-600"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-9 rounded-md px-3 text-sm"
      case "lg":
        return "h-11 rounded-md px-8 text-base"
      default:
        return "h-10 px-4 py-2 text-sm"
    }
  }

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50",
        getVariantStyles(),
        getSizeStyles(),
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

ChatButton.displayName = "ChatButton"

export default ChatButton