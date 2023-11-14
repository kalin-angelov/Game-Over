import styles from './Comment.module.css';

import { TimeAgo } from './TimeAgo';
import { EditCommentModal } from './EditCommentModal';

export const CommentContainer = ({
    auth,
    gameComments,
    showModal,
    showEditModal,
    onDeleteComment,
    onEditComment
    
}) => {

    return(
        <article className={styles.commentContainer}>
            {gameComments && gameComments.map(commentInfo =>
                <div className={styles.comment} key={commentInfo._id}>
                    <section className={styles.userSection}>
                        <img src='/images/userPic.png' alt='userPic' width={50} height={50} loading='lazy'/>
                        <p className={styles.username}>{commentInfo.user}</p>
                        <TimeAgo timestamp={commentInfo.date} />

                        <ul>
                            {(commentInfo.user === auth.username) ?
                                <>
                                    <li><button id={commentInfo._id} className={styles.editComment} onClick={(e) => showModal(e)}>Edit</button></li>
                                    <li><button className={styles.deleteComment} onClick={() => onDeleteComment(commentInfo._id)} >Delete</button></li>
                                    <li><span><i className='fa-brands fa-gratipay'></i> </span></li>
                                    
                                    {showEditModal === commentInfo._id && <EditCommentModal commentInfo={commentInfo} onEditComment={onEditComment} />}  
                                </>
                                :
                                <>
                                    {/* {!result &&
                                        <li> <button className={styles.likeComment} onClick={() => onLikeComment(commentInfo._id, username)} ><i className='fa-solid fa-thumbs-up'></i></button></li>
                                    } */}
                                    <li><span><i className='fa-brands fa-gratipay'></i> </span></li>
                                </>
                            }
                        </ul>
                    </section>
        
                    <section className={styles.commentMessage}>
                        <p>{commentInfo.text}</p>
                    </section>
                </div>
            )}
        </article> 
    );
}