import styles from './Catalog.module.css';

import { GamesList } from './GamesList';

export const Catalog = () => {
    return (
        <div className={styles.catalog}>
            <h2>Game's</h2>
            <GamesList />
        </div>
    );
};