//frontend/src/pages/chat/components/contact-container/ContactContainer.jsx
import React, { useEffect } from "react";
import { ProfileInfo } from "./components/profileinfo/ProfileInfo";
import { NewDm } from "./components/new-dm/NewDm";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_LIST_ROUTE, GET_USER_CHANNEL_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { ContactList } from "@/components/ContactList";
import { CreateChannel } from "./components/create-Channel/CreateChannel";
export const ContactContainer = () => {
    const {directMessagesContacts, setdirectMessagesContacts, channels, setchannels} = useAppStore();
    useEffect(()=>{
        const getContacts = async () => {
            const response = await apiClient.get(GET_DM_CONTACTS_LIST_ROUTE,{withCredentials:true});
            if(response.data.contacts){
                setdirectMessagesContacts(response.data.contacts);
            }
        }
        const getChannels = async () => {
            const response = await apiClient.get(GET_USER_CHANNEL_ROUTE,{withCredentials:true});
            if(response.data.channels){
                setchannels(response.data.channels);
            }
        }
        
        getContacts(); getChannels();
    },[setdirectMessagesContacts, setchannels])
    return (
        <>
            <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
                <div className="my-5">
                    <div className="flex items-center justify-between pr-10">
                        <Title text="Direct Messages" />
                        <NewDm />
                    </div>
                    <div className="max-h-[40vh] overflow-y-auto scrollbar-hidden">
                        <ContactList contacts={directMessagesContacts} />
                    </div>
                </div>
                <div className="my-5">
                    <div className="flex items-center justify-between pr-10">
                        <Title text="Channels" />
                        <CreateChannel />
                    </div>
                    <div className="max-h-[40vh] overflow-y-auto scrollbar-hidden">
                        <ContactList contacts={channels} isChannel={true} />
                    </div>
                </div>
                <ProfileInfo />
            </div>
        </>
    );
}

const Title = ({text}) => {
    return (
        <>
            <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
                {text}
            </h6>
        </>
    );
}