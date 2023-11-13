import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { GoToTopButton } from '../GoToTopButton/GoToTopButton';
import { CommentTextarea } from './CommentTextarea';
import { CommentContainer } from './CommentsContainer';


import { AuthContext } from '../../contexts/AuthContext';
import { getAllComments, addComment, deleteComment } from '../../service/gameCommentService';
import { getOne } from '../../service/gameService';


export const Comments = () => {
    const { gameId } =useParams();
    const { auth } = useContext(AuthContext);
    const [gameComments, setGameComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [gameInfo, setGameInfo] = useState({});

    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fullDate = [day, month, year].join('-');

    useEffect(() => {
        getOne(gameId)
            .then(data => setGameInfo(data))
            .catch(error => console.log(error))
        getAllComments(gameId)
            .then(data => setGameComments(Object.values(data)))
            .catch(error => console.log(error))
    },[gameComments]);

    const onAddComment = async (e) => {
        e.preventDefault();

        const commentBody = {
            user: auth.username,
            text: commentText,
            createdAt: fullDate
        }

        addComment(gameId, commentBody);
        setCommentText('');
    };

    const onDeleteComment = async (id) => {
        await deleteComment(gameId, id);
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

    // const onSubmitEditComment = async (e, body) => {
    //     e.preventDefault();
    //     const id = body._id;

    //     await updateComment(gameId, id, body);
    //     const comments = await getAllComments(gameId);

    //     setCommentsList(Object.values(comments));
    // };

    return (
        <section>
            <CommentTextarea
                game={gameInfo}
                commentText={commentText}
                setCommentText={setCommentText}
                onAddComment={onAddComment}
            />

           <CommentContainer
                auth={auth}
                gameComments={gameComments}
                onDeleteComment={onDeleteComment}
           />

            <GoToTopButton />
        </section>
    );
};