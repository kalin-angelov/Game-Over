import styles from './Profile.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { MyGames } from './MyGames';
import { AuthContext } from '../../contexts/AuthContext';
import { getAll, deleteOne } from '../../service/gameService';
import { userGameCheck } from '../../utils/userGameCheck';

export const Profile = () => {
    const { 
        auth,
        userId,
        username,
        setLoader,
        setGameList
    
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ userGames, setUserGames ] = useState([]);
    const [ showDelete, setShowDelete ] = useState(false);

    useEffect(() => {
        getAll()
            .then(data => userGameCheck(data, userId))
            .then(data => setUserGames(data))
            .catch(error => console.log(`Error: ${error}`))
    },[userId]);

    const onDeleteGame = async (id) => {
        setLoader(true);
        try {
          await deleteOne(id, auth.accessToken);

          const games = await getAll();
          setGameList(games);

          const result = userGameCheck(games);
          setUserGames(result);

          onClickCloseDelete();
          setLoader(false);
          navigate('/profile');
    
        } catch (err) {
          console.log(`Error: ${err}`);
          setLoader(false);
        }
    };

    const onClickShowDelete = () => {
        setShowDelete(true);
      };
    
      const onClickCloseDelete = () => {
        setShowDelete(false);
      };

    return (
        <div className={styles.profile}>
            <h2>Welcome: {username}</h2>
            <Link to='/create'><p className={styles.brandLogo}></p></Link>
           
            <div className={styles.list}>
                <h3>Game's List</h3>
            
                {(userGames.length > 0 ) ?
                    <div className={styles.gameList}>
                        {userGames.map(game => 
                            <MyGames 
                                key={game._id} 
                                game={game}
                                showDelete={showDelete}
                                onDeleteGame={onDeleteGame}
                                onClickShowDelete={onClickShowDelete}
                                onClickCloseDelete={onClickCloseDelete}
                            />
                        )}  
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