import styles from './Header.module.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { Search } from './Search';

export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <header>
            <section className={styles.navSection}>
                <Link to='/'><h1>GAME OVER</h1></Link>
                <Search />
                <nav className={styles.navBar}>
                    {isAuthenticated ?
                        <ul>
                            <li className={styles.navIcon}> 
                                <Link className={styles.navLink} to='/profile'>
                                    <p className={styles.navMiniSection}>
                                        <i className="fa-solid fa-user"></i>
                                    </p>
                                    <p className={styles.navMiniSection}>
                                        Profile
                                    </p>
                                </Link> 
                            </li>
                            <li className={styles.navIcon}> 
                                <Link className={styles.navLink} to='/logout'>
                                    <p className={styles.navMiniSection}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </p>
                                    <p className={styles.navMiniSection}>
                                        Logout
                                    </p>
                                </Link> 
                            </li>
                        </ul>
                    :
                        <ul>
                            <li className={styles.navIcon}> 
                                <Link className={styles.navLink} to='/login'>
                                    <p className={styles.navMiniSection}>
                                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                    </p>
                                    <p className={styles.navMiniSection}>
                                        Sign In
                                    </p>
                                </Link> 
                            </li>
                            <li className={styles.navIcon}> 
                                <Link className={styles.navLink} to='/register'>
                                    <p className={styles.navMiniSection}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </p>
                                    <p className={styles.navMiniSection}>
                                        Register
                                    </p>
                                </Link> 
                            </li>
                        </ul>
                    }
                </nav>
            </section>
        </header>
    );
};