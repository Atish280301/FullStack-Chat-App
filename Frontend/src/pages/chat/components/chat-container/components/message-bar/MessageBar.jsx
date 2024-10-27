//frontend/src/pages/chat/components/chat-container/components/message-bar/MessageBar.jsx
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
export const MessageBar = () => {
    const emojiref = useRef();
    const fileInputRef = useRef();
    const {selectedChatType, selectedChatData, userInfo, setisUploading, setfileUploadProgress} = useAppStore();
    const socket = useSocket();
    const [message, SetMessage] = useState("");
    const [emoji, SetEmoji] = useState(false);

    useEffect(()=>{
        function HandleClickOutside (event) {
            if(emojiref.current && !emojiref.current.contains(event.target)) {
                SetEmoji(false);
            }
        }
        document.addEventListener('mousedown',HandleClickOutside)
        return () => {
            document.removeEventListener('mousedown',HandleClickOutside)
        }
    },[emojiref])
    const HandleAddEmoji = (emoji) => {
        SetMessage((msg)=>msg+emoji.emoji)
    }
    const HandleSendMessages = async () => {
        if(selectedChatType === "contact") {
            socket.emit("sendMessage",{
                sender:userInfo.id,
                content:message,
                receiver: selectedChatData._id,
                messagetype: "text",
                fileurl:undefined,
            });
        } else if (selectedChatType === "channel") {
            socket.emit("sendchannelmessage",{
                sender:userInfo.id,
                content:message,
                messagetype: "text",
                fileurl:undefined,
                channelId: selectedChatData._id
            })
        }
        SetMessage("");
    }

    const HandleAttachmentClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    const HandleAttachmentChange = async (event) => {
        try {
           const file = event.target.files[0];
           if(file){
            const formData = new FormData();
            formData.append("file",file);
            setisUploading(true);
            const response = await apiClient.post(UPLOAD_FILE_ROUTE,formData,{withCredentials:true, onUploadProgress: data => {
                setfileUploadProgress(Math.round((100 * data.loaded)/data.total))
            }})
            if(response.status === 200 && response.data){
                setisUploading(false);
                if(selectedChatType === "contact"){
                    socket.emit("sendMessage",{
                        sender:userInfo.id,
                        content:undefined,
                        receiver: selectedChatData._id,
                        messagetype: "file",
                        fileurl:response.data.filePath,
                    });
                } else if (selectedChatType === "channel") {
                    socket.emit("sendchannelmessage",{
                        sender:userInfo.id,
                        content:undefined,
                        messagetype: "file",
                        fileurl:response.data.filePath,
                        channelId: selectedChatData._id
                    })
                }
            }
           }
           console.log({file});
        } catch (error) {
            setisUploading(false);
            console.log({error});
        }
    }
    return (
        <>
            <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
                <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
                    <input className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none" type="text" placeholder="Enter Message..." id="message" name="message" value={message} onChange={e=>SetMessage(e.target.value)} />
                    <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={HandleAttachmentClick}>
                        <GrAttachment className="text-2xl" />
                    </button>
                    <input type="file" className="hidden" id="file" name="file" ref={fileInputRef} onChange={HandleAttachmentChange} />
                    <div className="relative">
                        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={()=>SetEmoji(true)}>
                            <MdEmojiEmotions className="text-2xl" />
                        </button>
                        <div className="absolute bottom-16 right-0" ref={emojiref}>
                            <EmojiPicker theme="dark" open={emoji} onEmojiClick={HandleAddEmoji} autoFocusSearch={false} emojiStyle="facebook" />
                        </div>
                    </div>
                </div>
                <button className="bg-[#8417ff] rounded-md flex items-center p-5 justify-center hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={HandleSendMessages}>
                    <IoMdSend className="text-2xl" />
                </button>
            </div>
        </>
    );
}