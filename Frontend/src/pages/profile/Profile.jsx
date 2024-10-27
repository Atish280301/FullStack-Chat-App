//frontend/src/pages/profile/Profile.jsx
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { ADD_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, } from "@/utils/constants";
import { useRef } from "react";

export const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, sethovered] = useState(false);
  const [selectedcolor, setselectedcolor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(()=>{
    if(userInfo?.profilesetup){
      setfirstname(userInfo?.firstname || "");
      setlastname(userInfo?.lastname || "");
      setselectedcolor(userInfo?.color);
    }
    if(userInfo?.image) {
      setImage(`${HOST}/${userInfo?.image}`);
    }
  },[userInfo])

  // console.log(userInfo);

  const ValidateProfile = () => {
    if(!firstname) {
      toast.error("Firstname Is Required.");
      return false;
    } if (!lastname) {
      toast.error("Lastname Is Required.");
      return false;
    }
    return true;
  }

  const saveChanges = async () => {
    if(ValidateProfile()){
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE,{firstname, lastname, color: selectedcolor},{withCredentials:true})
        if(response.status === 200 && response.data){
          setUserInfo({...response.data});
          toast.success("Profile Updated Successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleNavigate = () => {
    if(userInfo?.profilesetup){
      navigate("/chat");
    } else {
      toast.error("Please Setup Profile First");
    }
  }
  const HandleFileInputClick = () => {
    fileInputRef.current.click();
  }
  const HandleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log({file});
    if(file){
      const formData = new FormData();
      formData.append("image", file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE,formData,{withCredentials:true});
      if(response.status === 200 && response.data.image){
        setUserInfo({...userInfo, image: response.data.image})
        toast.success("Image Updated Successfully!");
      }
    }
  }
  const HandleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE,{withCredentials:true})
      if(response.status === 200){
        setUserInfo({...userInfo, image:null})
        toast.success("Image Removed Successfully");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="h-[100vh] flex items-center justify-center flex-col gap-10 bg-slate-800">
        <div className="flex flex-col gap-10 w-[80vw] md:w-max">
          <div onClick={handleNavigate}>
            <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
          </div>
          <div className="grid grid-cols-2">
            <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center" onMouseEnter={() => sethovered(true)} onMouseLeave={() => sethovered(false)} >
              <Avatar className="h-32 w-32 md:w-30 md:h-30 rounded-full overflow-hidden">
                {image ? ( <AvatarImage src={image} alt={userInfo?.email} className="object-cover w-full h-full bg-black" />) : 
                    
                    ( <div className={`uppercase h-32 w-32 md:w-30 md:h-30 text-7xl border-[2px] flex items-center justify-center rounded-full ${getColor(selectedcolor)}`} >
                        {firstname ? firstname.split("").shift() : userInfo?.email.split("").shift()}
                    </div>
                )}
              </Avatar>

              {hovered && (
                <div className="absolute h-32 w-32 md:w-30 md:h-30 flex items-center justify-center bg-black/50 cursor-pointer rounded-full" onClick={image ? HandleDeleteImage : HandleFileInputClick}>
                  {image ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus className="text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
              <Input type="file" ref={fileInputRef} className="hidden" onChange={HandleImageChange} name="image" id="image" accept=".png, .jpg, .jpeg, .svg, .webp" />
            </div>
            <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-black items-center justify-center">
              <div className="w-full"><Input placeholder="User Email" type="email" disabled value={userInfo?.email || ""} className="rounded-lg p-6 font-bold" /></div>
              <div className="w-full"><Input placeholder="Firstname" type="email" value={firstname || ""} onChange={e=>setfirstname(e.target.value)} className="rounded-lg p-6 font-bold" /></div>
              <div className="w-full"><Input placeholder="Lastname" type="email" value={lastname || ""} onChange={e=>setlastname(e.target.value)} className="rounded-lg p-6 font-bold" /></div>
              <div className="w-fulll flex gap-5">
                {
                    colors.map((color, index)=><div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedcolor === index ? " outline outline-white/50 outline-2" : ""}`} key={index} onClick={()=>setselectedcolor(index)}></div>)
                }
              </div>
            </div>
          </div>
          <div className="w-full">
             <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>Save Changes</Button>   
          </div>
        </div>
      </div>
    </>
  );
};
