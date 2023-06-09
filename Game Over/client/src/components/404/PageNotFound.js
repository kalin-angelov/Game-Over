import styles from './PageNotFound.module.css';

import { Link } from 'react-router-dom';

export const PageNotFound = () => {
    return (
        <div className={styles.ups}>
            <div className={styles.message}>
                <h2>404</h2>
                <h3>Page Not Found</h3>
                <p>
                        The Page You Are Looking For Doesn't Exist Or Another Error Occurred. Go.......
                        <Link to='/'>Home</Link>
                    </p>
            </div>
        </div>
    );
};