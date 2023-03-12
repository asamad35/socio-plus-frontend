import React from "react";
import { useSelector } from "react-redux";
import { getFileIcon, getFullName } from "../../helper";

const ReplyMessageAttachment = ({ messageObj }) => {
  const loggedUser = useSelector((state) => state.authReducer.user);

  function getSenderName() {
    return messageObj.replyMessage.senderName === getFullName(loggedUser)
      ? "You"
      : messageObj.replyMessage.senderName;
  }

  return (
    <div
      onClick={() => {
        const targetEl = document.getElementById(messageObj.replyMessage.uuid);
        console.log(targetEl);
        targetEl.classList.add("bg-secondary");
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className={`bg-secondary fillSpace cursor-pointer ${
        messageObj.sendOrReceived === "received" ? "self-end" : "self-start"
      }  rounded-2xl m-2 mb-0`}
    >
      <div className="flex p-2 pb-0 gap-1 ">
        <p
          className={`h-[20px] w-[5px] ${
            messageObj.replyMessage.senderName === getFullName(loggedUser)
              ? "bg-lime-700"
              : "bg-fuchsia-600"
          }  rounded-2xl`}
        ></p>
        <p
          className={`text-sm font-semibold ${
            messageObj.replyMessage.senderName === getFullName(loggedUser)
              ? "text-lime-700"
              : "text-fuchsia-600"
          } }`}
        >
          {getSenderName()}
        </p>
      </div>

      {/* content */}
      {messageObj.replyMessage?.content && (
        <p className=" p-1 px-2 text-sm whitespace-pre-wrap rounded-2xl break-words w-fit max-w-[200px] sm:max-w-[250px] md:max-w-[300px] ">
          {messageObj.replyMessage?.content}
        </p>
      )}

      {/* image */}
      {messageObj.replyMessage?.image && (
        <img
          src={messageObj.replyMessage.url}
          alt="image"
          className="w-[80px] h-[80px] p-2 rounded-2xl object-cover object-top pointer-events-none"
        />
      )}
      {messageObj.replyMessage?.docName && (
        <img
          src={getFileIcon(messageObj.replyMessage?.docName)}
          alt="image"
          className="w-[80px] h-[80px] p-2 rounded-2xl object-cover object-top pointer-events-none"
        />
      )}
    </div>
  );
};

export default ReplyMessageAttachment;
