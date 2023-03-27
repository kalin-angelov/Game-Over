import styles from './Profile.module.css';

import { Link } from 'react-router-dom';

export const MyGames = ({ game }) => {
    return (
        <div className={styles.myGames}>
            <h1>{game.title}</h1>

            <Link to={`/details/${game._id}`} >
                <img src={game.imageUrl} alt="{game.title}" />
            </Link>
        </div>
    );
};