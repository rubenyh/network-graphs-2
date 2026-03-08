'use client'
import React, { useState } from 'react'
import ForceGraph from '@/components/graphs'
import MasterControl from '@/components/MasterControl'
import AddUser from '@/components/AddUser'
import findShortestPath from '@/lib/path'
import { initialGraphData } from '@/lib/data/graphData'
import usePan from "@/hooks/usePan"
import useNodeSelection from '@/hooks/useNodeSelection'
import useContainerSize from "@/hooks/useContainerSize"

export default function Graph() {
  const [isOpenAddUser, setOpenAddUser] = useState(false)
  const [isOpenMasterControl, setOpenMasterControl] = useState(false)
  const [isActive, setActive] = useState(false)
  const [graphData, setGraphData] = useState(initialGraphData)
  const { offset, onMouseDown, onMouseMove, onMouseUp, center } = usePan()
  const { selected, handleNodeClick } = useNodeSelection()
  const { containerRef, dimensions } = useContainerSize<HTMLDivElement>()

  const path = React.useMemo(() => {
    if (selected.length < 2) return []
    return findShortestPath(graphData, selected[0], selected[1])
  }, [selected, graphData]) 


  return (
    
    <div className="text-black w-screen h-screen relative">
      
      <nav className="flex justify-between p-4 bg-transparent w-full fixed z-1">
        <img src="/menu.svg" alt="Menu"
        className="size-12 cursor-pointer hover:scale-110 transition"
        onClick={() => setOpenMasterControl(true)} 
        />
        <button onClick={center} className="bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition">Center</button>
        <img src="/add.svg" alt="Add" onClick={() => setOpenAddUser(true)} className="size-12 cursor-pointer hover:scale-110 transition"/>
      </nav>

      <AddUser isOpen={isOpenAddUser} onClose={() => setOpenAddUser(false)} setGraphData={setGraphData} />
      <MasterControl isOpen={isOpenMasterControl} onClose={() => setOpenMasterControl(false)} graphData={graphData} setGraphData={setGraphData}/>

      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden relative cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <ForceGraph 
          data={graphData} 
          width={dimensions.width} 
          height={dimensions.height} 
          offset={offset} 
          onNodeClick={handleNodeClick}
          showPath={path}
          isActive = {isActive}
        />
      </div>
      
      {isActive ? (
        <button
          onClick={() => setActive(false)}
          className="fixed bottom-3 right-3 md:bottom-6 md:right-6 bg-red-800 text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition shadow-lg z-10"
        >
          X
        </button>
      ) : (
        <button
          onClick={() => setActive(true)}
          className="fixed bottom-3 right-3 md:bottom-6 md:right-6 bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition shadow-lg z-10"
        >
          Track
        </button>
      )}

    </div>
  )
}
