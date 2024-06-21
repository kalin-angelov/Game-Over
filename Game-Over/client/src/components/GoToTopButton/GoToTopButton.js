import styles from './GoToTopButton.module.css';

import { useState, useEffect } from 'react';

export const GoToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            (window.scrollY > 20) ?
                setIsVisible(true)
            :
                setIsVisible(false)
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[]);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    return(
        <button
            style={{display: isVisible ? 'block' : 'none'}}
            className={styles.toTop}
            title='Go Up'
            onClick={goToTop}
        >
            <i className="fa-solid fa-circle-arrow-up"></i>
        </button>
        
    );
}