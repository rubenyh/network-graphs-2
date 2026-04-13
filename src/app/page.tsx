'use client'
import React, { useMemo, useState } from 'react'
import ForceGraph from '@/components/graphs'
import MasterControl from '@/components/control/MasterControl'
import AddUser from '@/components/control/AddUser'
import findShortestPath from '@/lib/path'
import usePan from "@/hooks/usePan"
import useNodeSelection from '@/hooks/useNodeSelection'
import useContainerSize from "@/hooks/useContainerSize"
import Navbar from '@/components/ui/Navbar'
import TrackButton from '@/components/TrackButton'
import StartModal from '@/components/ui/StartModal'
import { useAuth } from '@/context/AuthContext'
import { useAuthHandlers } from '@/hooks/useAuthHandlers'
import { useGraphData } from '@/hooks/useGraphData'


export default function Graph() {
  const [isOpenAddUser, setOpenAddUser] = useState(false)
  const [isOpenMasterControl, setOpenMasterControl] = useState(false)
  const [isActive, setActive] = useState(false)
  const { offset, onMouseDown, onMouseMove, onMouseUp, center } = usePan()
  const { selected, handleNodeClick } = useNodeSelection()
  const { containerRef, dimensions } = useContainerSize<HTMLDivElement>()
  const [isStart, setStart] = useState(true);
  const { user, loading: authLoading, ...auth } = useAuth()
  const { authError, handleEmailSignIn, handleEmailSignUp, handleGoogleSignIn, handleSignOut, } = useAuthHandlers(auth)  
  const { graphData, setGraphData, isLoadingGraph, isSaving, dataError, } = useGraphData(user)


  const path = useMemo(() => {
    if (selected.length < 2) return []
    return findShortestPath(graphData, selected[0], selected[1])
  }, [selected, graphData]) 

  const shouldShowModal = !user || isStart
  const canCloseModal = Boolean(user)


  return (
    <>
    {shouldShowModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <StartModal
          onClose={() => setStart(false)}
          canClose={canCloseModal}
          onEmailSignIn={handleEmailSignIn}
          onEmailSignUp={handleEmailSignUp}
          onGoogleSignIn={handleGoogleSignIn}
          loading={authLoading || isLoadingGraph}
          error={authError}
        />
      </div>
    )}
    
    <div className="text-black w-screen h-screen relative">

      <Navbar
        onClickMasterControl={() => setOpenMasterControl(true)}
        onClickCenter={center}
        onClickOpenAddUser={() => setOpenAddUser(true)}
        onSignOut={user ? handleSignOut : undefined}
        userEmail={user?.email}
      />

      {dataError ? (
        <div className="absolute top-20 right-4 bg-red-600 text-white px-4 py-2 rounded shadow">
          {dataError}
        </div>
      ) : null}

      {isSaving ? (
        <div className="absolute top-20 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
          Saving...
        </div>
      ) : null}

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
