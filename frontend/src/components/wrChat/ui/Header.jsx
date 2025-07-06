import React from 'react'

const Header = () => {
    return (
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
}

export default Header