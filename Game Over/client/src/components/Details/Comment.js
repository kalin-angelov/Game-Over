import styles from './Details.module.css';

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
            <header>
                <img src="/images/userPic.png" alt="userPic" />
                <h3>{commentInfo.user}</h3>
            </header>
            <ul>
                {(commentInfo.user === username) ?
                    <>
                        <li><button className={styles.editComment} onClick={onEditComment}><i class="fa-solid fa-pen"></i></button></li>
                        <li><button className={styles.deleteComment} onClick={() => onDeleteComment(commentInfo._id)}><i class="fa-solid fa-trash"></i></button></li>
                        <li><span><i class="fa-brands fa-gratipay"></i> {commentInfo.likes.length}</span></li>
                    </>
                    :
                    <>
                        {!result &&
                            <li> <button className={styles.likeComment} onClick={() => onLikeComment(commentInfo._id, username)} ><i class="fa-solid fa-thumbs-up"></i></button></li>
                        }
                        <li><span><i class="fa-brands fa-gratipay"></i> {commentInfo.likes.length}</span></li>
                    </>
                }
            </ul>

            <p>{commentInfo.text}</p>
            
            <EditCommentModal
                commentInfo={commentInfo}
                showEditCommentModal={showEditCommentModal}
                setShowEditCommentModal={setShowEditCommentModal}
                onSubmitEditComment={onSubmitEditComment}
            />
        </div>
    );
};