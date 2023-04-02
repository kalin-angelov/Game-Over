import styles from './Profile.module.css';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { DeleteButton } from './DeleteButton';

export const MyGames = ({ 
    game,
    showDelete,
    onDeleteGame,
    onClickShowDelete,
    onClickCloseDelete
 }) => {
    return (
        <div className={styles.myGames}>
            <h1>{game.title}</h1>
            
            <Link to={`/details/${game._id}`} >
                <img src={game.imageUrl} alt={game.title} />
            </Link>
            <div className={styles.buttonControl}>
                <Link to={`/edit/${game._id}`} state={game} >Edit</Link>
                <Button variant="primary" onClick={onClickShowDelete} >Delete</Button>
            </div>

            <DeleteButton
                {...game}
                showDelete={showDelete}
                onClickCloseDelete={onClickCloseDelete}
                onDeleteGame={onDeleteGame}
            />
        </div>
    );
};