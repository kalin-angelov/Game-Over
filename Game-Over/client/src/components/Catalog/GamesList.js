import styles from "./Catalog.module.css";

import { useContext } from "react";

import { GameInfo } from "./GameInfo";
import { AuthContext } from '../../contexts/AuthContext';

export const GamesList = () => {
    const { gamesList, searchResult } = useContext(AuthContext);

    return (
        <section className={styles.gamesSection}>
            {(searchResult !== null) ?

                (searchResult.length > 0) ?
                    <div className={styles.gameList}>
                        {searchResult.map(game => <GameInfo key={game._id} {...game} />)}
                    </div>
                :
                    <p className={styles.noGames}>
                        How disappointing, there is nothing here :(
                    </p>
            :
                (gamesList.length > 0) ?
                    <div className={styles.gameList}>
                        {gamesList.map(game => <GameInfo key={game._id} {...game} />)}
                    </div>
                :
                    <p className={styles.noGames}>
                        How sad, the catalog is empty :(
                    </p>
            }
        </section>
    );
};