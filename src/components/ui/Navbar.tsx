import React from 'react'

type NavbarProps = {
  onClickMasterControl: () => void;
  onClickCenter: () => void;
  onClickOpenAddUser: () => void;
};

export default function Navbar({ onClickMasterControl, onClickCenter, onClickOpenAddUser }: NavbarProps) {
  return (
      <nav className="flex justify-between p-4 bg-transparent w-full fixed z-1">
        <img src="/menu.svg" alt="Menu"
        className="size-12 cursor-pointer hover:scale-110 transition"
        onClick={onClickMasterControl} 
        />
        <button onClick={onClickCenter} className="bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition">Center</button>
        <img src="/add.svg" alt="Add" onClick={onClickOpenAddUser} className="size-12 cursor-pointer hover:scale-110 transition"/>
      </nav>
  )
}

