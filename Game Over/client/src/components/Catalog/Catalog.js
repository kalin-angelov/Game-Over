import styles from './Catalog.module.css';

import { Games } from './Games';

export const Catalog = () => {
    return (
        <div className={styles.catalog}>
            <h2>Game's</h2>
            <Games />
        </div>
    );
};