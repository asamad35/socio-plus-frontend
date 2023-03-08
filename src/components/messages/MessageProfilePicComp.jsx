import React from 'react'

const MessageProfilePicComp = ({messageObj}) => {
  return (
    <img
    className={`rounded-full object-top object-cover w-10 h-10 ${
      messageObj.showPic ? "opacity-100" : "opacity-0"
    } `}
    src={messageObj.sender.photoUrl}
  />
  )
}

export default MessageProfilePicComp