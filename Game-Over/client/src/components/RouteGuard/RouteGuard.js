import { Outlet, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export const RouteGuard = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        navigate('/404');
    }

    return <Outlet />
};