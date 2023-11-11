import styles from './Details.module.css';

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { Comment } from './Comment';

import { getOne } from '../../service/gameService';
import { addOneComment, getOneComment, getAllComments, likeComment, deleteComment, updateComment } from '../../service/gameCommentService';
import { useForm } from '../../hooks/useForm';

export const Details = () => {
    const { auth } = useContext(AuthContext);
    const { gameId } = useParams();
    const { formValue, onFormValueChange } = useForm({ comment: '' })
    const [game, setGame] = useState([]);
    const [commentsList, setCommentsList] = useState([]);

    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fullDate = [day, month, year].join('-');

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

        const commentBody = {
            user: '',
            text: formValue.comment,
            likes: [],
            createdAt: fullDate
        }

        auth.username === undefined ? commentBody.user = 'Guest001' : commentBody.user = auth.username;

        if (commentBody.text !== '') {
            await addOneComment(gameId, commentBody);
            const comments = await getAllComments(gameId);
            setCommentsList(Object.values(comments));

            formValue.comment = '';
        } else {
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
        <article className={styles.game} style={{
            backgroundImage: `url(${game.imageUrl})`
          }}>
            <Link
                className={styles.commentLinkIcon} 
                title="Comment Section">
                <i class="fa-solid fa-comment-dots"></i>
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

                {/* <div className={styles.commentsInfo}>
                    <div className={styles.userSection}>
                        <img src="/images/userPic.png" alt="userPic" width={50} height={50}/>
                        <h3>{auth.username}</h3>
                        <p>
                            <i class="fa-regular fa-calendar-days"></i> -
                            {fullDate}
                        </p>
                    </div>
                    <form className={styles.commentForm} onSubmit={onSubmitComment}>
                        <textarea
                            placeholder="comment..."
                            type="text"
                            name="comment"
                            value={formValue.comment}
                            onChange={onFormValueChange}
                        ></textarea>
                        <button type='submit' className={styles.send}>Send</button>
                    </form>
                </div> */}
            </section>
            
            {/* <section className={styles.commentContainer}>
                {commentsList && commentsList.map(commentInfo =>
                    <Comment
                        key={commentInfo._id}
                        username={auth.username}
                        commentInfo={commentInfo}
                        onLikeComment={onLikeComment}
                        onDeleteComment={onDeleteComment}
                        onSubmitEditComment={onSubmitEditComment}
                    />
                )}
            </section> */}
        </article>
    );
};