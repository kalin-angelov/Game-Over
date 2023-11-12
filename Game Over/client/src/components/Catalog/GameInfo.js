import styles from './Catalog.module.css';

import { Link } from 'react-router-dom';

export const GameInfo = (game) => {
    return (
        <article className={styles.game}>
            <img src={game.imageUrl} alt={game.title} loading='lazy'/>

            <section className={styles.gameInfo}>
                <p>Title: <span>{game.title}</span></p>
                <p>Help: <span>{game.help}</span></p>
                <p>Platform: <span>{game.platform}</span></p>
            </section>

            <Link className={styles.detailsBtn} to={`/details/${game._id}`}>
                <i className="fa-solid fa-circle-info"></i> 
                Details
            </Link>
        </article>
    );
};