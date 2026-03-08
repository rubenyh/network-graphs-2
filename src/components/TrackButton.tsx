import React from 'react'

type TrackButtonProps = {
  isActive: boolean;
  onClickFalse: () => void;
  onClickTrue: () => void;
};

export default function TrackButton({ isActive, onClickFalse, onClickTrue }: TrackButtonProps) {
  return (
    <>
      {isActive ? (
        <button
          onClick={onClickFalse}
          className="fixed bottom-3 right-3 md:bottom-6 md:right-6 bg-red-800 text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition shadow-lg z-10"
        >
          X
        </button>
      ) : (
        <button
          onClick={onClickTrue}
          className="fixed bottom-3 right-3 md:bottom-6 md:right-6 bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition shadow-lg z-10"
        >
          Track
        </button>
      )}
    </>
  )
}

