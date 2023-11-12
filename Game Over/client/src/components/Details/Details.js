import styles from './Details.module.css';

import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { getOne } from '../../service/gameService';
import { AuthContext } from '../../contexts/AuthContext';

export const Details = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState([]);
    const { setGameComments } = useContext(AuthContext)

    useEffect(() => {
        getOne(gameId)
            .then(data => setGame(data))
            .then(setGameComments(game.comments))
            .catch(err => console.log(err))
    }, [gameId]);


    return (
        <article className={styles.game} style={{
            backgroundImage: `url(${game.imageUrl})`
          }}>

            <Link
                to={`/comments/${game._id}`}
                className={styles.commentLinkIcon} 
                title="Comment Section">
                <i className="fa-solid fa-comment-dots"></i>
            </Link>
            <section className={styles.gameInfo}>
                <img src={game.imageUrl} alt={game.title} width={500} height={500} />
                <ul>
                    <li>Title:<span>{game.title}</span></li>
                    <li>Type: <span>{game.genre}</span></li>
                    <li>Platform: <span>{game.platform}</span></li>
                    <li>Number Of Players: <span>{game.players}</span></li>
                    <li>Help: <span>{game.help}</span></li>
                    <li>Description: <span>{game.summary}</span></li>
                </ul>

               
            </section>
        </article>
    );
};