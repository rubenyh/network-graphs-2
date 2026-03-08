import { useEffect, useRef, useState } from "react"

export default function useContainerSize<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return { containerRef, dimensions }
}
