import styles from './Catalog.module.css';

import { Link } from 'react-router-dom';

export const GameInfo = (game) => {
    return (
        <article className={styles.game}>
            <img src={game.imageUrl} alt={game.title} loading='lazy'/>

            <section className={styles.gameInfo}>
                <p className={styles.gameTitle} title={game.title}>Title: <span>{game.title}</span></p>
                <p>Help: <span>{game.help}</span></p>
                <p>Platform: <span>{game.platform}</span></p>
            </section>
            <section>
                <Link className={styles.optionsBtn} to={`/details/${game._id}`}>
                    <i className="fa-solid fa-circle-info"></i> 
                    Details
                </Link>

                <Link className={styles.optionsBtn} to={`/comments/${game._id}`}>
                    <i className="fa-solid fa-comment-dots"></i>
                    Comments
                </Link>
            </section>
        </article>
    );
};