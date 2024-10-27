//frontend/src/components/ContactList.jsx
import { useAppStore } from "@/store";
import React from "react";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

export const ContactList = ({ contacts, isChannel = false }) => {
    const { selectedChatData, setSelectedChatData, selectedChatType, setSelectedChatType, setSelectedChatMessages } = useAppStore();

    const HandleClick = (contact) => {
        if (isChannel) setSelectedChatType("channel");
        else setSelectedChatType("contact");
        
        setSelectedChatData(contact);
        
        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
    };

    return (
        <>
           <div className="mt-5">
            {
                contacts.map((contact) => (
                    <div  key={contact._id}  className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id ? "bg-[#6f469d] hover:bg-[#6f469d]" : "hover:bg-[#f1f1f111]"}`}  onClick={() => HandleClick(contact)}>
                        <div className="flex gap-5 items-center justify-start text-neutral-300">
                            {!isChannel ? (
                                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                    {contact.image ? (
                                        <AvatarImage 
                                            src={`${HOST}/${contact.image}`} 
                                            alt={contact.email} 
                                            className="object-cover w-full h-full bg-black" 
                                        />
                                    ) : (
                                        <div className={`${getColor(contact.color)} uppercase h-10 w-10 text-lg border-[2px] flex items-center justify-center rounded-full`}>
                                            {contact.firstname ? contact.firstname.charAt(0) : contact.email.charAt(0)}
                                        </div>
                                    )}
                                </Avatar>
                            ) : (
                                <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                                    #
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className={`text-white font-semibold ${selectedChatData && selectedChatData._id === contact._id ? "text-opacity-90" : "text-opacity-70"}`}>
                                    {!isChannel ? `${contact.firstname} ${contact.lastname}` : contact.name}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {contact.email}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
           </div>
        </>
    );
};
