import React, {useState} from 'react'
import Modify from './Modify'
import { Links, Node } from "@/types/Nodes"

interface UserInfoProps{
  node: Node
  graphData: { nodes: Node[]; links: Links[] }
  setGraphData?: React.Dispatch<
    React.SetStateAction<{ nodes: Node[]; links: Links[] }>
  >
}

const UserInfo: React.FC<UserInfoProps> = ({node, graphData, setGraphData}) =>{
  const [isOpen3, setOpen3] = useState(false)

  return (
    <>
      <div className='rounded-2 justify-center'>
        <div className='bg-black sm:max-w-lg md:max-w-2xl lg:max-w-6xl rounded-2xl h-14 right-100 md:-ml-10 mb-3.5' >
          <div className='justify-between flex items-center h-full'>
            <p className='text-2xl text-white ml-2'>{node.id}</p>
            <img src={'/Trash.svg'} alt='Trashcan' 
              className='w-8 text-white mr-2 cursor-pointer hover:scale-110 transition'
              onClick={() => {
                if (!graphData || !setGraphData) return
                setGraphData({
                  nodes: graphData.nodes.filter((n) => n.id !== node.id),
                  links: graphData.links.filter(
                    (l) => l.source !== node.id && l.target !== node.id
                  ),
                })
              }}
            />
          </div>
        </div>
      </div>
      <Modify isOpen3={isOpen3} onClose={() => setOpen3(false)} graphData={graphData} node={node}key={node.id}/>
    </>
  )
}

export default UserInfo
