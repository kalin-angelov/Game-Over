import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parseISO } from 'date-fns';

import { GoToTopButton } from '../GoToTopButton/GoToTopButton';
import { CommentTextarea } from './CommentTextarea';
import { CommentContainer } from './CommentsContainer';


import { AuthContext } from '../../contexts/AuthContext';
import { getAllComments, addComment, deleteComment, updateComment, getComment, addLikeToComment } from '../../service/gameCommentService';
import { getGame } from '../../service/gameService';

export const Comments = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const { auth, isAuthenticated } = useContext(AuthContext);
    const [gameComments, setGameComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [gameInfo, setGameInfo] = useState({});
    const [showEditModal, setShowEditModal] = useState('');

    useEffect(() => {
        getGame(gameId)
            .then(data => setGameInfo(data))
            .catch(error => console.log(error))
        getAllComments(gameId)
            .then(data => setGameComments(Object.values(data)))
            .catch(error => console.log(error))
    },[]);

    const onAddComment = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) return navigate('/register');

        const commentBody = {
            user: auth.username,
            text: commentText,
            date: new Date().toISOString(),
            likes: []
        };

        const result = await addComment(gameId, commentBody);
        setGameComments([...gameComments, result]);
        setCommentText('');
    };

    const onDeleteComment = async (id) => {
        const result = await deleteComment(gameId, id);
        setGameComments(gameComments.filter(comment => comment._id !== result._id));
    };

    const onLikeComment = async (id, username) => {
        const comment = await getComment(gameId, id);
        const likes = comment.likes;
        
        comment.likes = ([...likes, username]);
        
        await addLikeToComment(gameId, id, comment);
        const comments = await getAllComments(gameId);
        setGameComments(Object.values(comments));
    };

    const onEditComment = async (e, body) => {
        e.preventDefault();
        const id = body._id;

        const result = await updateComment(gameId, id, body);

        setGameComments(gameComments => gameComments.map(comment => comment._id === result._id ? result : comment));
        setShowEditModal('');
    };

    const showModal = (e) => {
        const id = e.target.id;

        if (showEditModal !== id) {
            setShowEditModal(id);
        } else if (showEditModal === id){
            setShowEditModal('');
        };
    };

    const onSortByPopular = async () => {
        const result = await getAllComments(gameId);
        let comments = Object.values(result);

        setGameComments(comments.sort((a, b) => b.likes.length - a.likes.length));
    };

    const onSortByOldest = async () => {
        const result = await getAllComments(gameId);
        let comments = Object.values(result);

        setGameComments(comments.sort((a, b) => parseISO(a.date) - parseISO(b.date)));
    };

    const onSortByNewest = async () => {
        const result = await getAllComments(gameId);
        let comments = Object.values(result);

        setGameComments(comments.sort((a, b) => parseISO(b.date) - parseISO(a.date)));
    };

    return (
        <main>
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
                onSortByPopular={onSortByPopular}
                onSortByNewest={onSortByNewest}
                onSortByOldest={onSortByOldest}
                showEditModal={showEditModal}
                onDeleteComment={onDeleteComment}
                onEditComment={onEditComment}
                onLikeComment={onLikeComment}
                isAuthenticated={isAuthenticated}
           />

            <GoToTopButton />
        </main>
    );
};