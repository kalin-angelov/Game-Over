import styles from './Catalog.module.css';

import { Link } from 'react-router-dom';

export const GameInfo = (game) => {
    return (
        <div className={styles.game}>
            <img src={game.imageUrl} alt={game.title} />

            <div className={styles.gameInfo}>
                <h3>Title: {game.title}</h3>
                <p>Help: {game.help}</p>
                <p>Platform: {game.platform}</p>
            </div>

            <a>
                <Link to={`/details/${game._id}`} state={game}>
                    <i class="fa-solid fa-circle-info"></i>
                    Details
                </Link>
            </a>
        </div>
    );
};