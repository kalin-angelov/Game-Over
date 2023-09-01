import styles from './ReplyComment.module.css';

export const ReplyComment = () => {
    const username = 'Kalin';
    const result = 0;

    return(
        <div className={styles.replyCommentsInfo}>
            <div className={styles.replyUserSection}>
                <header>
                    <img src="/images/userPic.png" alt="userPic" />
                    <h3>User</h3>
                    <p>
                    <i class="fa-regular fa-calendar-days"></i> -
                       12/01/25
                    </p>
                </header>
                <ul>
                    {(username) ?
                        <>
                            <li><button className={styles.editReplyComment} ><i className="fa-solid fa-pen"></i></button></li>
                            <li><button className={styles.deleteReplyComment} ><i className="fa-solid fa-trash"></i></button></li>
                            <li><span><i className="fa-brands fa-gratipay"></i> 10</span></li>
                        </>
                        :
                        <>
                            <li> <button className={styles.reply}>Reply</button></li>
                            {!result &&
                                <li> <button className={styles.likeComment} ><i className="fa-solid fa-thumbs-up"></i></button></li>
                            }
                            <li><span><i className="fa-brands fa-gratipay"></i> 10</span></li>
                        </>
                    }
                </ul>
            </div>
            <div className={styles.replyCommentSection}>
                <p>Cool Thanks</p>
            </div>
            {/* <EditCommentModal
                commentInfo={commentInfo}
                showEditCommentModal={showEditCommentModal}
                setShowEditCommentModal={setShowEditCommentModal}
                onSubmitEditComment={onSubmitEditComment}
            /> */}
        </div>
    );
}