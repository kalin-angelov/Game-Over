import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { Comment } from './Comment';
import { DeleteButton } from './DeleteButton';
import { getOne } from '../../service/gameService';
import { addOneComment, getAllComments } from '../../service/gameCommentService';
import { useForm } from '../../hooks/useForm';

export const Details = () => {
    const { 
        userId, 
        username,  
        showDelete,
        onDeleteGame,
        onClickShowDelete,
        onClickCloseDelete,
    } = useContext(AuthContext);
    const { gameId } = useParams();
    const { formValue, onFormValueChange } = useForm({ comment: '' })
    const [game, setGame] = useState([]);
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        getOne(gameId)
            .then(data => setGame(data))
            .catch(err => console.log(err))
        getAllComments(gameId)
            .then(data => setCommentsList(data))
            .catch(err => console.log(err))
    }, [gameId]);

    const onSubmitComment = async (e) => {
        e.preventDefault();

        const commentBody = {
            user: '',
            text: formValue.comment
        }

        username === undefined ? commentBody.user = 'Unknown' : commentBody.user = username;

        if (commentBody.text !== '') {
            setCommentsList(commentsList => ([...commentsList, commentBody]));
            addOneComment(gameId, commentBody);
    
            formValue.comment='';
        } else {
            return;
        }
        
    };

    return (
        <>
            <div className="details">
                <div className="titlePage">
                    <h1>{game.title}</h1>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="box_bg">
                                <div className="box_bg_img">
                                    <figure><img src={game.imageUrl} alt={game.title} /></figure>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 border_right">
                            <div className="box_text">
                                <p>{game.summary}</p>
                                {(userId === game._ownerId) &&
                                    <>
                                        <Link to={`/edit/${game._id}`} state={game} >Edit</Link>
                                        <Button variant="primary" onClick={onClickShowDelete} >Delete</Button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteButton
                showDelete={showDelete}
                onClickCloseDelete={onClickCloseDelete}
                onDeleteGame={onDeleteGame}
            />
            <div className='comment-container'>

                {commentsList && commentsList.map(commentInfo => <Comment {...commentInfo} />)}

            </div>
            <form className='comment-form' onSubmit={onSubmitComment}>
                <div className="addComments">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <textarea className="comment" placeholder="comment..." type="text" name="comment" value={formValue.comment} onChange={onFormValueChange} ></textarea>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <button className="send">Send</button>
                    </div>
                </div>
            </form>
        </>
    );
};