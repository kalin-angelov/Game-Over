import { Link } from 'react-router-dom';

import { Game } from './Game';

export const Catalog = ({
    gamesList
}) => {
    return (
        <div id="games" className="catalog">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="titlePage">
                            <h2>Game's</h2>
                        </div>
                    </div>
                </div>
                {(gamesList.length > 0) ?
                    <div className='game-list'>
                        {gamesList.map(game => <Game key={game._id} {...game} />)}
                    </div>
                    :
                    <div className='no_games'>
                        <h3>Game Catalog Is Empty</h3>
                        <p> Be First To Add New Game! <Link to='/create'>Add Game</Link> </p>
                    </div>
                }
            </div>
        </div>
    );
};
