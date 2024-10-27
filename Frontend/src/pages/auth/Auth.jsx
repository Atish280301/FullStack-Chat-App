//frontend/src/pages/auth/Auth.jsx
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import '../../styles/Auth.css';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect} from "react";
import Cookies from "js-cookie";
export const Auth = () => {
    const navigate = useNavigate();
    const {setUserInfo} = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateSignup = () => {
        if(!email.length){
            toast.error("Email Is Required!");
            return false;
        } if (!password.length) {
            toast.error("Password Is Required!");
            return false;
        } if(password !== confirmPassword) {
            toast.error("Password & Confirm Password Should Be Same!");
            return false;
        }
        return true;
    }

    const validateLogin = () => {
        if(!email.length){
            toast.error("Email Is Required!");
            return false;
        } if (!password.length) {
            toast.error("Password Is Required!");
            return false;
        }
        return true;
    }

    const HandleLogin = async () => {
        if(validateLogin()) {
            const response = await apiClient.post(LOGIN_ROUTE, {email, password},{withCredentials: true});
            if(response.data.user.id) {
                setUserInfo(response.data.user);
                navigate("/chat");
            }
        }
    }
    const HandleSignup = async () => {
        if(validateSignup()) {
            const response = await apiClient.post(SIGNUP_ROUTE,{email, password},{withCredentials: true});
            if(response.data === 201) {
                setUserInfo(response.data.user)
                navigate("/profile");
            }
        }
    }

    useEffect(()=>{

        const value = Cookies.get('jwt');
        if(value){
            navigate("/profile");
        }
    },[setUserInfo])
    return (
        <>
            <div className="h-[100vh] v-[100vw] flex items-center justify-center">
                <div className="h-[80vh] w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w[60vw] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl grid xl: grid-cols-1">
                    <div className="flex flex-col gap-10 items-center justify-center">
                        <div className="flex items-center justify-center flex-col">
                            <div className="flex items-center justify-center">
                                <h1 className="text-4xl text-orange-700 text-center text-wrap break-words m-10 font-bold md:text-4xl md:m-7 DIV_H1_D">Welcome To PulseChat</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <Tabs className="w-1/2 TABS_DIV" defaultValue="login">
                                <TabsList className="bg-transparent rounded-none w-full">
                                    <TabsTrigger value="login" className="data-[start=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[start=active]:text-black data-[start=active]:font-semibold data-[start=active]:border-b-purple-700 p-3 transition-all duration-300">Login</TabsTrigger>
                                    <TabsTrigger value="signup" className="data-[start=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[start=active]:text-black data-[start=active]:font-semibold data-[start=active]:border-b-purple-700 p-3 transition-all duration-300">Signup</TabsTrigger>
                                </TabsList>
                                <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                                    <Input required className="rounded-full p-6 focus:outline-none focus:border-transparent" type="email" placeholder="Enter User Email" value={email} onChange={e=>setEmail(e.target.value)} />
                                    <Input required className="rounded-full p-6 focus:outline-none focus:border-transparent" type="password" placeholder="Enter User Password" value={password} onChange={e=>setPassword(e.target.value)} />
                                    <Button className="rounded-full p-6 text-white font-bold text-xl bg-orange-700 hover:bg-orange-700" onClick={HandleLogin}>Login User</Button>
                                </TabsContent>
                                <TabsContent className="flex flex-col gap-5" value="signup">
                                    <Input required className="rounded-full p-6 focus:outline-none focus:border-transparent" type="email" placeholder="Enter User Email" value={email} onChange={e=>setEmail(e.target.value)} />
                                    <Input required className="rounded-full p-6 focus:outline-none focus:border-transparent" type="password" placeholder="Enter User Password" value={password} onChange={e=>setPassword(e.target.value)} />
                                    <Input required className="rounded-full p-6 focus:outline-none focus:border-transparent" type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
                                    <Button className="rounded-full p-6 text-white font-bold text-xl bg-orange-700 hover:bg-orange-700" onClick={HandleSignup}>Signup User</Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}