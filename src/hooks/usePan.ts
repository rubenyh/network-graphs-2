import { useRef, useState } from "react"

export default function usePan() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const dragStart = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    isDragging.current = true
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
  }

  function onMouseUp() {
    isDragging.current = false
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current) return
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    })
  }

  function center() {
    setOffset({ x: 0, y: 0 })
  }

  return { offset, onMouseDown, onMouseMove, onMouseUp, center }
}
