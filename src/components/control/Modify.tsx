'use client';

import React from 'react'
import { Node, Links } from "@/types/Nodes"

type PageProps = {
  isOpen3: boolean;
  onClose: () => void;
  graphData: { nodes: Node[]; links: Links[] }
  setGraphData?: React.Dispatch<
    React.SetStateAction<{ nodes: Node[]; links: Links[] }>
  >
  node: Node
  children?: React.ReactNode;
};


const Modify: React.FC<PageProps> = ({isOpen3, onClose, graphData, setGraphData, node}) => {
if(!isOpen3) return null;

  const connections = graphData.links.filter(
    (l) => l.source === node.id || l.target === node.id
  )


  return (
    <div
      className="fixed inset-0 flex bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-black p-8 max-w-md w-full mx-auto my-auto rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          Connections for “{node.id}”
        </h2>

        {connections.length === 0 ? (
          <p className="mb-4">No connections found.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {connections.map((link, idx) => {
              // determine the “other” end of this link
              const otherNodeId =
                link.source === node.id ? link.target : link.source

              return (
                <li
                  key={`${link.source}-${link.target}-${idx}`}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>
                    {node.id} ↔ {otherNodeId}
                  </span>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => {
                      if (!graphData || !setGraphData) return
                      setGraphData(prev => ({
                        // leave nodes untouched
                        nodes: prev.nodes,
                        // drop only the specific link you clicked
                        links: prev.links.filter(
                          l =>
                            !(
                              l.source === link.source &&
                              l.target === link.target &&
                              l.value  === link.value
                            )
                        ),
                      }))
                    }}
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        <button
          className="mt-2 px-4 py-2 bg-black text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modify
