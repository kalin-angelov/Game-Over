import styles from './Header.module.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <header>
            <div className={styles.navigation}>
                <h1><Link to='/' >GAME OVER</Link></h1>

                {isAuthenticated && (
                    <ul>
                        <li className={styles.navBtn}> <Link to='/catalog'>Catalog</Link> </li>
                        <li className={styles.navBtn}> <Link to='/profile'>Profile</Link> </li>
                        <li className={styles.navBtn}> <Link to='/logout'>Logout</Link> </li>
                    </ul>
                )}

                {!isAuthenticated && (
                    <ul>
                        <li className={styles.navBtn}> <Link to='/catalog'>Catalog</Link> </li>
                        <li className={styles.navBtn}> <Link to='/login'>Login</Link> </li>
                        <li className={styles.navBtn}> <Link to='/register'>Register</Link> </li>
                    </ul>
                )}
            </div>
        </header>
    );
};