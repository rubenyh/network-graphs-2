import React from 'react'

type NavbarProps = {
  onClickMasterControl: () => void;
  onClickCenter: () => void;
  onClickOpenAddUser: () => void;
  onSignOut?: () => void;
  userEmail?: string | null;
};

export default function Navbar({
  onClickMasterControl,
  onClickCenter,
  onClickOpenAddUser,
  onSignOut,
  userEmail,
}: NavbarProps) {
  return (
      <nav className="flex justify-between items-center p-4 bg-transparent w-full fixed z-1">
        <img src="/menu.svg" alt="Menu"
        className="size-12 cursor-pointer hover:scale-110 transition"
        onClick={onClickMasterControl} 
        />
        <button onClick={onClickCenter} className="bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition">Center</button>
        <div className="flex items-center gap-3">
          {userEmail ? (
            <span className="text-sm text-black/70 hidden sm:block">{userEmail}</span>
          ) : null}
          {onSignOut ? (
            <button
              onClick={onSignOut}
              className="text-sm cursor-pointer px-3 py-1 border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              Sign out
            </button>
          ) : null}
          <img src="/add.svg" alt="Add" onClick={onClickOpenAddUser} className="size-12 cursor-pointer hover:scale-110 transition"/>
        </div>
      </nav>
  )
}

