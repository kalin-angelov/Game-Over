import styles from "./GamesList.module.css";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { Search } from './Search';
import { GameInfo } from "./GameInfo";
import { AuthContext } from '../../contexts/AuthContext';

export const GamesList = () => {
    const { gamesList, isAuthenticated } = useContext(AuthContext);
    const [ searchResult, setSearchResult ] = useState(null);

    const getSearchResult = (result) => {
        setSearchResult(result);
    };

    return (
        <>
           <Search getSearchResult={getSearchResult} />
            {(searchResult !== null) ?

                (searchResult.length > 0) ?
                    <div className={styles.gameList}>
                        {searchResult.map(game => <GameInfo key={game._id} {...game} />)}
                    </div>
                :
                    <div className={styles.noGames}>
                        <h3>There Are No Result's</h3>
                    </div>
                
            :

                (gamesList.length > 0) ?
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
            };
        </>
    );
};