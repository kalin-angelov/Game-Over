import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { MyGames } from './MyGames';
import { AuthContext } from '../../contexts/AuthContext';

export const Profile = ({
    gamesList
}) => {
    const { username } = useContext(AuthContext);

    return (
        <div className="profile">
            <div className="titlePage">
                <h2>Welcome: {username}</h2>
            </div>
            <div className="brand-logo"></div>
            <div className="list">
                <h3>Game's List</h3>
            </div>
            
            {(gamesList.length > 0 ) ?
                <div className='games-list'>
                    {gamesList.map(game => <MyGames key={game._id} game={game}/>)}  
                </div>
                :
                <div className='no_games'>
                    <h3>Your List Is Empty</h3>
                    <p> You Can Change That From Here! <Link to='/create'>Add Game</Link> </p>
                </div> 
            }
        </div>
    );
};
