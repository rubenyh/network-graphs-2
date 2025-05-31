'use client';

import React from 'react'
import UserInfo from '../../components/userInfo'

type Node = { id: string; group: number }
type Link = { source: string; target: string; value: number }

type PageProps = {
  isOpen: boolean;
  onClose: () => void;
  graphData: { nodes: Node[]; links: Link[] }
  setGraphData?: React.Dispatch<
    React.SetStateAction<{ nodes: Node[]; links: Link[] }>
  >
  children?: React.ReactNode;
};


const MasterControl: React.FC<PageProps> = ({isOpen, onClose, graphData, setGraphData}) => {
if(!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex bg-black/50 z-50"
      onClick={onClose}
    >
      <div
      className="bg-white text-black p-6 sm:p-10 md:p-20 h-full w-150 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl relative overflow-y-auto"
      onClick={e => e.stopPropagation()}
      >
      <button
        className="absolute top-4 left-5 hover:scale-120 hover:text-red-800 sm:text-4xl text-4xl md:text-5xl cursor-pointer transition"
        onClick={onClose}
      >
        X
      </button>

      <br className='md:hidden'></br>
      <br className='md:hidden'></br>

      {graphData.nodes.map(node => (
        <UserInfo 
        key={node.id}
        node={node}
        graphData={graphData}
        setGraphData={setGraphData}
        />
      ))}

      <div className="bg-[#682121] text-white hover:scale-105 cursor-pointer transition flex items-center justify-center text-2xl font-bold sm:max-w-lg md:max-w-2xl lg:max-w-4xl rounded-2xl h-14 right-100 md:-ml-10 mb-3.5"
        onClick={() => {
            if (!setGraphData) return
            setGraphData({
          nodes: [],
          links: [],
            })
          }}>
        Delete All
      </div>


      </div>
    </div>
  )
}

export default MasterControl