import styles from './Comment.module.css';

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useForm} from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

export const Comments = () => {
    const { gameId } =useParams();
    const { auth, gameComments, setGameComments } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({ comment: '' })

    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fullDate = [day, month, year].join('-');

    const onSubmitComment = async (e) => {
        e.preventDefault();

        const commentBody = {
            user: auth.username,
            text: formValue.comment,
            createdAt: fullDate
        }


    };

    // const onLikeComment = async (id, username) => {
    //     const comment = await getOneComment(gameId, id);
    //     const likes = comment.likes;

    //     if (!username) {
    //         comment.likes = ([...likes, 'Guest001']);
    //     } else {
    //         comment.likes = ([...likes, username]);
    //     }
    //     await likeComment(gameId, id, comment);
    //     const comments = await getAllComments(gameId);
    //     setCommentsList(Object.values(comments));
    // };

    // const onDeleteComment = async (id) => {
    //     await deleteComment(gameId, id);

    //     const comments = await getAllComments(gameId);
    //     setCommentsList(Object.values(comments));
    // };

    // const onSubmitEditComment = async (e, body) => {
    //     e.preventDefault();
    //     const id = body._id;

    //     await updateComment(gameId, id, body);
    //     const comments = await getAllComments(gameId);

    //     setCommentsList(Object.values(comments));
    // };

    return (
        <section>
            <div className={styles.commentsInfo}>
                <div className={styles.userSection}>
                    <img src="/images/userPic.png" alt="userPic" width={50} height={50}/>
                    <h3>{auth.username}</h3>
                    <p>
                        <i className="fa-regular fa-calendar-days"></i> -
                        {fullDate}
                    </p>
                </div>
                <form className={styles.commentForm} >
                    <textarea
                        placeholder="comment..."
                        type="text"
                        name="comment"
                        value={formValue.comment}
                        onChange={onFormValueChange}
                    ></textarea>
                    <button type='submit' className={styles.send}>Send</button>
                </form>
            </div>

            <section className={styles.commentContainer}>
                {gameComments && gameComments.map(commentInfo =>
                    <div className={styles.userSection}>
                        <head>
                            <img src="/images/userPic.png" alt="userPic" />
                            <h3>{commentInfo.user}</h3>
                            <p>
                            <i class="fa-regular fa-calendar-days"></i> -
                            { commentInfo.createdAt }
                            </p>
                        </head>
            
                        {/* <ul>
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
                        </ul> */}
                    </div>
                )}
            </section> 
        </section>

        // <div className={styles.commentsInfo}>
        //     <div className={styles.userSection}>
        //         <head>
        //             <img src="/images/userPic.png" alt="userPic" />
        //             <h3>{commentInfo.user}</h3>
        //             <p>
        //             <i class="fa-regular fa-calendar-days"></i> -
        //             { commentInfo.createdAt }
        //             </p>
        //         </head>

        //         <ul>
        //             {(commentInfo.user === username) ?
        //                 <>
        //                     <li><button className={styles.editComment} onClick={onEditComment}><i className="fa-solid fa-pen"></i></button></li>
        //                     <li><button className={styles.deleteComment} onClick={() => onDeleteComment(commentInfo._id)}><i className="fa-solid fa-trash"></i></button></li>
        //                     <li><span><i className="fa-brands fa-gratipay"></i> {commentInfo.likes.length}</span></li>
        //                 </>
        //                 :
        //                 <>
        //                     {!result &&
        //                         <li> <button className={styles.likeComment} onClick={() => onLikeComment(commentInfo._id, username)} ><i className="fa-solid fa-thumbs-up"></i></button></li>
        //                     }
        //                     <li><span><i className="fa-brands fa-gratipay"></i> {commentInfo.likes.length}</span></li>
        //                 </>
        //             }
        //         </ul>
        //     </div>

        //     <div className={styles.commentSection}>
        //         <p>{commentInfo.text}</p>
        //     </div>

        //     <EditCommentModal
        //         commentInfo={commentInfo}
        //         showEditCommentModal={showEditCommentModal}
        //         setShowEditCommentModal={setShowEditCommentModal}
        //         onSubmitEditComment={onSubmitEditComment}
        //     />
        // </div>
    );
};