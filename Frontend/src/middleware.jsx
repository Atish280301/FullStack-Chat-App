import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
export const PrivateRoute = ({children}) => {
    const navigate= useNavigate()

    useEffect(()=>{
        const value = Cookies.get('jwt');
        if(!value){
            navigate("/auth");
        }
    },[])

    return (
        <>{children}</>
    )
}