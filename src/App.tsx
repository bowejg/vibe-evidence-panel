import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Counter App</h1>
        <div className="text-6xl font-bold text-blue-600">{count}</div>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => setCount(count - 1)} variant="outline">
            Decrement
          </Button>
          <Button onClick={() => setCount(0)} variant="secondary">
            Reset
          </Button>
          <Button onClick={() => setCount(count + 1)}>Increment</Button>
        </div>
      </div>
    </div>
  )
}

export default App
