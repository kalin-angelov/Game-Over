import styles from './Catalog.module.css';

import { Link } from 'react-router-dom';

export const Game = (game) => {
    return (
        <div className={styles.game}>
            <Link to={`/details/${game._id}`} state={game}>
                <img src={game.imageUrl} alt="{game.title}" />
            </Link>
            
            <div className={styles.gameInfo}>
                <h3>Title: {game.title}</h3>
                <p>Help: {game.help}</p>
                <p>Platform: {game.platform}</p>
            </div>
        </div>
    );
};