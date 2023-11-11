import styles from './Catalog.module.css';

import { GamesList } from './GamesList';

export const Catalog = () => {
    return (
        <section className={styles.catalog}>
            <GamesList />

            <a className={styles.toTop} href='#' title='Go Up' ><i className="fa-solid fa-circle-arrow-up"></i></a>
        </section>
    );
};