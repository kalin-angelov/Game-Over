import styles from './GameInfo.module.css';

import { Link } from 'react-router-dom';

export const GameInfo = (game) => {
    return (
        <div className={styles.game}>
            <img src={game.imageUrl} alt={game.title} />

            <div className={styles.gameInfo}>
                <h3>Title: <span>{game.title}</span></h3>
                <p>Help: <span>{game.help}</span></p>
                <p>Platform: <span>{game.platform}</span></p>
            </div>

            <Link className={styles.detailsBtn} to={`/details/${game._id}`} state={game}>
                <i className="fa-solid fa-circle-info"></i> 
                Details
            </Link>
        </div>
    );
};