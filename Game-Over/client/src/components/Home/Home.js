import styles from './Home.module.css'; 

import { Catalog } from '../Catalog/Catalog';

export const Home = () => {
    return (
       <main>
            <section className={styles.home}>   
                <h2>Welcome To Game Over</h2>
                <p className={styles.information}>Here you can find or give advice on how to beat the games that are giving you a hard time </p>
            </section>
            <Catalog />
       </main>
    );
};