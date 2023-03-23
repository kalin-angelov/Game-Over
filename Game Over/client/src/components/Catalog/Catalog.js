import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { Game } from './Game';
import { AuthContext } from '../../contexts/AuthContext';

export const Catalog = () => {
    const { gamesList, isAuthenticated } = useContext(AuthContext);

    return (
        <div id="games" className="catalog">
            <div className="container">
                <div className="titlePage">
                    <h2>Game's</h2>
                </div>
                {(gamesList.length > 0) ?
                    <div className='game-list'>
                        {gamesList.map(game => <Game key={game._id} {...game} />)}
                    </div>
                    :
                    <div className='no_games'>
                        <h3>Game Catalog Is Empty</h3>
                        {isAuthenticated && <p> Be First To Add New Game! <Link to='/create'>Add Game</Link> </p>}
                    </div>
                }
            </div>
        </div>
    );
};
