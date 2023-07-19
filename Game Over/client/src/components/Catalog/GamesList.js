import styles from "./GamesList.module.css";

import { Link } from "react-router-dom";
import { useContext } from "react";

import { GameInfo } from "./GameInfo";
import { AuthContext } from '../../contexts/AuthContext';

export const GamesList = () => {
    const { gamesList, isAuthenticated } = useContext(AuthContext);

    return (
        <>
            {(gamesList.length > 0) ?
                <div className={styles.gameList}>
                    {gamesList.map(game => <GameInfo key={game._id} {...game} />)}
                </div>
                :
                <div className={styles.noGames}>
                    <h3>Game Catalog Is Empty</h3>
                    {isAuthenticated && 
                        <p> Be First To Add New Game! 
                            <Link to='/register'>Register</Link> 
                        </p>
                    }
                </div>
            }
        </>
    );
};