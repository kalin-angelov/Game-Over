import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { GoToTopButton } from '../GoToTopButton/GoToTopButton';
import { CommentTextarea } from './CommentTextarea';
import { CommentContainer } from './CommentsContainer';


import { AuthContext } from '../../contexts/AuthContext';
import { getAllComments, addComment, deleteComment, updateComment } from '../../service/gameCommentService';
import { getOne } from '../../service/gameService';

export const Comments = () => {
    const { gameId } =useParams();
    const { auth } = useContext(AuthContext);
    const [gameComments, setGameComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [gameInfo, setGameInfo] = useState({});
    const [showEditModal, setShowEditModal] = useState('');

    useEffect(() => {
        getOne(gameId)
            .then(data => setGameInfo(data))
            .catch(error => console.log(error))
        getAllComments(gameId)
            .then(data => setGameComments(Object.values(data)))
            .catch(error => console.log(error))
    },[]);

    const onAddComment = async (e) => {
        e.preventDefault();

        const commentBody = {
            user: auth.username,
            text: commentText,
            date: new Date().toISOString()
        };

        const result = await addComment(gameId, commentBody);
        setGameComments([...gameComments, result]);
        setCommentText('');
    };

    const onDeleteComment = async (id) => {
        const result = await deleteComment(gameId, id);
        setGameComments(gameComments.filter(comment => comment._id !== result._id));
    };

    const showModal = (e) => {
        const id = e.target.id;

        if (showEditModal !== id) {
            setShowEditModal(id);
        } else if (showEditModal === id){
            setShowEditModal('');
        };
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

    const onEditComment = async (e, body) => {
        e.preventDefault();
        const id = body._id;

        const result = await updateComment(gameId, id, body);

        setGameComments(gameComments => gameComments.map(comment => comment._id === result._id ? result : comment));
        setShowEditModal('');
    };

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
                showModal={showModal}
                showEditModal={showEditModal}
                onDeleteComment={onDeleteComment}
                onEditComment={onEditComment}
           />

            <GoToTopButton />
        </section>
    );
};