import styles from './Comment.module.css';

import { TimeAgo } from './TimeAgo';
import { EditCommentModal } from './EditCommentModal';

export const CommentContainer = ({
    auth,
    gameComments,
    showModal,
    onSortByPopular,
    onSortByNewest,
    onSortByOldest,
    showEditModal,
    onDeleteComment,
    onEditComment,
    onLikeComment,
    isAuthenticated
}) => {
    return(
        <div className={styles.commentContainer}>
            {gameComments.length !== 0 &&
                <div>
                    <button className={styles.sortByBtn} onClick={onSortByPopular}>popular</button>
                    <button className={styles.sortByBtn} onClick={onSortByNewest}>newest</button>
                    <button className={styles.sortByBtn} onClick={onSortByOldest}>oldest</button>
                </div>
            }
            {gameComments && gameComments.map(commentInfo =>
                <div className={styles.comment} key={commentInfo._id}>
                    <div className={styles.userSection}>
                        <div className={styles.user}>
                            <img src='/images/userPic.png' alt='userPic' width={50} height={50} loading='lazy'/>
                            <p className={styles.username}>{commentInfo.user}</p>
                        </div>

                        <TimeAgo timestamp={commentInfo.date} />

                        <ul>
                            {(commentInfo.user === auth.username) ?
                                <>
                                    <li><button id={commentInfo._id} className={styles.editComment} onClick={(e) => showModal(e)}>Edit</button></li>
                                    <li><button className={styles.deleteComment} onClick={() => onDeleteComment(commentInfo._id)} >Delete</button></li>
                                    <li><span><i className='fa-brands fa-gratipay'></i> {commentInfo.likes.length}</span></li>
                                    
                                    {showEditModal === commentInfo._id && <EditCommentModal commentInfo={commentInfo} onEditComment={onEditComment} />}  
                                </>
                                :
                                <>
                                    {(commentInfo.likes.length === 0 || !commentInfo.likes.find(username => username === auth.username)) && isAuthenticated ?
                                        <li> <button className={styles.likeComment} onClick={() => onLikeComment(commentInfo._id, auth.username)} ><i className='fa-solid fa-thumbs-up'></i></button></li>
                                        :
                                        null
                                    }
                                    <li><span><i className='fa-brands fa-gratipay'></i> {commentInfo.likes.length}</span></li>
                                </>
                            }
                        </ul>
                    </div>
        
                    <div className={styles.commentMessage}>
                        <p>{commentInfo.text}</p>
                    </div>
                </div>
            )}
        </div> 
    );
};





