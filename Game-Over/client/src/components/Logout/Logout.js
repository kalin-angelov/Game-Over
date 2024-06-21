import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export const Logout = () => {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        setAuth({});
    }, [setAuth])

    return <Navigate to='/' />
};