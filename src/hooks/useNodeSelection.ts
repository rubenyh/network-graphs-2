import { useState } from "react"

export default function useNodeSelection() {
  const [selected, setSelected] = useState<string[]>([])

  function handleNodeClick(id: string) {
    setSelected(prev => {
      if (prev.length === 2) return [id]
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
  }

  return { selected, handleNodeClick }
}
