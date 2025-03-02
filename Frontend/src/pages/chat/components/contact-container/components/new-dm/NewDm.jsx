//frontend/src/pages/chat/components/contact-container/components/new-dm/NewDm.jsx
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTE, HOST } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
export const NewDm = () => {
    const {setSelectedChatType, setSelectedChatData} = useAppStore();
    const [OpenNewContact, setOpenNewContact] = useState(false);
    const [searchContacts, setSearchContacts] = useState([]);

    const SearchContacts = async (searchterm) => {
        try {
            if(searchterm.length > 0){
               const response =  await apiClient.post(SEARCH_CONTACTS_ROUTE,{searchterm},{withCredentials:true});
               if(response.status === 200 && response.data.contacts){
                setSearchContacts(response.data.contacts);
               }
            } else {
                setSearchContacts([]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const SelectNewContact = async (contact) => {
        setOpenNewContact(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchContacts([]);
    }
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus
                className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
                onClick={() => setOpenNewContact(true)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
              <p>Select New Contact Here!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={OpenNewContact} onOpenChange={setOpenNewContact}>
          <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
            <DialogHeader>
              <DialogTitle>
                <p>Select A Contact To Start Chat!</p>
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <Input
                placeholder="Search Contacts..."
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                onChange={(e) => SearchContacts(e.target.value)}
              />
            </div>
            {searchContacts.length > 0 && (
              <ScrollArea className="h-[250px]">
                <div className="flex flex-col gap-5">
                  {searchContacts.map((contact) => (
                    <div key={contact._id} className="flex gap-3 items-center cursor-pointer" onClick={() => SelectNewContact(contact)}>
                      <div className="w-12 h-12 relative">
                        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                          {contact.image ? (
                            <AvatarImage src={`${HOST}/${contact.image}`} alt={contact.email} className="object-cover w-full h-full bg-black rounded-full" />
                          ) : (
                            <div className={`uppercase h-12 w-12 text-lg border-[2px] flex items-center justify-center rounded-full ${getColor( contact.color )}`}>
                              {contact.firstname ? contact.firstname.split("").shift() : contact.email.split("").shift()}
                            </div>
                          )}
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {contact.firstname && contact.lastname ? `${contact.firstname} ${contact.lastname}` : `${contact.email}`}
                        </span>
                        <span className="text-xs">{contact.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
            {searchContacts.length <= 0 && (
              <div className="flex-1 h-full    flex flex-col justify-center items-center transition-all duration-1000">
                <div className="text-opacity-80 text-white flex flex-col gap-5 justify-center items-center lg:text-2xl text-xl transition-all duration-300 text-center">
                  <h3 className="poppins-medium">
                    Hi, <span className="text-purple-500">!</span> Search New
                    <span className="text-purple-500"> Contacts. </span>
                  </h3>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
}
