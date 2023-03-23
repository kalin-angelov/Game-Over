import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';


export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);
    
    return (
        <header>
            <div className="header-top">
                <div className="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                                <div className="full">
                                    <div className="center-desk">
                                        <div className="logo">
                                            <Link to='/' >GAME OVER</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                                {isAuthenticated && (
                                    <ul className="top_icon">
                                        <li className="button_catalog"> <Link to='/catalog'>Catalog</Link> </li>
                                        <li className="button_profile"> <Link to='/profile'>Profile</Link> </li>
                                        <li className="button_logout"> <Link to='/logout'>Logout</Link> </li>
                                    </ul>
                                )}
                                {!isAuthenticated && (
                                    <ul className="top_icon">
                                        <li className="button_catalog"> <Link to='/catalog'>Catalog</Link> </li>
                                        <li className="button_login"> <Link to='/login'>Login</Link> </li>
                                        <li className="button_register"> <Link to='/register'>Register</Link> </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};