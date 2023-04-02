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
            <div className={styles.likes}>
                {(commentInfo.user === username) ?
                    <>
                        <button className={styles.editComment} onClick={onEditComment}>Edit</button>
                        <button className={styles.deleteComment} onClick={() => onDeleteComment(commentInfo._id)}>Delete</button>
                        <span>Likes: {commentInfo.likes.length}</span>
                    </>
                    :
                    <>
                        {!result && 
                            <button className={styles.likeComment} onClick={() => onLikeComment(commentInfo._id, username)} >Like</button>
                        }
                        <span>Likes: {commentInfo.likes.length}</span>
                    </>
                }

            </div>

            <img src="/images/userPic.png" alt="userPic" />

            <h3>{commentInfo.user}:</h3>
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