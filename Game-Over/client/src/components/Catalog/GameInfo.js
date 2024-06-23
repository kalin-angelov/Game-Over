import styles from './Catalog.module.css';

import { Link } from 'react-router-dom';

export const GameInfo = (game) => {
    return (
        <div className={styles.game}>
            <img src={game.imageUrl} alt={game.title} loading='lazy'/>

            <section className={styles.gameInfo}>
                <h2 className={styles.gameTitle} title={game.title}>Title: <span>{game.title}</span></h2>
                <p>Help: <span>{game.help}</span></p>
                <p>Platform: <span>{game.platform}</span></p>
            </section>
            <ul className={styles.optBtnContainer}>
                <li>
                    <Link className={styles.optionsBtn} to={`/details/${game._id}`}>
                        <i className="fa-solid fa-circle-info"></i> 
                        Details
                    </Link>
                </li>

                <li>
                    <Link className={styles.optionsBtn} to={`/comments/${game._id}`}>
                        <i className="fa-solid fa-comment-dots"></i>
                        Comments
                    </Link>
                </li>
            </ul>
        </div>
    );
};
