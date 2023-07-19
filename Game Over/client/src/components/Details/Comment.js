import styles from './Comment.module.css';

import { EditCommentModal } from './EditCommentModal';

import { useState } from 'react';

export const Comment = ({
    commentInfo,
    username,
    onLikeComment,
    onDeleteComment,
    onSubmitEditComment
}) => {
    const [showEditCommentModal, setShowEditCommentModal] = useState(false);

    const onEditComment = () => {
        setShowEditCommentModal(true);
    };

    if (username === undefined) {
        username = 'Guest001';
    };

    const result = commentInfo.likes.find(x => x === username);

    return (
        <div className={styles.commentsInfo}>
            <div className={styles.userSection}>
                <header>
                    <img src="/images/userPic.png" alt="userPic" />
                    <h3>{commentInfo.user}</h3>
                </header>
                <ul>
                    {(commentInfo.user === username) ?
                        <>
                            <li><button className={styles.editComment} onClick={onEditComment}><i className="fa-solid fa-pen"></i></button></li>
                            <li><button className={styles.deleteComment} onClick={() => onDeleteComment(commentInfo._id)}><i className="fa-solid fa-trash"></i></button></li>
                            <li><span><i className="fa-brands fa-gratipay"></i> {commentInfo.likes.length}</span></li>
                        </>
                        :
                        <>
                            {!result &&
                                <li> <button className={styles.likeComment} onClick={() => onLikeComment(commentInfo._id, username)} ><i className="fa-solid fa-thumbs-up"></i></button></li>
                            }
                            <li><span><i className="fa-brands fa-gratipay"></i> {commentInfo.likes.length}</span></li>
                        </>
                    }
                </ul>
            </div>
            <dir className={styles.commentSection}>
                <p>{commentInfo.text}</p>
            </dir>
            <EditCommentModal
                commentInfo={commentInfo}
                showEditCommentModal={showEditCommentModal}
                setShowEditCommentModal={setShowEditCommentModal}
                onSubmitEditComment={onSubmitEditComment}
            />
        </div>
    );
};