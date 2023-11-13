import styles from './Comment.module.css';

import { Link } from 'react-router-dom';

export const CommentTextarea = ({
    game,
    commentText,
    setCommentText,
    onAddComment
}) => {
    return (
        <div className={styles.commentsInfo}>

            <Link
                to={`/details/${game._id}`}
                className={styles.gameDetailsLinkIcon} 
                title="Game Details">
                <i className="fa-solid fa-gamepad"></i>
            </Link>

            <div className={styles.gameInformation}>
                <img src={game.imageUrl} alt='userPic' width={300} height={250}/>
                <p><span>Problem: </span>{game.summary}</p>
            </div>
            <form className={styles.commentForm} onSubmit={onAddComment}>
                <label htmlFor='commentArea' style={{display: 'none'}}></label>
                <textarea
                    id='commentArea'
                    placeholder='Message'
                    type='text'
                    name='comment'
                    role='textbox'
                    rows={5}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button type='submit' className={styles.send}>Send</button>
            </form>
        </div>
    );
}