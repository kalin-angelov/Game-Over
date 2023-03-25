import styles from './Loader.module.css';

import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const Loader = () => {
   const { loader } = useContext(AuthContext);
    return (
        <>
            {loader &&
                <div className={styles.loader}>
                    <div className={styles.loaderSpinner}><img src="images/loading-6.gif" alt="spinner" /></div>
                </div>
            }
        </>
    );
};