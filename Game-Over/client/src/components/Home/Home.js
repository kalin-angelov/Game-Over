import styles from './Home.module.css'; 

import { Catalog } from '../Catalog/Catalog';

export const Home = () => {
    return (
       <main>
            <section className={styles.home}>   
                <h2>Welcome To Game Over</h2>
                <p>Were The Game Is Never Over</p>
            </section>
            <Catalog />
       </main>
    );
};