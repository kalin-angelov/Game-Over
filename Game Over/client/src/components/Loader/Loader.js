import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const Loader = () => {
   const { loader } = useContext(AuthContext);
    return (
        <>
            {loader &&
                <div className="loader_bg">
                    <div className="loader"><img src="images/loading-6.gif" alt="spinner" /></div>
                </div>
            }
        </>
    );
};