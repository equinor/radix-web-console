import { useEffect, useState } from 'react'

export function useNow() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 250)

    return () => {
      clearInterval(interval)
    }
  })

  return now
}
