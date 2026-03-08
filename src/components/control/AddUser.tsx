'use client';

import React, { useState } from 'react';
import { Links, Node } from "@/types/Nodes"

type AddUserProps = {
  isOpen: boolean;
  onClose: () => void;
  setGraphData: React.Dispatch<React.SetStateAction<{ nodes: Node[]; links: Links[] }>>;
};

export default function AddUser({ isOpen, onClose, setGraphData }: AddUserProps) {
  const [nodeId, setNodeId] = useState('');
  const [nodeGroup, setNodeGroup] = useState(1);
  const [linkValue, setLinkValue] = useState(1);
  const [targetList, setTargetList] = useState<string[]>(['']);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nodeId) return;

    setGraphData(prev => {
      const existing = new Set(prev.nodes.map(n => n.id));
      const nodes: Node[] = existing.has(nodeId)
        ? [...prev.nodes]
        : [...prev.nodes, { id: nodeId, group: nodeGroup }];
      existing.add(nodeId);

      targetList.forEach(t => {
        if (t && !existing.has(t)) {
          nodes.push({ id: t, group: nodeGroup });
          existing.add(t);
        }
      });

      const links = [...prev.links];
      targetList.forEach(t => {
        if (
          t &&
          !prev.links.some(
            l => l.source === nodeId && l.target === t && l.value === linkValue
          )
        ) {
          links.push({ source: nodeId, target: t, value: linkValue });
        }
      });

      return { nodes, links };
    });

    // reset
    setNodeId('');
    setNodeGroup(1);
    setTargetList(['']);
    setLinkValue(1);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={onClose}
    >

      
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-2xl max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className='place-items-center-safe'>
          <h2 className="text-4xl font-bold mb-4">Add User</h2>
        </div>
        <label className="block mb-2 font-semibold">
          Name
          <input
            type="text"
            value={nodeId}
            onChange={e => setNodeId(e.target.value)}
            className="bg-gray-300 p-2 mt-1 w-full rounded-2xl"
          />
        </label>


        <div className="block mb-2">
          <label className="font-semibold">Friends</label>
          {targetList.map((target, idx) => (
            <div key={idx} className="flex gap-2 items-center mt-1">
              <input
                type="text"
                placeholder={`Target ${idx + 1}`}
                value={target}
                onChange={e => {
                  const newList = [...targetList];
                  newList[idx] = e.target.value;
                  setTargetList(newList);
                }}
                className="bg-gray-300 p-2 mt-1 w-full rounded-2xl"
              />
              <button
                type="button"
                onClick={() =>
                  setTargetList(list =>
                    list.length === 1 ? list : list.filter((_, i) => i !== idx)
                  )
                }
                className="text-red-500 cursor-pointer scale-130 hover:scale-180"
                disabled={targetList.length === 1}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setTargetList(list => [...list, ''])}
            className="mt-2 font-semibold bg-gray-200 px-3 py-1 rounded hover:scale-110 cursor-pointer transition"
          >
            + Add Friend
          </button>
        </div>


        <div className="flex justify-center gap-2">
          <button type="button" onClick={onClose} className="px-4 cursor-pointer py-2 hover:scale-110 transition">
            Cancel
          </button>
          <button type="submit" className="bg-black text-white cursor-pointer px-4 py-2 rounded-3xl hover:scale-110 transition">
            Add
          </button>
        </div>
      </form>


    </div>
  );
}

