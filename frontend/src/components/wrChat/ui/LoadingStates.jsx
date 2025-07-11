

export function LoadingResponse() {
  return (
    <div className='gap-3 bg-orange-400 animate-pulse rounded-lg text-center text-black font-semibold'>
        Loading Response...
    </div>
  )
}

export function RetrievingToolResult() {
    return (
        <div className='gap-3 bg-blue-400 animate-pulse rounded-lg text-center text-black font-semibold'>
            Retrieving Tool Result...
        </div>
    )
}

export function ReadyState() {
    return (
        <div className='gap-3 bg-green-400 rounded-lg text-center text-black font-semibold'>
            Response is ready!
        </div>
    )
}

export function ErrorResponseState() {
    return (
        <div className='gap-3 bg-red-400 rounded-lg text-center text-black font-semibold'>
            Response Error sadge
        </div>
    )
}