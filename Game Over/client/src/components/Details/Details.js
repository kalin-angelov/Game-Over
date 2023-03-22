import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { Comment } from '../Details/Comment';
import { DeleteButton } from '../Details/DeleteButton';
import { getOne } from '../../service/gameService';
import { useForm } from '../../hooks/useForm';

export const Details = ({
    onDeleteGame,
    onClickShowDelete,
    onClickCloseDelete,
    showDelete
}) => {
    const { gameId } = useParams();
    const { userId } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({comment: ''})
    const [game, setGame] = useState([]);
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        getOne(gameId)
            .then(data => setGame(data))
            .catch(err => console.log(err))
        getOne(gameId)
            .then(data => setCommentsList(data.comments))
            .catch(err => console.log(err))
    },[gameId]);

    const onSubmitComment = (e) => {
        e.preventDefault();
        

        console.log(commentsList);
    };

    return (
        <>
            <div id="software" className="details">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlePage">
                                <h1>{game.title}</h1>
                            </div>
                        </div>
                    </div>
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
