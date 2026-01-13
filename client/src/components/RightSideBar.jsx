import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/chatContext'
import { authContext } from '../../context/auth.context';

const RightSideBar = () => {

  const {selectedUser , messages} = useContext(ChatContext);

  const {logout , onlineUsers} = useContext(authContext);

  const [messageImages , setMessageImages] = useState([]);

  // get all images from the messges and set them to state 

  useEffect(()=>{
    setMessageImages(
      messages.filter(msg => msg.image).map(msg=>msg.image)
    )
  }, [messages])

  return selectedUser && (
    <div className="bg-[#8185B2]/10 text-white w-full h-full relative overflow-hidden max-md:hidden">

      {/* User Info */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt=""
          className="w-20 aspect-square rounded-full"
        />

        <h1 className="text-xl font-medium flex items-center gap-2">
          {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500" />}
          {selectedUser.fullName}
        </h1>

        <p className="px-10 text-center opacity-80">
          {selectedUser.bio}
        </p>
      </div>

      <hr className="border-[#ffffff50] my-4 mx-5" />

      {/* Media */}
      <div className="px-5 text-xs">
        <p className="mb-2">Media</p>

        {/* ONLY SCROLL AREA */}
        <div className="max-h-[220px] overflow-y-auto scrollbar-hide grid grid-cols-2 gap-4 opacity-80 pr-1">
          {messageImages.map((url, idx) => (
            <div
              key={idx}
              onClick={() => window.open(url)}
              className="cursor-pointer rounded-md overflow-hidden"
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button onClick={()=> logout()} className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-20 rounded-full">
        Logout
      </button>
    </div>
  )
}

export default RightSideBar
 