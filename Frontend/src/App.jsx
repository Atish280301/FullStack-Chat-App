//frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import { Chat } from "./pages/chat/Chat";
import { Profile } from "./pages/profile/Profile";
import { useAppStore } from "./store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";
import { PrivateRoute } from "./middleware";
import Cookies from 'js-cookie';
export const App = () => {
    const { userInfo, setUserInfo, isLoggedOut } = useAppStore();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const value = Cookies.get('jwt');

    useEffect(() => {
        if (isLoggedOut) return;
        const getUserData = async () => {
            try {
                const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
                if (response.status === 200 && response.data.id) {
                    setUserInfo(response.data);
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setUserInfo(null);
                    navigate("/auth");
                }
            } finally {
                setLoading(false);
            }
        };
        if (!userInfo && value) {
            console.log('type1');
            
            getUserData();
        } else {
            setLoading(false);
        }
    }, [userInfo, setUserInfo, navigate, isLoggedOut]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </>
    );
};
