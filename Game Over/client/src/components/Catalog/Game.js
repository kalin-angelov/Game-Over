import styles from './Catalog.module.css';

import { Link } from 'react-router-dom';

export const Game = (game) => {
    return (
        <div className={styles.game}>
            <img src={game.imageUrl} alt="{game.title}" />

            <div className={styles.gameInfo}>
                <h3>{game.title}</h3>
                <p>Players: {game.players}</p>
                <p>Platform: {game.platform}</p>
                <p>Genre: {game.genre}</p>
                <Link to={`/details/${game._id}`} state={game}>Details</Link>
            </div>
        </div>
    );
};