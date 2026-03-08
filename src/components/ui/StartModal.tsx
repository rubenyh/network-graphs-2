import React from 'react'

type StartModalProps = {
  onClose: () => void;
};

export default function StartModal({ onClose }: StartModalProps) {
  return (
      <div className="bg-white/95 p-12 rounded-2xl text-center shadow-lg">
        <h1 className="text-black font-medium mb-3 text-3xl">
          Social media<br />relations simulator
        </h1>
          <button onClick={onClose} className="bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition">
            START
          </button>
      </div>
  )
}
