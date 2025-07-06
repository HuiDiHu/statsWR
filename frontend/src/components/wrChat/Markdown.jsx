import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export function Markdown({ children, className = "" }) {
  return (
    <div className={className}>
        <ReactMarkdown
            components={{
                // Headings
                h1: ({ children }) => <h1 className="text-xl font-bold mb-2 text-gray-100">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold mb-2 text-gray-100">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold mb-1 text-gray-100">{children}</h3>,

                // Paragraphs
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,

                // Lists
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-gray-200">{children}</li>,

                // Links
                a: ({ href, children }) => (
                <a
                    href={href}
                    className="text-orange-400 hover:text-orange-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
                ),

                // Inline code
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "")

                    if (!inline && match) {
                        // Code block
                        return (
                        <div className="my-2">
                            <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-md text-sm"
                            {...props}
                            >
                            {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        </div>
                        )
                    } else {
                        // Inline code
                        return (
                        <code className="bg-gray-800 text-orange-300 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                            {children}
                        </code>
                        )
                    }
                },

                // Blockquotes
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-orange-500 pl-4 my-2 text-gray-300 italic">{children}</blockquote>
                ),

                // Tables
                table: ({ children }) => (
                    <div className="overflow-x-auto my-2">
                        <table className="min-w-full border-collapse border border-gray-600">{children}</table>
                    </div>
                ),
                th: ({ children }) => (
                    <th className="border border-gray-600 bg-gray-800 px-3 py-2 text-left font-semibold text-gray-200">
                        {children}
                    </th>
                ),
                td: ({ children }) => <td className="border border-gray-600 px-3 py-2 text-gray-200">{children}</td>,

                // Horizontal rule
                hr: () => <hr className="border-gray-600 my-4" />,

                // Strong and emphasis
                strong: ({ children }) => <strong className="font-bold text-gray-100">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
            }}
            >
            {children}
        </ReactMarkdown>
    </div>
  )
}