import { FormInput } from "lucide-react";

//frontend/src/store/slices/ChatSlice.jsx
export const CreateChatSlice = (set, get) => ({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:[],
    directMessagesContacts: [],
    
    isUploading: false,
    isDownloading: false,
    fileUploadProgress: 0,
    fileDownloadProgress: 0,

    channels:[],
    

    setSelectedChatType: (selectedChatType) => set({selectedChatType}),
    setSelectedChatData: (selectedChatData) => set({selectedChatData}),
    setSelectedChatMessages: (selectedChatMessages) => set ({selectedChatMessages}),
    setdirectMessagesContacts: (directMessagesContacts) => set({directMessagesContacts}),
    
    setisUploading: (isUploading) => set({isUploading}),
    setisDownloading: (isDownloading) => set({isDownloading}),
    setfileUploadProgress: (fileUploadProgress) => set({fileUploadProgress}),
    setfileDownloadProgress: (fileDownloadProgress) => set({fileDownloadProgress}),

    setchannels: (channels) =>set({channels}),

    closeChat:()=>set({
        selectedChatData:undefined, 
        selectedChatType:undefined, 
        selectedChatMessages:[]
    }),
    addMessage:(message)=>{
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages,{
                    ...message,
                    receiver: selectedChatType === "channel" ? message.receiver : message.receiver._id,
                    sender: selectedChatType === "channel" ? message.sender : message.sender._id,
                }
            ]
        })
    },

    addChannel: (channel) => {
        const channels = get().channels;
        set({channels:[channel,...channels]})
    },
    addChannelInChannelList: (message) => {
        const channels = get().channels;
        const data = channels.find(channel => channel._id === message.channelId);
        const index = channels.findIndex(channel => channel._id === message.channelId);

        if(index !== -1 && index !== undefined) {
            channels.splice(index,1);
            channels.unshift(data);
        }
    },
    addContactsInDMContacts: (message) => {
        const userId = get().userInfo.id;
        const fromId = message.sender._id === userId ? message.receiver._id : message.sender._id;
        const fromData = message.sender._id === userId ? message.receiver : message.sender;
        const dmContacts = get().directMessagesContacts;
        const data = dmContacts.find((contact)=>contact._id === fromId);
        const index = dmContacts.findIndex((contact) => contact._id === fromId);
        if(index !== -1 && index !== undefined) {
            dmContacts.splice(index,1);
            dmContacts.unshift(data);
        } else {
            dmContacts.unshift(fromData);
        }
        set({directMessagesContacts: dmContacts});
    }
})