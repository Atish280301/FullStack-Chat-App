//frontend/src/pages/chat/components/contact-container/components/profileinfo/ProfileInfo.jsx
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_PROFILE_ROUTE } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
export const ProfileInfo = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo, setIsLoggedOut} = useAppStore();
    const LogoutFunction = async () => {
        try {
            const response = await apiClient.post(LOGOUT_PROFILE_ROUTE, {}, { withCredentials: true });
            if (response.status === 200) {
                setUserInfo(null);
                setIsLoggedOut(true);
                navigate("/auth");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
                <div className="flex gap-3 items-center justify-center">
                    <div className="w-12 h-12 relative">
                        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                            {userInfo?.image ? ( <AvatarImage src={`${HOST}/${userInfo?.image}`} alt={userInfo?.email} className="object-cover w-full h-full bg-black" />) : 
                                ( <div className={`uppercase h-12 w-12 text-lg border-[2px] flex items-center justify-center rounded-full ${getColor(userInfo?.color)}`} >
                                    {userInfo?.firstname ? userInfo?.firstname.split("").shift() : userInfo?.email.split("").shift()}
                                </div>
                            )}
                        </Avatar>
                    </div>
                    <div>
                        {
                            userInfo?.firstname && userInfo?.lastname ? `${userInfo?.firstname} ${userInfo?.lastname}` : ""
                        }
                    </div>
                </div>
                <div className="flex gap-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><FiEdit2 className="text-purple-500 text-xl font-medium" onClick={()=>navigate("/profile")} /></TooltipTrigger>
                            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                                <p>Edit Profile</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><IoPowerSharp className="text-red-500 text-xl font-medium" onClick={LogoutFunction} /></TooltipTrigger>
                            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                                <p>Logout Profile</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </>
    );
}