import styles from './Details.module.css';

import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { Comment } from './Comment';
import { DeleteButton } from './DeleteButton';
import { getOne } from '../../service/gameService';
import { addOneComment, getAllComments } from '../../service/gameCommentService';
import { useForm } from '../../hooks/useForm';

export const Details = () => {
    const {
        userId,
        username,
        setLoader,
        showDelete,
        onDeleteGame,
        onClickShowDelete,
        onClickCloseDelete,
    } = useContext(AuthContext);
    const { gameId } = useParams();
    const { formValue, onFormValueChange } = useForm({ comment: '' })
    const [game, setGame] = useState([]);
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        getOne(gameId)
            .then(data => setGame(data))
            .catch(err => console.log(err))
        getAllComments(gameId)
            .then(data => setCommentsList(data))
            .catch(err => console.log(err))
    }, [gameId]);

    const onSubmitComment = async (e) => {
        e.preventDefault();
        setLoader(true);

        const commentBody = {
            user: '',
            text: formValue.comment
        }

        username === undefined ? commentBody.user = 'Unknown' : commentBody.user = username;

        if (commentBody.text !== '') {
            setCommentsList(commentsList => ([...commentsList, commentBody]));
            addOneComment(gameId, commentBody);
            setLoader(false);

            formValue.comment = '';
        } else {
            setLoader(false);
            return;
        }

    };

    return (
        <div className={styles.details}>

            <h1>{game.title}</h1>
            <div className={styles.detailsInfo}>
                <img src={game.imageUrl} alt={game.title} />

                <div className={styles.gameInfo}>
                    <p>Type: {game.genre}</p>
                    <p>Platform: {game.platform}</p>
                    <p>Number Of Players: {game.players}</p>
                    <p>Help: {game.help}</p>
                    <p>Description: {game.summary}</p>
                    {(userId === game._ownerId) &&
                        <>
                            <Link to={`/edit/${game._id}`} state={game} >Edit</Link>
                            <Button variant="primary" onClick={onClickShowDelete} >Delete</Button>
                        </>
                    }
                </div>
            </div>

            <DeleteButton
                showDelete={showDelete}
                onClickCloseDelete={onClickCloseDelete}
                onDeleteGame={onDeleteGame}
            />
            <div className={styles.commentContainer}>

                {commentsList && commentsList.map(commentInfo => <Comment {...commentInfo} />)}

            </div>
            <form className={styles.commentForm} onSubmit={onSubmitComment}>
                <textarea
                    rows="5"
                    cols="5"
                    className={styles.comment}
                    placeholder="comment..."
                    type="text" name="comment"
                    value={formValue.comment}
                    onChange={onFormValueChange}
                ></textarea>

                <article>
                    <button className={styles.send}>Send</button>
                </article>
            </form>
        </div>
    );
};