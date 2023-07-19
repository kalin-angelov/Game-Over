import styles from './Details.module.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { Comment } from './Comment';

import { getOne } from '../../service/gameService';
import { addOneComment, getOneComment, getAllComments, likeComment, deleteComment, updateComment } from '../../service/gameCommentService';
import { useForm } from '../../hooks/useForm';

export const Details = () => {
    const { username,setLoader } = useContext(AuthContext);
    const { gameId } = useParams();
    const { formValue, onFormValueChange } = useForm({ comment: '' })
    const [ game, setGame ] = useState([]);
    const [ commentsList, setCommentsList ] = useState([]);
  
    useEffect(() => {
        getOne(gameId)
            .then(data => setGame(data))
            .catch(err => console.log(err))
        getAllComments(gameId)
            .then(data => setCommentsList(Object.values(data)))
            .catch(err => console.log(err))
    }, [gameId]);

    const onSubmitComment = async (e) => {
        e.preventDefault();
        setLoader(true);

        const commentBody = {
            user: '',
            text: formValue.comment,
            likes: []
        }

        username === undefined ? commentBody.user = 'Guest001' : commentBody.user = username;

        if (commentBody.text !== '') {
            await addOneComment(gameId, commentBody);
            const comments = await getAllComments(gameId);
            setCommentsList(Object.values(comments));
            setLoader(false);

            formValue.comment = '';
        } else {
            setLoader(false);
            return;
        }

    };

    const onLikeComment = async (id, username) => {
        const comment = await getOneComment(gameId, id);
        const likes = comment.likes;

        if (!username) {
            comment.likes = ([...likes, 'Guest001']);
        } else {
            comment.likes = ([...likes, username]);
        }
        await likeComment(gameId, id, comment);
        const comments = await getAllComments(gameId);
        setCommentsList(Object.values(comments));
    };

    const onDeleteComment = async (id) => {
        await deleteComment(gameId, id);

        const comments = await getAllComments(gameId);
        setCommentsList(Object.values(comments));
    };

    const onSubmitEditComment = async (e, body) => {
        e.preventDefault();
        const id = body._id;

        await updateComment(gameId, id, body);
        const comments = await getAllComments(gameId);

        setCommentsList(Object.values(comments));
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
                </div>
            </div>

            
            <form className={styles.commentForm} onSubmit={onSubmitComment}>
                <textarea
                    placeholder="comment..."
                    type="text" 
                    name="comment"
                    value={formValue.comment}
                    onChange={onFormValueChange}
                ></textarea>
                <button className={styles.send}>Send</button>
            </form>

            <div className={styles.commentContainer}>
                {commentsList && commentsList.map(commentInfo =>
                    <Comment
                        key={commentInfo._id}
                        username={username}
                        commentInfo={commentInfo}
                        onLikeComment={onLikeComment}
                        onDeleteComment={onDeleteComment}
                        onSubmitEditComment={onSubmitEditComment}
                    />
                )}
            </div>

        </div>
    );
};