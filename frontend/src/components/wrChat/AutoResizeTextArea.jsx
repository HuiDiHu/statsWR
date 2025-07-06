import { useRef, useEffect } from "react"
import clsx from 'clsx'

const AutoResizeTextarea = ({ className, value, onChange, ...props }) => {
  const textareaRef = useRef(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    resizeTextarea()
  }, [value])

  return (
    <textarea
      {...props}
      value={value}
      ref={textareaRef}
      rows={1}
      onChange={(e) => {
        onChange(e.target.value)
        resizeTextarea()
      }}
      className={clsx("resize-none min-h-4 max-h-80 border-none outline-none bg-transparent", className)}
    />
  )
}

export default AutoResizeTextarea