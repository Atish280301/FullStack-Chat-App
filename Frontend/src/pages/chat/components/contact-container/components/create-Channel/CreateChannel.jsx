//frontend\src\pages\chat\components\contact-container\components\create-Channel\CreateChannel.jsx
import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
import { useAppStore } from "@/store";
export const CreateChannel = () => {
    const {addChannel} = useAppStore();
    const [NewChannelModal, setNewChannelModal] = useState(false);
    const [Allcontacts, setAllContacts] = useState([]);
    const [SelectedContacts, setSelectedContacts] = useState([]);
    const [ChannelName, setChannelName] = useState("");

    useEffect(()=>{
        const getData = async () => {
            try {
                const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE,{withCredentials:true})
                setAllContacts(response.data.contacts);
            } catch (error) {
              console.log(error);  
            }
        }
        getData();
    },[])

    const CreateChannelHandler = async () => {
      try {
        if(ChannelName.length >= 0 && SelectedContacts.length > 0){
          const response = await apiClient.post(CREATE_CHANNEL_ROUTE,{
            name: ChannelName,
            members: SelectedContacts.map((contact)=>contact.value)
          },{withCredentials: true});
          if(response.status === 201) {
            setChannelName("");
            setSelectedContacts([]);
            setNewChannelModal(false);
            addChannel(response.data.channel)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300" onClick={() => setNewChannelModal(true)} />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
              <p>Create New Channel Here!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={NewChannelModal} onOpenChange={setNewChannelModal}>
          <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
            <DialogHeader>
              <DialogTitle>
                <p>Create A Channel To Start Chat!</p>
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <Input placeholder="Channel Name..." className="rounded-lg p-6 bg-[#2c2e3b] border-none" onChange={(e) => setChannelName(e.target.value)} value={ChannelName} />
            </div>
            <div>
                <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white" defaultOptions={Allcontacts} placeholder="Search Contacts" value={SelectedContacts} onChange={setSelectedContacts} emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600">No Results Found!</p>}  />
            </div>
            <div>
                <Button className="w-full bg-purple-600 hover:bg-purple-900 transition-all duration-300" onClick={CreateChannelHandler}>
                    Create Channel
                </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
}
