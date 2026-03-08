'use client'
import React, { useState } from 'react'
import ForceGraph from '@/components/graphs'
import MasterControl from '@/components/control/MasterControl'
import AddUser from '@/components/control/AddUser'
import findShortestPath from '@/lib/path'
import { initialGraphData } from '@/lib/data/graphData'
import usePan from "@/hooks/usePan"
import useNodeSelection from '@/hooks/useNodeSelection'
import useContainerSize from "@/hooks/useContainerSize"
import Navbar from '@/components/ui/Navbar'
import TrackButton from '@/components/TrackButton'
import StartModal from '@/components/ui/StartModal'

export default function Graph() {
  const [isOpenAddUser, setOpenAddUser] = useState(false)
  const [isOpenMasterControl, setOpenMasterControl] = useState(false)
  const [isActive, setActive] = useState(false)
  const [graphData, setGraphData] = useState(initialGraphData)
  const { offset, onMouseDown, onMouseMove, onMouseUp, center } = usePan()
  const { selected, handleNodeClick } = useNodeSelection()
  const { containerRef, dimensions } = useContainerSize<HTMLDivElement>()
  const [isStart, setStart] = useState(true);
  
  const path = React.useMemo(() => {
    if (selected.length < 2) return []
    return findShortestPath(graphData, selected[0], selected[1])
  }, [selected, graphData]) 


  return (
    <>
    {isStart && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <StartModal onClose={() => setStart(false)} />
      </div>
    )}
    
    <div className="text-black w-screen h-screen relative">

      <Navbar onClickMasterControl={() => setOpenMasterControl(true)} onClickCenter={center} onClickOpenAddUser={() => setOpenAddUser(true)}/>

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
      
      <TrackButton isActive={isActive} onClickFalse={() => setActive(false)} onClickTrue={() => setActive(true)}/>

    </div>
    </>
  )
}
