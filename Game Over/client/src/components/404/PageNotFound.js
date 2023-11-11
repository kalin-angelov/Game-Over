import styles from './PageNotFound.module.css';

import { Link } from 'react-router-dom';

export const PageNotFound = () => {
    return (
        <section className={styles.ups}>
            <h2>404</h2>
            <img src="images/404.jpg" alt="Broken controller" />
            <h3>Page Not Found</h3>
            <p>
                The page you are looking for doesn't exist or another error occurred. Go.......
                <Link to='/'>Home</Link>
            </p>
        </section>
    );
};