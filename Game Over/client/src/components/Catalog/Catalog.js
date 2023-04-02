import styles from './Catalog.module.css';

import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { Game } from './Game';
import { AuthContext } from '../../contexts/AuthContext';

export const Catalog = () => {
    const { gamesList, isAuthenticated } = useContext(AuthContext);

    return (
        <div className={styles.catalog}>
            <div className={styles.container}>
                
                <h2>Game's</h2>
                
                {(gamesList.length > 0) ?
                    <div className={styles.gameList}>
                        {gamesList.map(game => <Game key={game._id} {...game} />)}
                    </div>
                    :
                    <div className={styles.noGames}>
                        <h3>Game Catalog Is Empty</h3>
                        {isAuthenticated && <p> Be First To Add New Game! <Link to='/register'>Register</Link> </p>}
                    </div>
                }
            </div>
        </div>
    );
};