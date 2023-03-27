import styles from './Profile.module.css';

import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { MyGames } from './MyGames';
import { AuthContext } from '../../contexts/AuthContext';
import { getAll } from '../../service/gameService';
import { userGameCheck } from '../../utils/userGameCheck';

export const Profile = () => {
    const { username, userId } = useContext(AuthContext);
    const [ userGames, setUserGames ] = useState([]);

    useEffect(() => {
        getAll()
            .then(data => userGameCheck(data, userId))
            .then(data => setUserGames(data))
            .catch(error => console.log(`Error: ${error}`))
    },[userId]);

    return (
        <div className={styles.profile}>
            <h2>Welcome: {username}</h2>
            <Link to='/create'><p className={styles.brandLogo}></p></Link>
           
            <div className={styles.list}>
                <h3>Game's List</h3>
            
                {(userGames.length > 0 ) ?
                    <div className={styles.gameList}>
                        {userGames.map(game => <MyGames key={game._id} game={game}/>)}  
                    </div>
                    :
                    <div className={styles.noGames}>
                        <h3>Your List Is Empty</h3>
                        <p> You Can Change That By Clicking On The Big Red Button!</p>
                    </div> 
                }
            </div>
        </div>
    );
};