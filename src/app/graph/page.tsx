'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import ForceGraph from '../../components/graphs'
import MasterControl from './MasterControl'
import AddUser from './AddUser'

type Node = { id: string; group: number }
type Link = { source: string; target: string; value: number }

export default function Graph() {
  const [isOpen, setOpen] = useState(false)
  const [isOpen2, setOpen2] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    isDragging.current = true
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
  }
  function onMouseUp() { isDragging.current = false }
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current) return
    setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y })
  }
  function Center() { setOffset({ x: 0, y: 0 }) }

  const [graphData, setGraphData] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [
      { id: "Ruben", group: 1 },
      { id: "Cedric", group: 1 },
      { id: "Hiram", group: 1 },
      { id: "Chemmah", group: 1 },
      { id: "Enzo", group: 1 },
      { id: "Alice", group: 2 },
      { id: "Bob", group: 2 },
      { id: "Charlie", group: 2 },
      { id: "Diana", group: 2 },
      { id: "Eve", group: 2 },
      { id: "Frank", group: 3 },
      { id: "Grace", group: 3 },
      { id: "Heidi", group: 3 },
      { id: "Ivan", group: 3 },
      { id: "Judy", group: 3 },
      { id: "Mallory", group: 4 },
      { id: "Niaj", group: 4 },
      { id: "Olivia", group: 4 },
      { id: "Peggy", group: 4 },
      { id: "Sybil", group: 4 },
      { id: "Trent", group: 5 },
      { id: "Victor", group: 5 },
      { id: "Walter", group: 5 },
      { id: "Yasmine", group: 5 },
      { id: "Zara", group: 5 },
    ],
links: [
  { source: "Ruben", target: "Charlie", value: 1 },
  { source: "Cedric", target: "Enzo", value: 1 },
  { source: "Hiram", target: "Victor", value: 1 },
  { source: "Chemmah", target: "Grace", value: 1 },
  { source: "Enzo", target: "Peggy", value: 1 },
  { source: "Alice", target: "Ruben", value: 1 },
  { source: "Bob", target: "Frank", value: 1 },
  { source: "Diana", target: "Mallory", value: 1 },
  { source: "Eve", target: "Niaj", value: 1 },
  { source: "Frank", target: "Alice", value: 1 },
  { source: "Grace", target: "Ivan", value: 1 },
  { source: "Mallory", target: "Trent", value: 1 },
  { source: "Niaj", target: "Walter", value: 1 },
  { source: "Olivia", target: "Zara", value: 1 },
  { source: "Sybil", target: "Olivia", value: 1 },
  { source: "Trent", target: "Judy", value: 1 },
  { source: "Victor", target: "Cedric", value: 1 },
  { source: "Chemmah", target: "Cedric", value: 1 },
  { source: "Walter", target: "Sybil", value: 1 },
  { source: "Zara", target: "Hiram", value: 1 },
  { source: "Ruben", target: "Trent", value: 1 },
  { source: "Bob", target: "Enzo", value: 1 },
  { source: "Charlie", target: "Mallory", value: 1 },
  { source: "Grace", target: "Yasmine", value: 1 },
  { source: "Ivan", target: "Victor", value: 1 },
  { source: "Heidi", target: "Olivia", value: 1 },
  { source: "Eve", target: "Sybil", value: 1 }
]
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    
    <div className="text-black w-screen h-screen relative">
      
      <nav className="flex justify-between p-4 bg-transparent w-full fixed z-1">
        <img src="/menu.svg" alt="Menu"
        className="size-12 cursor-pointer hover:scale-110 transition"
        onClick={() => setOpen2(true)} 
        />
        <button onClick={Center} className="bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition">Center</button>
        <img src="/add.svg" alt="Add" onClick={() => setOpen(true)} className="size-12 cursor-pointer hover:scale-110 transition"/>
      </nav>

      <AddUser isOpen={isOpen} onClose={() => setOpen(false)} setGraphData={setGraphData} />
      <MasterControl isOpen={isOpen2} onClose={() => setOpen2(false)} graphData={graphData} setGraphData={setGraphData}/>
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden relative cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <ForceGraph data={graphData} width={dimensions.width} height={dimensions.height}   offset={offset} />
      </div>
    </div>
  )
}
