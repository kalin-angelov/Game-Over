import styles from './Header.module.css';

import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { Search } from './Search';

export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    const onClickUserMenu = () => {
        setShowMenu(!showMenu);
    };

    const onClickFromUserMenu = () => {
        setShowMenu(false);
    };

    const handleClickOutside = (e) => {
        console.log(dropdownRef.current.contains(e.target));
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    },[]);

    return (
        <header>
            <section className={styles.navSection}>
                <Link className={styles.headline} to='/'>GAME OVER</Link>
                <Search />
                <nav className={styles.navBar}>
                    {isAuthenticated ?
                        <div ref={dropdownRef}>
                            <button type='button' onClick={onClickUserMenu}>
                                <img className={styles.navUserImg} src='images/userPic.png' alt='User Img' width={40} height={40} />
                            </button>
                            {showMenu &&
                                <ul className={styles.dropMenu}>
                                    <li onClick={onClickFromUserMenu}> 
                                        <Link className={styles.navLink} to='/profile'>
                                           Profile
                                        </Link> 
                                    </li>
                                    <li onClick={onClickFromUserMenu}> 
                                        <Link className={styles.navLink} to='/create'>
                                          Create Post
                                        </Link> 
                                    </li>
                                    <li onClick={onClickFromUserMenu}> 
                                        <Link className={styles.navLink} to='/logout'>
                                          Logout
                                        </Link> 
                                    </li>
                                </ul>
                            }
                        </div>
                    :
                        <Link className={styles.navLink} to='/login'>
                            <p className={styles.navMiniSection}>
                                <i className='fa-solid fa-arrow-right-to-bracket'></i>
                            </p>
                            <p className={styles.navMiniSection}>
                                Sign In
                            </p>
                        </Link> 
                    }
                </nav>
            </section>
        </header>
    );
};