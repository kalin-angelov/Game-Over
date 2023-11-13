import styles from './Comment.module.css';

export const CommentContainer = ({
    auth,
    gameComments,
    onDeleteComment,
}) => {

    return(
        <article className={styles.commentContainer}>
            {gameComments && gameComments.map(commentInfo =>
                <div className={styles.comment} key={commentInfo._id}>
                    <section className={styles.userSection}>
                        <img src='/images/userPic.png' alt='userPic' width={50} height={50} loading='lazy'/>
                        <p className={styles.username}>{commentInfo.user}</p>
                        <p>
                            <i className='fa-regular fa-calendar-days'></i> -
                            { commentInfo.createdAt }
                        </p>

                        <ul>
                            {(commentInfo.user === auth.username) ?
                                <>
                                    <li><button className={styles.editComment} ><i className='fa-solid fa-pen'></i></button></li>
                                    <li><button className={styles.deleteComment} onClick={() => onDeleteComment(commentInfo._id)} ><i className='fa-solid fa-trash'></i></button></li>
                                    <li><span><i className='fa-brands fa-gratipay'></i> </span></li>
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